from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('post', views.PostView, 'post')
router.register('user', views.UserView, 'user')
router.register('comment', views.CommentView, 'comment')

urlpatterns = [
    path('', views.index),
    path('api/', include(router.urls)),
]