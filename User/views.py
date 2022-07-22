import json

from django.http import JsonResponse
from django.views.decorators.http import require_GET as get
from django.views.decorators.http import require_POST as post
from django.views.decorators.csrf import csrf_exempt

# signup
@post
@csrf_exempt
def signup(request):
    # can be refactored to a function
    try:
        # get the request body
        user_details = json.loads(request.body)
        username = user_details['username']
        password = user_details['password']
        email = user_details['email']
    except:
        return JsonResponse({'msg':'missing user details'},
                            status=400)

    return JsonResponse({'msg':user_details})

# login
# logout
