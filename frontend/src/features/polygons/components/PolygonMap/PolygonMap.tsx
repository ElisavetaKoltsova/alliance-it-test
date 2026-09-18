import 'maplibre-gl/dist/maplibre-gl.css';
import type {Coordinate} from '../../types';
import styles from './PolygonMap.module.css';
import {usePolygonMap} from './usePolygonMap';

interface PolygonMapProps {
    coordinates: Coordinate[];
}

export const PolygonMap = ({
    coordinates,
}: PolygonMapProps) => {
    const containerRef = usePolygonMap(coordinates);

    return (
        <div
            ref={containerRef}
            className={styles.container}
        />
    );
};