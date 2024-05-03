from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from datetime import datetime

# Define o esquema do corpo da solicitação para os dados do sensor
sensor_data_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'sensort': openapi.Schema(type=openapi.TYPE_NUMBER),
        'servo_vertical': openapi.Schema(type=openapi.TYPE_NUMBER),
        'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    },
    required=['sensort', 'servo_vertical', 'secury_mode']
)

# Define as propriedades de resposta para os dados do sensor
sensor_data_response_properties = {
    'id': openapi.Schema(type=openapi.TYPE_INTEGER),
    'sensort': openapi.Schema(type=openapi.TYPE_NUMBER),
    'servo_vertical': openapi.Schema(type=openapi.TYPE_NUMBER),
    'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    'created_at': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
}

# Define os esquemas de resposta para diferentes códigos de status HTTP para os dados do sensor
sensor_data_responses = {
    201: 'Data received successfully!',
    200: openapi.Schema(
        type=openapi.TYPE_ARRAY,
        items=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=sensor_data_response_properties,
        )
    ),
    204: 'Data deleted successfully!',
    400: 'Invalid data',
    404: 'Data not found',
    500: 'Error processing data',
}

# Define os esquemas Swagger para diferentes métodos HTTP para os dados do sensor
@swagger_auto_schema(
    request_body=sensor_data_request_body,
    responses=sensor_data_responses,
)
def receive_sensor_data_post_schema():  # Decorador para a função de criação de dados do sensor
    pass

@swagger_auto_schema(
    responses=sensor_data_responses,
)
def receive_sensor_data_get_schema():  # Decorador para a função de obtenção de dados do sensor
    pass

@swagger_auto_schema(
    request_body=sensor_data_request_body,
    responses=sensor_data_responses,
)
def receive_sensor_data_put_schema():  # Decorador para a função de atualização de dados do sensor
    pass

@swagger_auto_schema(
    responses=sensor_data_responses,
)
def receive_sensor_data_delete_schema():  # Decorador para a função de exclusão de dados do sensor
    pass

@swagger_auto_schema(
    responses=sensor_data_responses,
)
def receive_sensor_data_get_by_id_schema():  # Decorador para a função de obtenção de dados do sensor por ID
    pass

# Define o esquema do corpo da solicitação para o modo de segurança
secury_mode_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    },
    required=['secury_mode']
)

# Define as propriedades de resposta para o modo de segurança
secury_mode_response_properties = {
    'id': openapi.Schema(type=openapi.TYPE_INTEGER),
    'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    'created_at': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
}

# Define os esquemas de resposta para diferentes códigos de status HTTP para o modo de segurança
secury_mode_responses = {
    201: 'Secury mode data received successfully!',
    200: openapi.Schema(
        type=openapi.TYPE_ARRAY,
        items=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=secury_mode_response_properties,
        )
    ),
    204: 'Secury mode data deleted successfully!',
    400: 'Invalid data',
    404: 'Secury mode data not found',
    500: 'Error processing secury mode data',
}

# Define os esquemas Swagger para diferentes métodos HTTP para o modo de segurança
@swagger_auto_schema(
    request_body=secury_mode_request_body,
    responses=secury_mode_responses,
)
def secury_mode_create_schema():  # Decorador para a função de criação do modo de segurança
    pass

@swagger_auto_schema(
    responses=secury_mode_responses,
)
def secury_mode_retrieve_update_destroy_schema():  # Decorador para a função de recuperação, atualização e exclusão do modo de segurança
    pass
