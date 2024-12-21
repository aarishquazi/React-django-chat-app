# from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Chat_Rooms, Message,User
from .serializers import ChatRoomSerializer, MessageSerializer,UserSerializer,ProfileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
from rest_framework import serializers
from rest_framework.response import Response
# from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
# @csrf_exempt
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Debug print to check what the serializer is receiving
        print(serializer.initial_data)
        
        try:
            serializer.save()
        except Exception as e:
            print("Error during save:", e)
            raise e


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        username_arg = self.kwargs['username']
        return super().get_queryset().get(username=username_arg)
    


class ChatRoomListCreateView(generics.ListCreateAPIView):
    queryset = Chat_Rooms.objects.all() 
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_rooms")

    # authentication_classes = [TokenAuthentication]  # Ensure TokenAuthentication is used to validate the token
    # def get_queryset(self):
    #     # Check if the user is making the request and filter based on their permissions
    #     user = self.request.user
    #     return Chat_Rooms.objects.filter(user=user)

class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        username=self.kwargs['username']
        return User.objects.get(username=username)
    
    
class MessageListCreateView(generics.ListCreateAPIView):
    queryset=Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]

    def get_queryset(self):
        room_name = self.kwargs['room_name']  # Key matches the URL pattern
        return super().get_queryset().filter(room__name=room_name)
    def perform_create(self, serializer):
        room_name = self.kwargs['room_name']
        try:
            room = Chat_Rooms.objects.get(name=room_name)
        except Chat_Rooms.DoesNotExist:
            raise serializers.ValidationError({"room": "Room does not exist."})

        serializer.save(user=self.request.user, room=room)


# def index(request):
#     return render(request, "chat/index.html")

# def room(request, room_name):
#     return render(request, "chat/room.html", {"room_name": room_name})