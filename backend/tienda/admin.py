from django.contrib import admin

from .models import Cliente, Producto


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "precio", "fecha_registro")
    search_fields = ("nombre",)


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("nombre", "telefono", "fecha_nacimiento")
    search_fields = ("nombre", "telefono")
