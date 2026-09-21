import {Button, Group, Stack, Textarea, Tooltip} from '@mantine/core';
import {useState} from 'react';

import {COORDINATES_PLACEHOLDER} from '../../constants';
import {parseCoordinatesInput} from '../../utils/parseCoordinatesInput';
import styles from './PolygonCoordinatesInput.module.css';
import type {PolygonCoordinatesInputProps} from './types';

export const PolygonCoordinatesInput = ({onApply, onClear}: PolygonCoordinatesInputProps) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleApply = () => {
        const result = parseCoordinatesInput(value);

        if (result.error || !result.coordinates) {
            setError(result.error ?? 'Не удалось обработать координаты');
            return;
        }

        setError(null);
        onApply(result.coordinates);
    };

    const handleClear = () => {
        setValue('');
        setError(null);
        onClear();
    };

    return (
        <Stack gap="xs">
            <Textarea
                label="Координаты полигона"
                description="Формат: [широта, долгота]"
                placeholder={COORDINATES_PLACEHOLDER}
                value={value}
                error={error}
                classNames={{
                    input: styles.textarea,
                }}
                onChange={(event) => setValue(event.currentTarget.value)}
            />

            <Group grow>
                <Tooltip label="Проверить координаты и отобразить полигон на карте">
                    <Button onClick={handleApply}>Показать на карте</Button>
                </Tooltip>

                <Tooltip label="Очистить координаты и убрать полигон с карты">
                    <Button variant="default" onClick={handleClear} disabled={!value}>
                        Очистить
                    </Button>
                </Tooltip>
            </Group>
        </Stack>
    );
};
