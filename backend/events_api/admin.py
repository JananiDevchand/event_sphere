from django.contrib import admin

from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
	list_display = ('title', 'category', 'location', 'date', 'featured', 'created_at')
	search_fields = ('title', 'category', 'location', 'college_name')
	list_filter = ('category', 'featured', 'date')

# Register your models here.
