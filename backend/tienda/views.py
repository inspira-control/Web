from rest_framework import viewsets

from .models import Cliente, Producto
from .serializers import ClienteSerializer, ProductoSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    """Listar, crear, editar y eliminar productos: /api/productos/"""
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    """Listar, crear, editar y eliminar clientes: /api/clientes/"""
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
