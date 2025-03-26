from django.urls import path
from .views import CustomUserCreateView , TravlePostView

urlpatterns = [
    path('user/create/', CustomUserCreateView.as_view()),
    path('post/create/' , TravlePostView.as_view())
]
