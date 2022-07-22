import json

from django.http import JsonResponse
from django.views.decorators.http import require_GET as get
from django.views.decorators.http import require_POST as post
from django.views.decorators.csrf import csrf_exempt

# signup
@post
@csrf_exempt
def signup(request):
    # get the request body
    user_details = json.loads(request.body)




    return JsonResponse({'msg':user_details})

# login
# logout
