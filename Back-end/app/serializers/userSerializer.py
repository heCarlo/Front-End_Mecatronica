# serializers/user_entity_serializer.py
from rest_framework import serializers
from app.models.users.userEntity import UserEntity

class UserEntitySerializer(serializers.ModelSerializer):
    # Serializer for the UserEntity model using ModelSerializer from Django Rest Framework
    class Meta:
        # Specifies the model to be serialized
        model = UserEntity
        # Includes all fields from the UserEntity model in the serialized representation
        fields = '__all__'
