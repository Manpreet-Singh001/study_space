import json

from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.http import require_POST,require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import StudySession,Topic,Note
from django.utils.timezone import now

@require_POST
@csrf_exempt
def start_session(request):
    # parse the request body currently doesn' support anon user
    try:
        body = json.loads(request.body)
        topic_name = body['topic_name']
        print(topic_name)
    except Exception as e:
        print(e)
    try:
        # find the user
        user = User.objects.get(id=request.user.id)

        study_session = StudySession(user_id=user)
        study_session.save()

        # create the topic
        topic = Topic(name=topic_name,session_id=study_session)
        topic.save()
    except Exception as e:
        print(e)
    return JsonResponse({'msg':'hit'})


# end session route
@require_POST
@csrf_exempt
def end_session(request,study_session_id):
    print(study_session_id)
    # find the session
    try:
        study_session = StudySession.objects.get(id=study_session_id)
        study_session.end_time = now()
        study_session.save()
    except Exception as e:
        print(e)
    return JsonResponse({'msg':'hit'})




@require_POST
@csrf_exempt
def create_note(request,topic_id):
    # parse the request body currently doesn' support anon user
    try:
        body = json.loads(request.body)
        user_note = body['note']
    except Exception as e:
        print(e)
    try:
        # find the topic
        topic = Topic.objects.get(pk=topic_id)
        # create the note
        note = Note(note=user_note,topic_id=topic)
        note.save()
    except Exception as e:
        print(e)
    return JsonResponse({'msg':'hit'})

@require_GET
@csrf_exempt
def get_topics(request):

    # get all topics by a user
    user = User.objects.get(id=request.user.id)
    if user is not None:
        topics = user.topic_set.all().values()
        topics = list(topics)
        print(topics)

    return JsonResponse({'topics_data':topics},safe=False)


