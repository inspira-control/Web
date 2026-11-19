from rest_framework.routers import DefaultRouter

from .views import ClienteViewSet, ProductoViewSet

router = DefaultRouter()
router.register("productos", ProductoViewSet)
router.register("clientes", ClienteViewSet)

urlpatterns = router.urls
