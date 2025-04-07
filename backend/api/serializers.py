from rest_framework import serializers
from django.core.validators import EmailValidator
from django.contrib.auth import get_user_model
from django.utils.timezone import localtime
from .models import TravelPostModel
User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email' , 'password', 'profile' , 'username']
        extra_kwargs = {
            'password' : {'write_only' : True , 'min_length' : 8},
            'username' : {'required' : True},
            'email' : {
                'write_only' : True ,
                'required' : True ,
                'allow_blank' : False,
                'validators' : [EmailValidator()]
            }
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists. Try logging in or using another email.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class TravelPostSerializer(serializers.ModelSerializer):
    published_at = serializers.SerializerMethodField()
    user_profile = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    class Meta:
        model = TravelPostModel
        fields = ['id' ,'title' , 'location' , 'google_map_link' , 'year' , 'picture' , 'description' , 'published_at' , 'username' , 'user_profile']
        extra_kwargs = {
            'picture' : {
                'max_length' : 100,
                'allow_empty_file' : False,
                'required' : True
            },
        }

    def get_username(self , obj):
        return obj.user.username

    def get_user_profile(self, obj):
        request = self.context.get('request')
        if obj.user.profile:
            return request.build_absolute_uri(obj.user.profile.url)
        return "default-profile-url"

    def get_published_at(self , obj):
        return localtime(obj.created_at).strftime("%B %d, %Y")

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
