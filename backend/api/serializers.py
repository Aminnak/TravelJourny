from rest_framework import serializers
from django.core.validators import EmailValidator
from django.contrib.auth import get_user_model
from .models import TravelPostModel
User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email' , 'password']
        extra_kwargs = {
            'password' : {'write_only' : True , 'min_length' : 8},
            'email' : {
                'write_only' : True ,
                'required' : True ,
                'allow_blank' : False,
                'validators' : [EmailValidator()]
            }
        }


class TravelPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPostModel
        fields = ['user' , 'title' , 'location' , 'google_map_link' , 'year' , 'picture' , 'description']
        extra_kwargs = {
            'picture' : {
                'max_length' : 100,
                'allow_empty_file' : False,
                'required' : True
            },
        }
