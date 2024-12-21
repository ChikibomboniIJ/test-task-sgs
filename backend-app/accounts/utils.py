from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user: User):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }