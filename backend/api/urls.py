from django.urls import path
from .views import (
    CustomUserCreateView,
    TravlePostCreateView,
    TravelPostRetrieveView,
    TravelPostListView,
    CustomUserLoginView,
    CustomTokenRefreshView
)

urlpatterns = [
    path("token/refresh/", CustomTokenRefreshView.as_view()),
    path("user/login/", CustomUserLoginView.as_view()),
    path('user/create/', CustomUserCreateView.as_view()),
    path('post/create/' , TravlePostCreateView.as_view()),
    path('post/<int:pk>/' , TravelPostRetrieveView.as_view()),
    path('posts/' , TravelPostListView.as_view()),
]
