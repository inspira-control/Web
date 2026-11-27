from rest_framework import filters, viewsets

from .models import Cliente, Producto
from .serializers import ClienteSerializer, ProductoSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    """Listar, buscar (?search=), crear, editar y eliminar productos: /api/productos/"""
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["codigo", "producto", "descripcion"]


class ClienteViewSet(viewsets.ModelViewSet):
    """Listar, buscar (?search=), crear, editar y eliminar clientes: /api/clientes/"""
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["codigo", "nombre", "telefono", "correo", "direccion", "gustos"]
