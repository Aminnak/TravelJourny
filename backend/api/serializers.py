from rest_framework import serializers
from django.core.validators import EmailValidator
from django.contrib.auth import get_user_model

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
