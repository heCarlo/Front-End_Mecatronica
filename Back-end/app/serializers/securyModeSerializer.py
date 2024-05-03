from rest_framework import serializers
from app.models.sensors.securyModeEntity import SecuryMode

class SecuryModeSerializer(serializers.ModelSerializer):
    # Serializer para o modelo SecuryMode usando ModelSerializer do Django Rest Framework
    class Meta:
        # Especifica o modelo a ser serializado
        model = SecuryMode
        # Especifica os campos a serem incluídos na representação serializada
        fields = ['id', 'secury_mode', 'created_at']
        # Especifica os campos que devem ser somente leitura na representação serializada
        read_only_fields = ['id', 'created_at']
