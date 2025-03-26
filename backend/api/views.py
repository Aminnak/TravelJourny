from rest_framework.generics import CreateAPIView
from .models import CustomUser , TravelPostModel
from .serializers import CustomUserSerializer , TravelPostSerializer

class CustomUserCreateView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class TravlePostView(CreateAPIView):
    queryset = TravelPostModel
    serializer_class = TravelPostSerializer
