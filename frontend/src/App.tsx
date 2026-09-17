import {Button, Container, Paper, Stack, Text, TextInput, Title} from '@mantine/core';

export const App = () => {
    return (
        <Container size="md" py="xl">
            <Stack gap="lg">
                <div>
                    <Title order={1}>Polygon Manager</Title>

                    <Text c="dimmed" mt="xs">
                        Создание и просмотр географических полигонов
                    </Text>
                </div>

                <Paper withBorder shadow="sm" radius="md" p="lg">
                    <Stack>
                        <Title order={2} size="h3">
                            Новый полигон
                        </Title>

                        <TextInput
                            label="Название"
                            placeholder="Введите название полигона"
                        />

                        <Button>
                            Добавить полигон
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
};
