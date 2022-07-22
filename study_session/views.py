import json

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
    except Exception as e:
        print(e)
    try:
        study_session = StudySession(user_id=request.user)
        study_session.save()

        # create the topic
        topic = Topic(name=topic_name,session_id=study_session)
        topic.save()
    except Exception as e:
        print(e)
    return JsonResponse({'msg':'hit'})




