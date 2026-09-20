import {Button, Group, NumberInput, Paper, Stack, Textarea, TextInput, Title} from '@mantine/core';
import {useState} from 'react';

import {formatCoordinates} from '../../utils/formatCoordinates';
import {COORDINATE_DECIMAL_SCALE, MAX_LATITUDE, MIN_LATITUDE} from './constants';
import styles from './PolygonForm.module.css';
import type {PolygonFormProps} from './types';

export const PolygonForm = ({
    name,
    coordinates,
    onNameChange,
    onAddCoordinate,
}: PolygonFormProps) => {
    const [latitude, setLatitude] = useState<number | string>('');
    const [longitude, setLongitude] = useState<number | string>('');

    const isCoordinateValid = typeof latitude === 'number' && typeof longitude === 'number';

    const handleAddCoordinate = () => {
        if (!isCoordinateValid) {
            return;
        }

        onAddCoordinate([longitude, latitude]);

        setLatitude('');
        setLongitude('');
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

                <Group grow>
                    <NumberInput
                        label="Широта"
                        placeholder="59.9"
                        value={latitude}
                        onChange={setLatitude}
                        min={MIN_LATITUDE}
                        max={MAX_LATITUDE}
                        decimalScale={COORDINATE_DECIMAL_SCALE}
                    />

                    <NumberInput
                        label="Долгота"
                        placeholder="30.3"
                        value={longitude}
                        onChange={setLongitude}
                        decimalScale={COORDINATE_DECIMAL_SCALE}
                    />
                </Group>

                <Button onClick={handleAddCoordinate} disabled={!isCoordinateValid}>
                    Добавить координату
                </Button>

                <Textarea
                    label="Координаты полигона"
                    value={formatCoordinates(coordinates)}
                    classNames={{
                        input: styles.coordinatesTextarea,
                    }}
                    readOnly
                />

                <Button disabled>Submit</Button>
            </Stack>
        </Paper>
    );
};
