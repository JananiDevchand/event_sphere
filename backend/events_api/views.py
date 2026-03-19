from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo.errors import PyMongoError

from .mongo import event_to_response, get_events_collection, insert_event

STUDENT_EMAIL = 'user@gmail.com'
STUDENT_PASSWORD = 'user@123'
ADMIN_EMAIL = 'admin@gmail.com'
ADMIN_PASSWORD = 'admin@123'
ADMIN_TOKEN = 'admin-session-token'


@api_view(['GET'])
def health_view(request):
	return Response({'status': 'ok'})


@api_view(['POST'])
def login_view(request):
	email = request.data.get('email', '').strip()
	password = request.data.get('password', '').strip()

	if email == STUDENT_EMAIL and password == STUDENT_PASSWORD:
		return Response(
			{
				'success': True,
				'role': 'student',
				'email': STUDENT_EMAIL,
				'token': 'student-session-token',
			}
		)

	if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
		return Response(
			{
				'success': True,
				'role': 'admin',
				'email': ADMIN_EMAIL,
				'token': ADMIN_TOKEN,
			}
		)

	return Response(
		{'success': False, 'message': 'Invalid email or password'},
		status=status.HTTP_401_UNAUTHORIZED,
	)


def _is_admin_request(request):
	bearer_token = request.headers.get('Authorization', '').replace('Bearer ', '').strip()
	email = request.headers.get('X-Admin-Email', '').strip()
	password = request.headers.get('X-Admin-Password', '').strip()

	return bearer_token == ADMIN_TOKEN or (
		email == ADMIN_EMAIL and password == ADMIN_PASSWORD
	)


def _validate_event_payload(payload):
	required_fields = [
		'title',
		'description',
		'date',
		'deadline',
		'location',
		'category',
		'collegeId',
		'registrationLink',
		'poster',
	]

	missing = [field for field in required_fields if not payload.get(field)]
	if missing:
		return f"Missing required fields: {', '.join(missing)}"

	return None


@api_view(['GET', 'POST'])
def events_view(request):
	if request.method == 'GET':
		try:
			events = get_events_collection().find().sort('createdAt', -1)
			return Response([event_to_response(event) for event in events])
		except PyMongoError as exc:
			return Response(
				{'success': False, 'message': f'MongoDB read failed: {exc}'},
				status=status.HTTP_503_SERVICE_UNAVAILABLE,
			)

	if not _is_admin_request(request):
		return Response(
			{'success': False, 'message': 'Admin credentials required'},
			status=status.HTTP_401_UNAUTHORIZED,
		)

	payload = {
		'title': request.data.get('title', '').strip(),
		'description': request.data.get('description', '').strip(),
		'date': request.data.get('date', '').strip(),
		'deadline': request.data.get('deadline', '').strip(),
		'location': request.data.get('location', '').strip(),
		'category': request.data.get('category', '').strip(),
		'collegeId': request.data.get('collegeId', '').strip(),
		'college': request.data.get('college', '').strip(),
		'branchFocus': request.data.get('branchFocus', []),
		'interests': request.data.get('interests', []),
		'prizeMoney': request.data.get('prizeMoney', '').strip(),
		'registrationLink': request.data.get('registrationLink', '').strip(),
		'poster': request.data.get('poster', '').strip(),
		'featured': bool(request.data.get('featured', False)),
		'createdBy': ADMIN_EMAIL,
	}

	validation_error = _validate_event_payload(payload)
	if validation_error:
		return Response(
			{'success': False, 'message': validation_error},
			status=status.HTTP_400_BAD_REQUEST,
		)

	try:
		inserted_event = insert_event(payload)
		return Response(event_to_response(inserted_event), status=status.HTTP_201_CREATED)
	except PyMongoError as exc:
		return Response(
			{'success': False, 'message': f'MongoDB write failed: {exc}'},
			status=status.HTTP_503_SERVICE_UNAVAILABLE,
		)
