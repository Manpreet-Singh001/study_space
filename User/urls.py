from django.urls import path
from .views import signup,logout,login

urlpatterns = [
    path('signup/',signup, name='user_signup'),
    path('login/',login,name='user_login'),
    path('logout/',logout,name='user_logout')
]