import {Button, Paper, Stack, TextInput, Title} from '@mantine/core';

import {MIN_POLYGON_COORDINATES} from '../../constants';
import type {Coordinate} from '../../types';
import {PolygonCoordinatesInput} from '../PolygonCoordinatesInput';

interface PolygonFormProps {
    name: string;
    coordinates: Coordinate[];
    onNameChange: (name: string) => void;
    onCoordinatesChange: (coordinates: Coordinate[]) => void;
}

export const PolygonForm = ({
    name,
    coordinates,
    onNameChange,
    onCoordinatesChange,
}: PolygonFormProps) => {
    const canSubmit = name.trim().length > 0 && coordinates.length >= MIN_POLYGON_COORDINATES;

    const handleClearCoordinates = () => {
        onCoordinatesChange([]);
    };

    return (
        <Paper withBorder radius="md" p="lg">
            <Stack>
                <Title order={2} size="h3">
                    Новый полигон
                </Title>

                <TextInput
                    label="Название"
                    placeholder="Например, Test polygon"
                    value={name}
                    onChange={(event) => onNameChange(event.currentTarget.value)}
                />

                <PolygonCoordinatesInput
                    onApply={onCoordinatesChange}
                    onClear={handleClearCoordinates}
                />

                <Button disabled={!canSubmit}>Добавить</Button>
            </Stack>
        </Paper>
    );
};
