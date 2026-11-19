from django.db import models


class Producto(models.Model):
    nombre = models.CharField("nombre del producto", max_length=120)
    descripcion = models.TextField("descripción", blank=True)
    precio = models.DecimalField("precio", max_digits=10, decimal_places=2)
    fecha_registro = models.DateField("fecha de registro")

    class Meta:
        db_table = "productos"
        ordering = ["-fecha_registro", "-id"]
        verbose_name = "producto"
        verbose_name_plural = "productos"

    def __str__(self):
        return self.nombre


class Cliente(models.Model):
    nombre = models.CharField("nombre", max_length=120)
    direccion = models.CharField("dirección", max_length=255)
    telefono = models.CharField("teléfono", max_length=20)
    fecha_nacimiento = models.DateField("fecha de nacimiento")

    class Meta:
        db_table = "clientes"
        ordering = ["nombre"]
        verbose_name = "cliente"
        verbose_name_plural = "clientes"

    def __str__(self):
        return self.nombre
