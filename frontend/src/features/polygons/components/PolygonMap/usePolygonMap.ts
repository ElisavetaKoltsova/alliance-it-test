import {useEffect, useRef} from 'react';
import {Map, NavigationControl, setWorkerUrl} from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import type {Coordinate} from '../../types';
import {
    INITIAL_MAP_CENTER,
    INITIAL_MAP_ZOOM,
    MAP_CONTROLS_POSITION,
    MAP_STYLE_URL,
} from './constants';
import {
    addPolygonLayers,
    updatePolygonSource,
} from './mapLayers';

setWorkerUrl(workerUrl);

export const usePolygonMap = (coordinates: Coordinate[]) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);
    const coordinatesRef = useRef(coordinates);

    coordinatesRef.current = coordinates;

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const map = new Map({
            container: containerRef.current,
            style: MAP_STYLE_URL,
            center: INITIAL_MAP_CENTER,
            zoom: INITIAL_MAP_ZOOM,
        });

        map.addControl(
            new NavigationControl({
                showZoom: true,
                showCompass: true,
            }),
            MAP_CONTROLS_POSITION,
        );

        mapRef.current = map;

        map.on('load', () => {
            addPolygonLayers(map);
            updatePolygonSource(map, coordinatesRef.current);
        });

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) {
            return;
        }

        updatePolygonSource(mapRef.current, coordinates);
    }, [coordinates]);

    return containerRef;
};