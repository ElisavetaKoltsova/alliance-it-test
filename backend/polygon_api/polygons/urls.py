from rest_framework.routers import DefaultRouter

from .views import PolygonViewSet


router = DefaultRouter()
router.register('polygons', PolygonViewSet)

urlpatterns = router.urls