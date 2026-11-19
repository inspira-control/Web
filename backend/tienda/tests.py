from django.test import TestCase
from rest_framework.test import APIClient


class CrudTests(TestCase):
    def setUp(self):
        self.api = APIClient()

    def test_producto_crud(self):
        r = self.api.post("/api/productos/", {"nombre": "Taza", "descripcion": "Taza personalizada",
                                              "precio": "150.00", "fecha_registro": "2026-11-19"}, format="json")
        self.assertEqual(r.status_code, 201)
        pid = r.data["id"]
        r = self.api.patch(f"/api/productos/{pid}/", {"precio": "180.50"}, format="json")
        self.assertEqual(r.data["precio"], "180.50")
        self.assertEqual(len(self.api.get("/api/productos/").data), 1)
        self.assertEqual(self.api.delete(f"/api/productos/{pid}/").status_code, 204)

    def test_precio_negativo(self):
        r = self.api.post("/api/productos/", {"nombre": "X", "precio": "-1", "fecha_registro": "2026-11-19"}, format="json")
        self.assertEqual(r.status_code, 400)

    def test_cliente_crud(self):
        r = self.api.post("/api/clientes/", {"nombre": "Ana", "direccion": "Calle 1", "telefono": "55 1234 5678",
                                             "fecha_nacimiento": "1990-05-10"}, format="json")
        self.assertEqual(r.status_code, 201)
        cid = r.data["id"]
        r = self.api.put(f"/api/clientes/{cid}/", {"nombre": "Ana López", "direccion": "Calle 2",
                                                   "telefono": "5512345678", "fecha_nacimiento": "1990-05-10"}, format="json")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(self.api.delete(f"/api/clientes/{cid}/").status_code, 204)
