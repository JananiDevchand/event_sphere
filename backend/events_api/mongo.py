from datetime import datetime, timezone

from bson import ObjectId
from django.conf import settings
from pymongo import MongoClient

_client = MongoClient(settings.MONGODB_URI)
_db = _client[settings.MONGODB_DB_NAME]


def get_events_collection():
    return _db['events']


def event_to_response(document):
    created_at = document.get('createdAt')
    if isinstance(created_at, datetime):
        created_at = created_at.astimezone(timezone.utc).isoformat()

    return {
        'id': str(document.get('_id')),
        'title': document.get('title', ''),
        'description': document.get('description', ''),
        'date': document.get('date', ''),
        'deadline': document.get('deadline', ''),
        'location': document.get('location', ''),
        'category': document.get('category', ''),
        'collegeId': document.get('collegeId', ''),
        'college': document.get('college', ''),
        'branchFocus': document.get('branchFocus', []),
        'interests': document.get('interests', []),
        'prizeMoney': document.get('prizeMoney', ''),
        'registrationLink': document.get('registrationLink', ''),
        'poster': document.get('poster', ''),
        'featured': document.get('featured', False),
        'createdBy': document.get('createdBy', 'admin@gmail.com'),
        'createdAt': created_at,
    }


def insert_event(payload):
    collection = get_events_collection()
    payload['createdAt'] = datetime.now(timezone.utc)
    inserted = collection.insert_one(payload)
    return collection.find_one({'_id': ObjectId(inserted.inserted_id)})
