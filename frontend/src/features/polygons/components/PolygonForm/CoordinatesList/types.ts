import type {Coordinate} from '../../../types';

export interface CoordinatesListProps {
    coordinates: Coordinate[];
    onRemove: (index: number) => void;
}
