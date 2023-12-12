from rest_framework import serializers
from app.models.sensors.securyModeEntity import SecuryMode

class SecuryModeSerializer(serializers.ModelSerializer):
    # Serializer for the SecuryMode model using ModelSerializer from Django Rest Framework
    class Meta:
        # Specifies the model to be serialized
        model = SecuryMode
        # Specifies the fields to be included in the serialized representation
        fields = ['id', 'secury_mode', 'created_at']
        # Specifies the fields that should be read-only in the serialized representation
        read_only_fields = ['id', 'created_at']
