from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.db.utils import IntegrityError
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password_confirmed = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(allow_blank=True)
    username = serializers.CharField(required=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmed')

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirmed']:
            raise serializers.ValidationError({"message": "Passwords do not match"})
        
        if User.objects.filter(username=attrs['username']).exists():
                raise serializers.ValidationError({"message": "This username is already taken"})
            
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    new_password = serializers.CharField(write_only=True, required=True)
    new_password_confirmed = serializers.CharField(write_only=True, required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"message": "Invalid password"})
        return value
        
    def validate(self, attrs):
        if attrs["new_password"] != attrs["new_password_confirmed"]:
            raise serializers.ValidationError({"message": "Passwords do not match"})
        return attrs
    
    def save(self, **kwargs):
        user = self.context.get('request').user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    
