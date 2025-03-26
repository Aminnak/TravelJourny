from django.contrib.auth.models import AbstractBaseUser, BaseUserManager ,PermissionsMixin
from django.db import models

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
