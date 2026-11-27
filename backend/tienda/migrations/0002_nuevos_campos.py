"""
Actualiza las tablas a los nuevos campos sin perder los registros que ya existen.

productos: código, producto, descripción, costo unitario, precio de venta, stock, fecha de registro
clientes:  código, nombre, dirección, teléfono, correo, fecha de nacimiento, gustos

- "nombre" -> "producto" y "precio" -> "precio_venta" se RENOMBRAN (los datos se conservan).
- A los registros existentes se les asigna un código automático (P-0001, C-0001, ...).
- La fecha de registro de los productos existentes se conserva.
- Los productos existentes quedan con costo unitario 0 y stock 0, y los clientes con correo vacío
  (se pueden completar desde la página con "Editar").
"""
from django.core.validators import MinValueValidator
from django.db import migrations, models


def asignar_codigos(apps, schema_editor):
    for modelo, prefijo in (("Producto", "P"), ("Cliente", "C")):
        Model = apps.get_model("tienda", modelo)
        for obj in Model.objects.filter(codigo__isnull=True).order_by("id"):
            obj.codigo = f"{prefijo}-{obj.id:04d}"
            obj.save(update_fields=["codigo"])


class Migration(migrations.Migration):

    dependencies = [("tienda", "0001_initial")]

    operations = [
        # ---------- Productos ----------
        migrations.RenameField("producto", "nombre", "producto"),
        migrations.RenameField("producto", "precio", "precio_venta"),
        migrations.AlterModelOptions(
            name="producto",
            options={"ordering": ["codigo"], "verbose_name": "producto", "verbose_name_plural": "productos"},
        ),
        migrations.AlterField(
            model_name="producto",
            name="producto",
            field=models.CharField(max_length=120, verbose_name="producto"),
        ),
        migrations.AlterField(
            model_name="producto",
            name="precio_venta",
            field=models.DecimalField(decimal_places=2, max_digits=10,
                                      validators=[MinValueValidator(0)], verbose_name="precio de venta"),
        ),
        migrations.AddField(
            model_name="producto",
            name="costo_unitario",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10,
                                      validators=[MinValueValidator(0)], verbose_name="costo unitario"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="producto",
            name="stock",
            field=models.PositiveIntegerField(default=0, verbose_name="stock"),
        ),
        migrations.AddField(
            model_name="producto",
            name="codigo",
            field=models.CharField(max_length=20, null=True, verbose_name="código"),
        ),
        # ---------- Clientes ----------
        migrations.AlterModelOptions(
            name="cliente",
            options={"ordering": ["codigo"], "verbose_name": "cliente", "verbose_name_plural": "clientes"},
        ),
        migrations.AddField(
            model_name="cliente",
            name="codigo",
            field=models.CharField(max_length=20, null=True, verbose_name="código"),
        ),
        migrations.AddField(
            model_name="cliente",
            name="correo",
            field=models.EmailField(default="", max_length=254, verbose_name="correo"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="cliente",
            name="gustos",
            field=models.TextField(blank=True, default="", verbose_name="gustos"),
            preserve_default=False,
        ),
        # ---------- Códigos para los registros que ya existían ----------
        migrations.RunPython(asignar_codigos, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="producto",
            name="codigo",
            field=models.CharField(max_length=20, unique=True, verbose_name="código"),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="codigo",
            field=models.CharField(max_length=20, unique=True, verbose_name="código"),
        ),
    ]
