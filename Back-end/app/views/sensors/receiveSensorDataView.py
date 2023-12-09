from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ...models.sensors.sensorDataEntity import SensorData
from ...models.sensors.securyModeEntity import SecuryMode
from ...serializers.sensorDataSerializer import SensorDataSerializer
from ...serializers.securyModeSerializer import SecuryModeSerializer

class ReceiveSensorDataPostView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "Data received successfully!"}, status=status.HTTP_201_CREATED)
        return Response({"status": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ReceiveSensorDataGetView(APIView):
    def get(self, request, *args, **kwargs):
        sensor_data = SensorData.objects.order_by('-id')[:7]
        serializer = SensorDataSerializer(sensor_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ReceiveSensorDataPutView(APIView):
    def put(self, request, *args, **kwargs):
        instance = get_object_or_404(SensorData, id=kwargs.get("pk"))
        serializer = SensorDataSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "Data updated successfully!"}, status=status.HTTP_200_OK)
        return Response({"status": "Invalid data", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ReceiveSensorDataDeleteView(APIView):
    def delete(self, request, *args, **kwargs):
        instance = get_object_or_404(SensorData, id=kwargs.get("pk"))
        instance.delete()
        return Response({"status": "Data deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)

class ReceiveSensorDataGetByIdView(APIView):
    def get(self, request, pk, *args, **kwargs):
        instance = get_object_or_404(SensorData, id=pk)
        serializer = SensorDataSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SecuryModeCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SecuryModeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, *args, **kwargs):
        instance = get_object_or_404(SecuryMode, id=kwargs.get("pk"))
        serializer = SecuryModeSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SecuryModeRetrieveUpdateDestroyView(APIView):
    def get(self, request, pk, *args, **kwargs):
        secury_mode = get_object_or_404(SecuryMode, pk=pk)
        serializer = SecuryModeSerializer(secury_mode)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, *args, **kwargs):
        secury_mode = get_object_or_404(SecuryMode, pk=pk)
        serializer = SecuryModeSerializer(secury_mode, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        secury_mode = get_object_or_404(SecuryMode, pk=pk)
        secury_mode.delete()
        return Response({"message": "SecuryMode deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
