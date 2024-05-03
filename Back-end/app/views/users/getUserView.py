from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class GetUserView(generics.RetrieveAPIView):
    # Define uma view para recuperar uma instância UserEntity usando generics.RetrieveAPIView
    queryset = UserEntity.objects.all()  # Define o conjunto de consultas para todas as instâncias de UserEntity
    serializer_class = UserEntitySerializer  # Define a classe do serializador para UserEntitySerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            # Tenta recuperar a instância e serializá-la
            instance = self.get_object()  # Obtém a instância a ser recuperada
            serializer = self.get_serializer(instance)  # Obtém o serializador
            return Response(serializer.data)  # Retorna os dados serializados
        except UserEntity.DoesNotExist:
            # Trata o caso em que o objeto não é encontrado
            return Response({"error": "Objeto não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Trata outras exceções que podem ocorrer durante a recuperação ou serialização
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
