from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class ListUserView(generics.ListAPIView):
    # Define uma view para listar instâncias de UserEntity usando generics.ListAPIView
    queryset = UserEntity.objects.all()  # Define o conjunto de consultas para todas as instâncias de UserEntity
    serializer_class = UserEntitySerializer  # Define a classe do serializador para UserEntitySerializer

    def list(self, request, *args, **kwargs):
        try:
            # Tenta obter o queryset, serializá-lo e retornar os dados
            queryset = self.get_queryset()  # Obtém o queryset
            serializer = self.get_serializer(queryset, many=True)  # Obtém o serializador
            return Response(serializer.data)  # Retorna os dados serializados
        except Exception as e:
            # Trata exceções que podem ocorrer durante a listagem
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
