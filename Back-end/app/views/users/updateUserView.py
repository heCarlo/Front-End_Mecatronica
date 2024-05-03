from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class UpdateUserView(generics.UpdateAPIView):
    # Define uma view para atualizar uma instância de UserEntity usando generics.UpdateAPIView
    queryset = UserEntity.objects.all()  # Define o conjunto de consultas para todas as instâncias de UserEntity
    serializer_class = UserEntitySerializer  # Define a classe do serializador para UserEntitySerializer

    def update(self, request, *args, **kwargs):
        try:
            # Recupera 'partial' de kwargs, assume False se não estiver presente
            partial = kwargs.pop('partial', False)
            # Obtém a instância e serializa os dados recebidos para atualização
            instance = self.get_object()  # Obtém a instância a ser atualizada
            serializer = self.get_serializer(instance, data=request.data, partial=partial)  # Obtém o serializador
            serializer.is_valid(raise_exception=True)  # Valida os dados recebidos
            serializer.save()  # Salva os dados atualizados
            return Response(serializer.data)  # Retorna os dados serializados
        except Exception as e:
            # Trata exceções que podem ocorrer durante a atualização
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)  # Retorna uma resposta de erro com detalhes da exceção
