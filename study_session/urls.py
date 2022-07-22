from django.urls import path
from .views import start_session,create_note

urlpatterns = [
    path('',start_session,name='start_session'),
    path('topic/<int:topic_id>/note/',create_note,name='create_note')
]