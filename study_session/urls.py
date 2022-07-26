from django.urls import path
from .views import start_session,create_note,end_session,get_topics

urlpatterns = [
    path('',start_session,name='start_session'),
    path('<int:study_session_id>/',end_session,name='end_session'),
    path('topic/<int:topic_id>/note/',create_note,name='create_note'),
    path('topics/',get_topics,name='get_all_topics')
]