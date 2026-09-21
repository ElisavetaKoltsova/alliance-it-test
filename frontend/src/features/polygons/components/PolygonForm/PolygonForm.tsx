import {Button, Paper, Stack, TextInput, Title, Tooltip} from '@mantine/core';

import {MIN_POLYGON_COORDINATES} from '../../constants';
import type {Coordinate} from '../../types';
import {PolygonCoordinatesInput} from '../PolygonCoordinatesInput';

interface PolygonFormProps {
    name: string;
    coordinates: Coordinate[];
    isSubmitting: boolean;
    onNameChange: (name: string) => void;
    onCoordinatesChange: (coordinates: Coordinate[]) => void;
    onSubmit: () => void;
}

export const PolygonForm = ({
    name,
    coordinates,
    isSubmitting,
    onNameChange,
    onCoordinatesChange,
    onSubmit,
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

                <Tooltip label="Сохранить полигон в базе данных">
                    <Button
                        fullWidth
                        disabled={!canSubmit}
                        loading={isSubmitting}
                        onClick={onSubmit}
                    >
                        Сохранить полигон
                    </Button>
                </Tooltip>
            </Stack>
        </Paper>
    );
};
