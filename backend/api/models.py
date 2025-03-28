import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager ,PermissionsMixin
from django.db import models
from django.forms import ValidationError
from django.conf import settings

class CustomUserManager(BaseUserManager):
    def create_user(self , email , password=None , **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        if not password:
            raise ValueError("The pasword field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email , password=password , **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser , PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.email)

def validate_year(value):
    current_year = datetime.datetime.now().year
    if not (1930 <= value <= current_year):
        raise ValidationError(
            f'{value} is not a valid year. It must be between 1930 and {current_year}.'
        )

def validate_image_size(image):
    # Check if image size is greater than 5MB
    mb = 5
    max_size = mb * 1024 * 1024  # 5MB in bytes
    if image.size > max_size:
        raise ValidationError("Image file size should not exceed {mb}MB.")

class TravelPostModel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    location = models.CharField(max_length=30)
    google_map_link = models.URLField()
    year = models.IntegerField(validators=[validate_year])
    picture = models.ImageField(validators=[validate_image_size] , upload_to='posts/images')
    description = models.TextField()

    objects = models.Manager()
