from django.urls import path
from .views import CustomUserCreateView

urlpatterns = [
    path('user/create/', CustomUserCreateView.as_view()),
]
