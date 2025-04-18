from rest_framework.generics import CreateAPIView , RetrieveAPIView , ListAPIView
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED ,  HTTP_200_OK , HTTP_401_UNAUTHORIZED
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser , TravelPostModel
from .serializers import CustomUserSerializer , TravelPostSerializer
from .auth import CookieJWTAuthentication

class TravelPostPagination(PageNumberPagination):
    page_size = 1



class CustomUserCreateView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

    def create(self , request , *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response({
            'refresh' : refresh_token ,
            'access' : access_token
        }, status=HTTP_201_CREATED)

        response.set_cookie(key='access_token' ,
            value=access_token ,
            httponly=True ,
            secure=False ,
            path='/' ,
            samesite='Lax' ,
            max_age=60 * 60 * 24 * 7,
            domain='localhost'
        )
        response.set_cookie(
            key='refresh_token' ,
            value=refresh_token ,
            httponly=True ,
            secure=False ,
            path='/' ,
            samesite='Lax' ,
            max_age=60 * 60 * 24 * 7,
            domain='localhost'
        )

        return response

class CustomUserLoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


    def post(self , request , *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        access_token = data.get('access')
        refresh_token = data.get('refresh')

        response = Response(data, status=HTTP_200_OK)

        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=True,
            samesite='Lax',
            max_age=60 * 10,
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='Lax',
            max_age=60 * 60 * 24 * 7,  # 7 days
        )

        return response
        # print(res.data)
        # email = request.data.get('email')
        # password = request.data.get('password')
        # serializer = self.get_serializer(data=request.data)
        # user = CustomUser.objects.get(email=email , password=password) #authenticate(email=email , password=password)
        # # print(request.data)
        # # print(email , password)
        # print(user)
        # # print()

        # if serializer.is_valid():
        #     refresh = RefreshToken.for_user(user)
        #     response = Response ({
        #         'message' : 'Logged in successfully'
        #     }, status=HTTP_200_OK)

        #     response.set_cookie(key='access_token' , value=str(refresh.access_token),httponly=True ,secure=True , samesite='lax')
        #     response.set_cookie(key='refresh_token' , value=str(refresh),httponly=True ,secure=True , samesite='lax')

        #     return response

        # return Response({
        #     'erro' : 'Inavlid credentials'
        # }, status=HTTP_401_UNAUTHORIZED)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self , request , *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'error': 'No refresh token provided'}, status=HTTP_401_UNAUTHORIZED)
        mutable_data = request.data.copy()
        mutable_data['refresh'] = refresh_token  # Add refresh token

        serializer = self.get_serializer(data=mutable_data)
        try:
            serializer.is_valid(raise_exception=True)
            new_tokens = serializer.validated_data

            response = Response({
                'message' : 'Completed successfully',
                'access_token': str(new_tokens['access'])
            })
            response.set_cookie('refresh_token' , str(new_tokens['refresh']) , httponly=True , secure=False , samesite='lax' , path='/')
            response.set_cookie('access_token' , str(new_tokens['access']),httponly=True ,secure=False , samesite='lax' , path='/')
            return response


        except TokenError as e:
            return Response({'error': str(e)}, status=HTTP_401_UNAUTHORIZED)

        # Call the parent class method with modified data

class TravlePostCreateView(CreateAPIView):
    queryset = TravelPostModel
    serializer_class = TravelPostSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]


class TravelPostRetrieveView(RetrieveAPIView):
    queryset = TravelPostModel.objects.all()
    serializer_class = TravelPostSerializer


class TravelPostListView(ListAPIView):
    queryset = TravelPostModel.objects.all()
    serializer_class = TravelPostSerializer
    pagination_class = TravelPostPagination
