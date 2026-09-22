from django.contrib.gis.db import models


class ExistingPolygon(models.Model):
    name = models.CharField(max_length=255)
    geometry = models.PolygonField(srid=4326)
    crosses_antimeridian = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'polygons_polygon'