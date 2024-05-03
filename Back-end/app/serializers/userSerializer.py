from rest_framework import serializers
from app.models.users.userEntity import UserEntity

class UserEntitySerializer(serializers.ModelSerializer):
    # Serializer para o modelo UserEntity usando ModelSerializer do Django Rest Framework
    class Meta:
        # Especifica o modelo a ser serializado
        model = UserEntity
        # Inclui todos os campos do modelo UserEntity na representação serializada
        fields = '__all__'
