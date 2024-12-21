
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

# class User(AbstractUser):
#     profile_picture = models.ImageField(default='profile_pictures/blank.png', upload_to='profile_pictures')

#     def __str__(self):
#         return self.username
# # Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    name= models.CharField(max_length=55, unique=True)
    email=models.CharField(max_length=55, unique=True)
    profile_pic = models.ImageField(upload_to="dp_pics")

 

class Chat_Rooms(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_rooms")
    # def __str__(self):
    #     return self.name
    
    
class Message(models.Model):
    user = models.ForeignKey(User,related_name="messages", on_delete=models.CASCADE)
    room = models.ForeignKey(Chat_Rooms, related_name="messages", on_delete=models.CASCADE)
    

    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.message[:50]}"