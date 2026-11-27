from django.contrib import admin

from .models import Cliente, Producto


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("codigo", "producto", "costo_unitario", "precio_venta", "stock", "fecha_registro")
    search_fields = ("codigo", "producto", "descripcion")


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("codigo", "nombre", "direccion", "telefono", "correo", "fecha_nacimiento", "gustos")
    search_fields = ("codigo", "nombre", "telefono", "correo", "gustos")
