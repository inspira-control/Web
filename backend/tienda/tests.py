from django.test import TestCase
from rest_framework.test import APIClient

PRODUCTO = {"codigo": "p-0001", "producto": "Taza", "descripcion": "Taza personalizada",
            "costo_unitario": "60.00", "precio_venta": "150.00", "stock": 12, "fecha_registro": "2026-11-19"}
CLIENTE = {"codigo": "C-0001", "nombre": "Ana", "direccion": "Calle 1", "telefono": "55 1234 5678",
           "correo": "Ana@Correo.com", "fecha_nacimiento": "1990-05-10", "gustos": "Tazas, color lila"}


class ProductoTests(TestCase):
    def setUp(self):
        self.api = APIClient()

    def test_crud_completo(self):
        r = self.api.post("/api/productos/", PRODUCTO, format="json")
        self.assertEqual(r.status_code, 201, r.data)
        self.assertEqual(r.data["codigo"], "P-0001")  # se guarda en mayúsculas
        pid = r.data["id"]
        r = self.api.put(f"/api/productos/{pid}/", {**PRODUCTO, "precio_venta": "180.50", "costo_unitario": "70.00"}, format="json")
        self.assertEqual(r.status_code, 200, r.data)
        self.assertEqual(r.data["precio_venta"], "180.50")
        self.assertEqual(r.data["costo_unitario"], "70.00")
        self.assertEqual(r.data["fecha_registro"], "2026-11-19")
        self.assertEqual(len(self.api.get("/api/productos/?search=taza").data), 1)
        self.assertEqual(len(self.api.get("/api/productos/?search=nada").data), 0)
        self.assertEqual(self.api.delete(f"/api/productos/{pid}/").status_code, 204)
        self.assertEqual(self.api.get(f"/api/productos/{pid}/").status_code, 404)

    def test_validaciones(self):
        r = self.api.post("/api/productos/", {**PRODUCTO, "precio_venta": "-1", "costo_unitario": "-2", "stock": -1, "producto": "  ",
                                               "fecha_registro": "2999-01-01"}, format="json")
        self.assertEqual(r.status_code, 400)
        self.assertIn("precio_venta", r.data)
        self.assertIn("costo_unitario", r.data)
        self.assertIn("producto", r.data)
        self.assertIn("fecha_registro", r.data)
        self.assertIn("stock", r.data)

    def test_precio_menor_que_costo(self):
        r = self.api.post("/api/productos/", {**PRODUCTO, "costo_unitario": "200", "precio_venta": "150"}, format="json")
        self.assertEqual(r.status_code, 400)
        self.assertIn("precio_venta", r.data)

    def test_codigo_unico(self):
        self.api.post("/api/productos/", PRODUCTO, format="json")
        r = self.api.post("/api/productos/", {**PRODUCTO, "codigo": "P-0001"}, format="json")
        self.assertEqual(r.status_code, 400)
        self.assertIn("codigo", r.data)

    def test_editar_conserva_su_codigo(self):
        pid = self.api.post("/api/productos/", PRODUCTO, format="json").data["id"]
        r = self.api.put(f"/api/productos/{pid}/", {**PRODUCTO, "codigo": "P-0001"}, format="json")
        self.assertEqual(r.status_code, 200, r.data)


class ClienteTests(TestCase):
    def setUp(self):
        self.api = APIClient()

    def test_crud_completo(self):
        r = self.api.post("/api/clientes/", CLIENTE, format="json")
        self.assertEqual(r.status_code, 201, r.data)
        self.assertEqual(r.data["correo"], "ana@correo.com")
        cid = r.data["id"]
        r = self.api.put(f"/api/clientes/{cid}/", {**CLIENTE, "nombre": "Ana López", "gustos": ""}, format="json")
        self.assertEqual(r.status_code, 200, r.data)
        self.assertEqual(len(self.api.get("/api/clientes/?search=lópez").data), 1)
        self.assertEqual(self.api.delete(f"/api/clientes/{cid}/").status_code, 204)

    def test_validaciones(self):
        r = self.api.post("/api/clientes/", {**CLIENTE, "correo": "no-es-correo", "telefono": "123",
                                             "fecha_nacimiento": "2999-01-01"}, format="json")
        self.assertEqual(r.status_code, 400)
        for campo in ("correo", "telefono", "fecha_nacimiento"):
            self.assertIn(campo, r.data)

    def test_codigo_unico(self):
        self.api.post("/api/clientes/", CLIENTE, format="json")
        r = self.api.post("/api/clientes/", {**CLIENTE, "codigo": "c-0001"}, format="json")
        self.assertEqual(r.status_code, 400)
        self.assertIn("codigo", r.data)
