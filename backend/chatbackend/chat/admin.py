from django.contrib import admin

# Register your models here.
from .models import User,Chat_Rooms,Message

admin.site.register({User, Chat_Rooms, Message})