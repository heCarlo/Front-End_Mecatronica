from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class DeleteUserView(generics.DestroyAPIView):
    # Define uma view para excluir uma instância UserEntity usando generics.DestroyAPIView
    queryset = UserEntity.objects.all()  # Define o conjunto de consultas para todas as instâncias de UserEntity
    serializer_class = UserEntitySerializer  # Define a classe do serializador para UserEntitySerializer

    def destroy(self, request, *args, **kwargs):
        try:
            # Tenta obter a instância e excluí-la
            instance = self.get_object()  # Obtém a instância a ser excluída
            instance.delete()  # Exclui a instância
            return Response(status=status.HTTP_204_NO_CONTENT)  # Retorna uma resposta de sucesso sem conteúdo
        except Exception as e:
            # Trata exceções que podem ocorrer durante a exclusão
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # Retorna uma resposta de erro com detalhes da exceção
