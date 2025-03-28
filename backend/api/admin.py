from django.contrib import admin
from .models import CustomUser, TravelPostModel
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(TravelPostModel)
