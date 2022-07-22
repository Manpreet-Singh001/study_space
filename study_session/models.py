from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User


class StudySession(models.Model):
    start_time = models.DateTimeField(default=now)
    end_time = models.DateTimeField(null=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)

    # def __str__(self):
    #     return self.user_id

class Topic(models.Model):
    name = models.CharField(max_length=30)
    session_id = models.ForeignKey(StudySession,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Note(models.Model):
    note = models.TextField()
    topic_id = models.ForeignKey(Topic,on_delete=models.CASCADE)

    def __str__(self):
        return self.note
