from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ...models.sensors.sensorDataEntity import SensorData
from ...models.sensors.securyModeEntity import SecuryMode
from ...serializers.sensorDataSerializer import SensorDataSerializer
from ...serializers.securyModeSerializer import SecuryModeSerializer
from ...swaggers.sensors.ReceiveSensorDataSchema import (
    receive_sensor_data_delete_schema,
    receive_sensor_data_get_by_id_schema,
    receive_sensor_data_get_schema,
    receive_sensor_data_post_schema,
    receive_sensor_data_put_schema,
)
from ...swaggers.sensors.ReceiveSensorDataSchema import (
    secury_mode_retrieve_update_destroy_schema,
    secury_mode_create_schema
)

# View para receber dados de sensor via POST
class ReceiveSensorDataPostView(APIView):
    @receive_sensor_data_post_schema
    def post(self, request, *args, **kwargs):
        # Serializa os dados recebidos do sensor
        serializer = SensorDataSerializer(data=request.data)
        # Verifica se os dados são válidos
        if serializer.is_valid():
            # Salva os dados no banco de dados
            serializer.save()
            # Retorna uma resposta de sucesso com status 201
            return Response({"status": "Dados recebidos com sucesso!"}, status=status.HTTP_201_CREATED)
        # Retorna uma resposta de erro com os erros de validação, se houverem
        return Response({"status": "Dados inválidos", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# View para obter lista de dados de sensor via GET
class ReceiveSensorDataGetView(APIView):
    @receive_sensor_data_get_schema
    def get(self, request, *args, **kwargs):
        # Obtém os últimos 7 dados de sensor do banco de dados
        sensor_data = SensorData.objects.order_by('-id')[:7]
        # Serializa os dados obtidos
        serializer = SensorDataSerializer(sensor_data, many=True)
        # Retorna os dados serializados com status 200
        return Response(serializer.data, status=status.HTTP_200_OK)

# View para atualizar dados de sensor via PUT
class ReceiveSensorDataPutView(APIView):
    @receive_sensor_data_put_schema
    def put(self, request, *args, **kwargs):
        # Obtém o dado de sensor a ser atualizado pelo seu ID
        instance = get_object_or_404(SensorData, id=kwargs.get("pk"))
        # Serializa o dado existente com os dados recebidos na requisição
        serializer = SensorDataSerializer(instance, data=request.data)
        # Verifica se os dados são válidos
        if serializer.is_valid():
            # Salva os dados atualizados no banco de dados
            serializer.save()
            # Retorna uma resposta de sucesso com status 200
            return Response({"status": "Dados atualizados com sucesso!"}, status=status.HTTP_200_OK)
        # Retorna uma resposta de erro com os erros de validação, se houverem
        return Response({"status": "Dados inválidos", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# View para excluir dados de sensor via DELETE
class ReceiveSensorDataDeleteView(APIView):
    @receive_sensor_data_delete_schema
    def delete(self, request, *args, **kwargs):
        # Obtém o dado de sensor a ser excluído pelo seu ID
        instance = get_object_or_404(SensorData, id=kwargs.get("pk"))
        # Exclui o dado do banco de dados
        instance.delete()
        # Retorna uma resposta de sucesso sem conteúdo com status 204
        return Response({"status": "Dados excluídos com sucesso!"}, status=status.HTTP_204_NO_CONTENT)

# View para obter um dado de sensor específico via GET por ID
class ReceiveSensorDataGetByIdView(APIView):
    @receive_sensor_data_get_by_id_schema
    def get(self, request, pk, *args, **kwargs):
        # Obtém o dado de sensor pelo seu ID
        instance = get_object_or_404(SensorData, id=pk)
        # Serializa o dado obtido
        serializer = SensorDataSerializer(instance)
        # Retorna os dados serializados com status 200
        return Response(serializer.data, status=status.HTTP_200_OK)

# View para criar e atualizar modos de segurança
class SecuryModeCreateView(APIView):
    @secury_mode_create_schema
    def post(self, request, *args, **kwargs):
        # Serializa os dados recebidos para criar um novo modo de segurança
        serializer = SecuryModeSerializer(data=request.data)
        # Verifica se os dados são válidos
        if serializer.is_valid():
            # Salva os dados no banco de dados
            serializer.save()
            # Retorna os dados serializados com status 201
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Retorna uma resposta de erro com os erros de validação, se houverem
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @secury_mode_create_schema
    def put(self, request, *args, **kwargs):
        # Obtém o modo de segurança a ser atualizado pelo seu ID
        instance = get_object_or_404(SecuryMode, id=kwargs.get("pk"))
        # Serializa o modo de segurança existente com os dados recebidos na requisição
        serializer = SecuryModeSerializer(instance, data=request.data)
        # Verifica se os dados são válidos
        if serializer.is_valid():
            # Salva os dados atualizados no banco de dados
            serializer.save()
            # Retorna os dados serializados com status 200
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Retorna uma resposta de erro com os erros de validação, se houverem
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View para obter, atualizar e excluir modos de segurança
class SecuryModeRetrieveUpdateDestroyView(APIView):
    @secury_mode_retrieve_update_destroy_schema
    def get(self, request, pk, *args, **kwargs):
        # Obtém o modo de segurança pelo seu ID
        secury_mode = get_object_or_404(SecuryMode, pk=pk)
        # Serializa o modo de segurança obtido
        serializer = SecuryModeSerializer(secury_mode)
        # Retorna os dados serializados com status 200
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @secury_mode_retrieve_update_destroy_schema
    def put(self, request, pk, *args, **kwargs):
        # Obtém o modo de segurança a ser atualizado pelo seu ID
        secury_mode = get_object_or_404(SecuryMode, pk=pk)
        # Serializa o modo de segurança existente com os dados recebidos na requisição
        serializer = SecuryModeSerializer(secury_mode, data=request.data)
        # Verifica se os dados são válidos
        if serializer.is_valid():
            # Salva os dados atualizados no banco de dados
            serializer.save()
            # Retorna os dados serializados com status 200
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Retorna uma resposta de erro com os erros de validação, se houverem
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @secury_mode_retrieve_update_destroy_schema
    def delete(self, request, pk, *args, **kwargs):
        # Obtém o modo de segurança a ser excluído pelo seu ID
        secury_mode = get_object_or_404(SecuryMode, pk=pk)
        # Exclui o modo de segurança do banco de dados
        secury_mode.delete()
        # Retorna uma resposta de sucesso sem conteúdo com status 204
        return Response({"message": "Modo de segurança excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
