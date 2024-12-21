from rest_framework import serializers
from .models import User, Chat_Rooms, Message
from chatbackend import settings
# from rest_framework.validators import UniqueValidator
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'password','email','dp']
#         def create(self, validated_data):
#             return User.objects.create_user(**validated_data)
from urllib.parse import urlparse, unquote

# Input URL

# Parse and decode the URL


# Extract the filename from the last occurrence of "/media/"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password','email','profile_pic','name']
    extra_kwargs = { 
        'password': {
            'write_only': True,
            'style': {'input_type': 'password'}
        }
    }
    def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','name','profile_pic','email']

class MessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True) # Add username for response readability
    # profile_pic = serializers.SerializerMethodField()
    profile_pic = serializers.ImageField(source='user.profile_pic', read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'user', 'username', 'room', 'message', 'timestamp', 'profile_pic']
        extra_kwargs = {'user': {'read_only': True}}  # Prevent user field from being overwritten

        

class ChatRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat_Rooms
        fields = ['id','name','created_at']

