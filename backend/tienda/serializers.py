import re
from datetime import date

from rest_framework import serializers

from .models import Cliente, Producto


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ["id", "nombre", "descripcion", "precio", "fecha_registro"]

    def validate_precio(self, value):
        if value < 0:
            raise serializers.ValidationError("El precio no puede ser negativo.")
        return value


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ["id", "nombre", "direccion", "telefono", "fecha_nacimiento"]

    def validate_telefono(self, value):
        if not re.fullmatch(r"[\d\s+()-]{7,20}", value):
            raise serializers.ValidationError("Escribe un teléfono válido (solo números, espacios, +, -, paréntesis).")
        return value.strip()

    def validate_fecha_nacimiento(self, value):
        if value > date.today():
            raise serializers.ValidationError("La fecha de nacimiento no puede ser futura.")
        return value
