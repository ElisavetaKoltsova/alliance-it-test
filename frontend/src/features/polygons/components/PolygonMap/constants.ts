import type {ControlPosition, LngLatLike} from 'maplibre-gl';

export const MAP_STYLE_URL = 'https://demotiles.maplibre.org/globe.json';

export const INITIAL_MAP_CENTER: LngLatLike = [30.3, 59.9];
export const INITIAL_MAP_ZOOM = 1;

export const POLYGON_SOURCE_ID = 'polygon-source';
export const POLYGON_FILL_LAYER_ID = 'polygon-fill';
export const POLYGON_LINE_LAYER_ID = 'polygon-line';
export const POLYGON_POINTS_LAYER_ID = 'polygon-points';
export const POLYGON_FILL_COLOR = '#228be6';
export const POLYGON_FILL_OPACITY = 0.2;
export const POLYGON_LINE_COLOR = '#1971c2';
export const POLYGON_LINE_WIDTH = 3;
export const POLYGON_POINT_COLOR = '#fa5252';
export const POLYGON_POINT_RADIUS = 5;

export const MAP_CONTROLS_POSITION: ControlPosition = 'top-right';