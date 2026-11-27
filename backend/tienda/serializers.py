import re
from datetime import date

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Cliente, Producto

CODIGO_RE = re.compile(r"[A-Z0-9][A-Z0-9-]{0,19}")


def limpiar_codigo(value):
    value = value.strip().upper()
    if not CODIGO_RE.fullmatch(value):
        raise serializers.ValidationError("Usa solo letras, números y guiones (máx. 20). Ejemplo: P-0001.")
    return value


def campo_codigo(model, que):
    return serializers.CharField(
        max_length=20,
        validators=[UniqueValidator(queryset=model.objects.all(), lookup="iexact",
                                    message=f"Ya existe {que} con este código.")],
    )


def texto_requerido(value, campo):
    value = value.strip()
    if not value:
        raise serializers.ValidationError(f"Escribe {campo}.")
    return value


class ProductoSerializer(serializers.ModelSerializer):
    codigo = campo_codigo(Producto, "un producto")

    class Meta:
        model = Producto
        fields = ["id", "codigo", "producto", "descripcion", "costo_unitario", "precio_venta", "stock", "fecha_registro"]
        extra_kwargs = {
            "costo_unitario": {"error_messages": {"invalid": "Escribe un costo válido."}},
            "precio_venta": {"error_messages": {"invalid": "Escribe un precio válido."}},
            "stock": {"error_messages": {"invalid": "Escribe un número entero."}},
            "fecha_registro": {"error_messages": {"invalid": "Escribe una fecha válida."}},
        }

    def validate_codigo(self, value):
        return limpiar_codigo(value)

    def validate_producto(self, value):
        return texto_requerido(value, "el nombre del producto")

    def validate_descripcion(self, value):
        return value.strip()

    def validate_precio_venta(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio de venta debe ser mayor a 0.")
        return value

    def validate_costo_unitario(self, value):
        if value < 0:
            raise serializers.ValidationError("El costo unitario no puede ser negativo.")
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("El stock no puede ser negativo.")
        return value

    def validate_fecha_registro(self, value):
        if value > date.today():
            raise serializers.ValidationError("La fecha de registro no puede ser futura.")
        return value

    def validate(self, datos):
        costo = datos.get("costo_unitario", getattr(self.instance, "costo_unitario", None))
        precio = datos.get("precio_venta", getattr(self.instance, "precio_venta", None))
        if costo is not None and precio is not None and precio < costo:
            raise serializers.ValidationError(
                {"precio_venta": "El precio de venta no puede ser menor que el costo unitario."})
        return datos


class ClienteSerializer(serializers.ModelSerializer):
    codigo = campo_codigo(Cliente, "un cliente")

    class Meta:
        model = Cliente
        fields = ["id", "codigo", "nombre", "direccion", "telefono", "correo", "fecha_nacimiento", "gustos"]
        extra_kwargs = {
            "correo": {"error_messages": {"invalid": "Escribe un correo válido, por ejemplo ana@correo.com."}},
        }

    def validate_codigo(self, value):
        return limpiar_codigo(value)

    def validate_nombre(self, value):
        return texto_requerido(value, "el nombre")

    def validate_direccion(self, value):
        return texto_requerido(value, "la dirección")

    def validate_telefono(self, value):
        value = value.strip()
        digitos = re.sub(r"\D", "", value)
        if not re.fullmatch(r"[\d\s+()-]+", value) or not 10 <= len(digitos) <= 15:
            raise serializers.ValidationError("Escribe un teléfono de 10 dígitos (puede llevar espacios, +, - o paréntesis).")
        return value

    def validate_correo(self, value):
        return value.strip().lower()

    def validate_fecha_nacimiento(self, value):
        if value > date.today():
            raise serializers.ValidationError("La fecha de nacimiento no puede ser futura.")
        if value.year < 1900:
            raise serializers.ValidationError("Revisa el año de nacimiento.")
        return value

    def validate_gustos(self, value):
        return value.strip()
