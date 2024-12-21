from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterUserView, ChatRoomListCreateView, MessageListCreateView,MyProfileView,ProfileView
urlpatterns = [
    # Authentication
    # path('auth/', include('rest_framework.urls')),
    path('auth/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('profile/', MyProfileView.as_view(), name="my-profile"),
    path('profile/<str:username>/', ProfileView.as_view(), name="user-profile"),
    path('rooms/', ChatRoomListCreateView.as_view(), name="get-rooms"),
    path('room/<str:room_name>/messages/',MessageListCreateView.as_view(), name='room-messages'),
    # path('chat/room/<str:room_name>/messages/', MessageView.as_view(), name='room-messages')
]