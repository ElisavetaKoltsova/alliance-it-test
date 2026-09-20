import {Container, Grid, Stack, Text, Title} from '@mantine/core';
import {useState} from 'react';

import {PolygonForm} from './features/polygons/components/PolygonForm';
import {PolygonMap} from './features/polygons/components/PolygonMap';
import type {Coordinate} from './features/polygons/types';

export const App = () => {
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <div>
                    <Title order={1}>Polygon Manager</Title>

                    <Text c="dimmed">Создание и просмотр географических полигонов</Text>
                </div>

                <Grid>
                    <Grid.Col span={{base: 12, md: 5}}>
                        <PolygonForm
                            name={name}
                            coordinates={coordinates}
                            onNameChange={setName}
                            onCoordinatesChange={setCoordinates}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, md: 7}}>
                        <PolygonMap coordinates={coordinates} />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
};

export default App;
