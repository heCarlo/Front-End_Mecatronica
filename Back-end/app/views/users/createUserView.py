from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class CreateUserView(generics.CreateAPIView):
    # Define uma view para criar uma instância UserEntity usando generics.CreateAPIView
    queryset = UserEntity.objects.all()  # Define o conjunto de consultas para todas as instâncias de UserEntity
    serializer_class = UserEntitySerializer  # Define a classe do serializador para UserEntitySerializer

    def create(self, request, *args, **kwargs):
        try:
            # Tenta serializar os dados recebidos e salvá-los como uma instância UserEntity
            serializer = self.get_serializer(data=request.data)  # Obtém o serializador
            serializer.is_valid(raise_exception=True)  # Valida os dados recebidos
            serializer.save()  # Salva os dados
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retorna uma resposta de sucesso
        except Exception as e:
            # Trata exceções que podem ocorrer durante a serialização ou salvamento
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)  # Retorna uma resposta de erro com detalhes da exceção
