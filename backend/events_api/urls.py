from django.urls import path

from .views import events_view, health_view, login_view

urlpatterns = [
    path('health/', health_view, name='health'),
    path('login/', login_view, name='login'),
    path('events/', events_view, name='events'),
]
