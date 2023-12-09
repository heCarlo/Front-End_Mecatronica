# serializers/user_entity_serializer.py
from rest_framework import serializers
from app.models.users.userEntity import UserEntity

class UserEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEntity
        fields = '__all__'
