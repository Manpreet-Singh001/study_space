import json

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import StudySession,Topic,Note

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

