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

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class TravelPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPostModel
        fields = ['title' , 'location' , 'google_map_link' , 'year' , 'picture' , 'description']
        extra_kwargs = {
            'picture' : {
                'max_length' : 100,
                'allow_empty_file' : False,
                'required' : True
            },
        }

    def create(self, validated_data):
        user = self.context['request'].user  # Get user from request
        return TravelPostModel.objects.create(user=user, **validated_data)

    def validate_picture(self , value):
        size_limit = 5
        if value.size > size_limit * 1024 * 1024:
            raise serializers.ValidationError(f"The maximum file size allowed is {size_limit}Mb")

        valid_file_extensions = ['.jpg', '.jpeg', '.png']
        if not any(value.name.endswith(extention) for extention in valid_file_extensions):
            raise serializers.ValidationError("Only JPG, JPEG, and PNG files are allowed.")

        return value
