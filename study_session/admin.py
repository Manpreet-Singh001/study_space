from django.contrib import admin
from .models import StudySession, Topic,Note

admin.site.register([StudySession,Topic,Note])
