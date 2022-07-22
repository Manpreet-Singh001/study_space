import json

from django.http import JsonResponse
from django.views.decorators.http import require_GET as get
from django.views.decorators.http import require_POST as post
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login as user_login,logout as user_logout

# signup
@post
@csrf_exempt
def signup(request):
    # can be refactored to a middleware
    try:
        # get the request body
        user_details = json.loads(request.body)
        username = user_details['username']
        password = user_details['password']
        email = user_details['email']
    except:
        return JsonResponse({'msg':'missing user details'},
                            status=400)

    # create user
    try:
        user = User.objects.create_user(username,email,password)
        user.save()
    except Exception as e:
        print(e)
        return JsonResponse({'msg':'error occured'}, status=400)

    return JsonResponse({'msg':'user created'})

# login
@post
@csrf_exempt
def login(request):
    try:
        # get the request body
        user_details = json.loads(request.body)
        username = user_details['username']
        password = user_details['password']
    except:
        return JsonResponse({'msg':'missing user details'},
                            status=400)

    user = authenticate(request,username=username,password=password)
    if user is not None:
        user_login(request,user)
        return JsonResponse({'msg':'logged in'})
    else:
        return JsonResponse({'msg':"invalid creds"},status=420)


# logout
@get
@csrf_exempt
def logout(request):
    user_logout(request)
    return JsonResponse({'msg':'logged out'})
