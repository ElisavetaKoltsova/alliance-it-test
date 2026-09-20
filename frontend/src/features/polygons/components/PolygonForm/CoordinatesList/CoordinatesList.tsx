import {ActionIcon, Group, Stack, Text} from '@mantine/core';
import {IconTrash} from '@tabler/icons-react';

import type {CoordinatesListProps} from './types';

export const CoordinatesList = ({coordinates, onRemove}: CoordinatesListProps) => (
    <Stack gap="xs">
        {coordinates.map(([longitude, latitude], index) => (
            <Group key={`${longitude}-${latitude}-${index}`} justify="space-between">
                <Text size="sm">
                    {index + 1}. {longitude}, {latitude}
                </Text>

                <ActionIcon
                    variant="subtle"
                    color="red"
                    aria-label={`Удалить координату ${index + 1}`}
                    onClick={() => onRemove(index)}
                >
                    <IconTrash size={16} />
                </ActionIcon>
            </Group>
        ))}
    </Stack>
);
