from django.db import models

class Event(models.Model):
	title = models.CharField(max_length=200)
	description = models.TextField()
	date = models.DateField()
	deadline = models.DateTimeField()
	location = models.CharField(max_length=120)
	category = models.CharField(max_length=60)
	college_id = models.CharField(max_length=20)
	college_name = models.CharField(max_length=180)
	branch_focus = models.JSONField(default=list, blank=True)
	interests = models.JSONField(default=list, blank=True)
	prize_money = models.CharField(max_length=80, blank=True)
	registration_link = models.URLField()
	poster = models.URLField()
	featured = models.BooleanField(default=False)
	created_by = models.EmailField(default='admin@gmail.com')
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		return self.title
