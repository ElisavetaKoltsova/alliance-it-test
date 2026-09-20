import type {GeoJSONSource, Map} from 'maplibre-gl';

import type {Coordinate} from '../../types';
import {createPolygonGeoJson} from '../../utils/createPolygonGeoJson';
import {
    POLYGON_FILL_COLOR,
    POLYGON_FILL_LAYER_ID,
    POLYGON_FILL_OPACITY,
    POLYGON_LINE_COLOR,
    POLYGON_LINE_LAYER_ID,
    POLYGON_LINE_WIDTH,
    POLYGON_POINT_COLOR,
    POLYGON_POINT_RADIUS,
    POLYGON_POINTS_LAYER_ID,
    POLYGON_SOURCE_ID,
} from './constants';

export const addPolygonLayers = (map: Map) => {
    map.addSource(POLYGON_SOURCE_ID, {
        type: 'geojson',
        data: createPolygonGeoJson([]),
    });

    map.addLayer({
        id: POLYGON_FILL_LAYER_ID,
        type: 'fill',
        source: POLYGON_SOURCE_ID,
        filter: ['==', '$type', 'Polygon'],
        paint: {
            'fill-color': POLYGON_FILL_COLOR,
            'fill-opacity': POLYGON_FILL_OPACITY,
        },
    });

    map.addLayer({
        id: POLYGON_LINE_LAYER_ID,
        type: 'line',
        source: POLYGON_SOURCE_ID,
        filter: ['==', '$type', 'LineString'],
        paint: {
            'line-color': POLYGON_LINE_COLOR,
            'line-width': POLYGON_LINE_WIDTH,
        },
    });

    map.addLayer({
        id: POLYGON_POINTS_LAYER_ID,
        type: 'circle',
        source: POLYGON_SOURCE_ID,
        filter: ['==', '$type', 'Point'],
        paint: {
            'circle-color': POLYGON_POINT_COLOR,
            'circle-radius': POLYGON_POINT_RADIUS,
        },
    });
};

export const updatePolygonSource = (map: Map, coordinates: Coordinate[]) => {
    const source = map.getSource(POLYGON_SOURCE_ID);

    if (!source) {
        return;
    }

    (source as GeoJSONSource).setData(createPolygonGeoJson(coordinates));
};
