# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import User, Message, Chat_Rooms
from channels.db import database_sync_to_async
base_url="http://localhost:8000"
# Function to save the message to the database
@database_sync_to_async
def save_message_to_db(username, room_name, message, profile_pic_url):
    user = User.objects.get(username=username)
    room = Chat_Rooms.objects.get(name=room_name)
    # Save the message to the database, including the profile pic URL
    return Message.objects.create(user=user, room=room, message=message)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['roomname']
        self.room_group_name = f"chat_{self.room_name}"

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        if 'message' in text_data_json:
            message = text_data_json['message']
            username = text_data_json['username']

            # Fetch the user to get their profile pic URL
            user = await database_sync_to_async(User.objects.get)(username=username)
            
            # Check if the user has a profile pic, else use a placeholder
            profile_pic_url = base_url + (user.profile_pic.url if user.profile_pic else "https://via.placeholder.com/40")
            # Save the message to the database along with the profile pic URL
            await save_message_to_db(username, self.room_name, message, profile_pic_url)

            # Send the message to the room group, including profile pic
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'username': username,
                    'profile_pic': profile_pic_url,  # Send profile pic URL here
                }
            )
        else:
            print("No 'message' key found in received data")
    
    # Receive message from room group and send to WebSocket
    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        profile_pic = event['profile_pic']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'profile_pic': profile_pic,  # Include profile pic URL in the message
        }))
