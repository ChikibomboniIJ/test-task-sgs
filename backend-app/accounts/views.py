from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, ChangePasswordSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.request import HttpRequest
from .utils import get_tokens_for_user
from rest_framework.throttling import UserRateThrottle

class RegisterAPIView(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request: HttpRequest):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"}, status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )

class LoginAPIView(APIView):
    permission_classes = [AllowAny, ]
    
    def post(self, request: HttpRequest):
        serializer = LoginSerializer(data=request.data, context = {'request': request})
        if serializer.is_valid():
            user = authenticate(request, **serializer.validated_data)
            if user is not None:
                tokens = get_tokens_for_user(user)
                return Response(tokens, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(
                {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )
            
            
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request: HttpRequest):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated, ]
    throttle_classes = [UserRateThrottle, ]
    
    def post(self, request: HttpRequest):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
      