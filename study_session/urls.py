from django.urls import path
from .views import start_session

urlpatterns = [
    path('',start_session,name='start_session')
]