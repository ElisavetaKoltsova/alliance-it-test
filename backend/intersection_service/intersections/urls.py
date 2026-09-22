from django.urls import path

from .views import IntersectionCheckView


urlpatterns = [
    path(
        'intersections/check/',
        IntersectionCheckView.as_view(),
        name='intersection-check',
    ),
]