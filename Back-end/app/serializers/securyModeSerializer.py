from rest_framework import serializers
from app.models.sensors.securyModeEntity import SecuryMode

class SecuryModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecuryMode
        fields = ['id', 'secury_mode', 'created_at']
        read_only_fields = ['id', 'created_at']
