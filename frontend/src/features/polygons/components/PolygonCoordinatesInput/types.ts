import type {Coordinate} from '../../types';

export interface PolygonCoordinatesInputProps {
    onApply: (coordinates: Coordinate[]) => void;
    onClear: () => void;
}
