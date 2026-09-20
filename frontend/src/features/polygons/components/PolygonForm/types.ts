import type {Coordinate} from '../../types';

export interface PolygonFormProps {
    name: string;
    coordinates: Coordinate[];
    onNameChange: (name: string) => void;
    onAddCoordinate: (coordinate: Coordinate) => void;
}
