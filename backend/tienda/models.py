from django.core.validators import MinValueValidator
from django.db import models


class Producto(models.Model):
    codigo = models.CharField("código", max_length=20, unique=True)
    producto = models.CharField("producto", max_length=120)
    descripcion = models.TextField("descripción", blank=True)
    costo_unitario = models.DecimalField(
        "costo unitario", max_digits=10, decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    precio_venta = models.DecimalField(
        "precio de venta", max_digits=10, decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    stock = models.PositiveIntegerField("stock", default=0)
    fecha_registro = models.DateField("fecha de registro")

    class Meta:
        db_table = "productos"
        ordering = ["codigo"]
        verbose_name = "producto"
        verbose_name_plural = "productos"

    def __str__(self):
        return f"{self.codigo} · {self.producto}"


class Cliente(models.Model):
    codigo = models.CharField("código", max_length=20, unique=True)
    nombre = models.CharField("nombre", max_length=120)
    direccion = models.CharField("dirección", max_length=255)
    telefono = models.CharField("teléfono", max_length=20)
    correo = models.EmailField("correo", max_length=254)
    fecha_nacimiento = models.DateField("fecha de nacimiento")
    gustos = models.TextField("gustos", blank=True)

    class Meta:
        db_table = "clientes"
        ordering = ["codigo"]
        verbose_name = "cliente"
        verbose_name_plural = "clientes"

    def __str__(self):
        return f"{self.codigo} · {self.nombre}"
