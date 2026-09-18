import {useState} from 'react';
import {
    Button,
    Container,
    Grid,
    Group,
    NumberInput,
    Paper,
    Stack,
    Text,
    TextInput,
    Textarea,
    Title,
} from '@mantine/core';
import type {Coordinate} from './features/polygons/types';
import {PolygonMap} from './features/polygons/components/PolygonMap';
import styles from './App.module.css';

export const App = () => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState<number | string>('');
    const [longitude, setLongitude] = useState<number | string>('');
    const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

    const handleAddCoordinate = () => {
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return;
        }

        setCoordinates((current) => [
            ...current,
            [longitude, latitude],
        ]);

        setLatitude('');
        setLongitude('');
    };

    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <div>
                    <Title order={1}>
                        Polygon Manager
                    </Title>

                    <Text c="dimmed">
                        Создание и просмотр географических полигонов
                    </Text>
                </div>

                <Grid>
                    <Grid.Col span={{base: 12, md: 5}}>
                        <Paper withBorder radius="md" p="lg">
                            <Stack>
                                <Title order={2} size="h3">
                                    Новый полигон
                                </Title>

                                <TextInput
                                    label="Название"
                                    placeholder="Например, Test polygon"
                                    value={name}
                                    onChange={(event) => setName(event.currentTarget.value)}
                                />

                                <Group grow>
                                    <NumberInput
                                        label="Широта"
                                        placeholder="59.9"
                                        value={latitude}
                                        onChange={setLatitude}
                                        min={-90}
                                        max={90}
                                        decimalScale={6}
                                    />

                                    <NumberInput
                                        label="Долгота"
                                        placeholder="30.3"
                                        value={longitude}
                                        onChange={setLongitude}
                                        decimalScale={6}
                                    />
                                </Group>

                                <Button onClick={handleAddCoordinate}>
                                    Добавить координату
                                </Button>

                                <Textarea
                                    label="Координаты полигона"
                                    value={JSON.stringify(coordinates, null, 2)}
                                    classNames={{
                                        input: styles.coordinatesTextarea,
                                    }}
                                    readOnly
                                />

                                <Button disabled>
                                    Submit
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{base: 12, md: 7}}>
                        <PolygonMap coordinates={coordinates} />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
};
