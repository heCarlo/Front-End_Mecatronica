from django.urls import path
from app.views.users.createUserView import CreateUserView
from app.views.users.deleteUserView import DeleteUserView
from app.views.users.getUserView import GetUserView
from app.views.users.listUserView import ListUserView
from app.views.users.updateUserView import UpdateUserView
from app.views.sensors.receiveSensorDataView import (
    ReceiveSensorDataGetByIdView,
    ReceiveSensorDataPostView,
    ReceiveSensorDataGetView,
    ReceiveSensorDataPutView,
    ReceiveSensorDataDeleteView,
    SecuryModeCreateView,
    SecuryModeRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Rotas para usuários
    path('users/', ListUserView.as_view(), name='user-list'),  # Rota para listar usuários
    path('users/create/', CreateUserView.as_view(), name='user-create'),  # Rota para criar usuário
    path('users/<int:pk>/', GetUserView.as_view(), name='user-retrieve'),  # Rota para recuperar usuário por ID
    path('users/<int:pk>/update/', UpdateUserView.as_view(), name='user-update'),  # Rota para atualizar usuário por ID
    path('users/<int:pk>/delete/', DeleteUserView.as_view(), name='user-delete'),  # Rota para excluir usuário por ID

    # Rotas para dados do sensor
    path('sensor-data/', ReceiveSensorDataGetView.as_view(), name='sensor-data-list'),  # Rota para listar dados do sensor
    path('sensor-data/create/', ReceiveSensorDataPostView.as_view(), name='sensor-data-create'),  # Rota para criar dados do sensor
    path('sensor-data/<int:pk>/update/', ReceiveSensorDataPutView.as_view(), name='sensor-data-update'),  # Rota para atualizar dados do sensor por ID
    path('sensor-data/<int:pk>/delete/', ReceiveSensorDataDeleteView.as_view(), name='sensor-data-delete'),  # Rota para excluir dados do sensor por ID
    path('sensor-data/<int:pk>/', ReceiveSensorDataGetByIdView.as_view(), name='sensor-data-get'),  # Rota para recuperar dados do sensor por ID
    
    # Rotas para modo de segurança
    path('secury-mode/', SecuryModeCreateView.as_view(), name='secury-mode-create'),  # Rota para criar modo de segurança
    path('secury-mode/<int:pk>/', SecuryModeRetrieveUpdateDestroyView.as_view(), name='secury-mode-retrieve-update-destroy'),  # Rota para recuperar, atualizar e excluir modo de segurança por ID
]
