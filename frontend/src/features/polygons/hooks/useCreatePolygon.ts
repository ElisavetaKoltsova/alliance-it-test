import {notifications} from '@mantine/notifications';
import {useState} from 'react';

import {createPolygon} from '../api/createPolygon';
import type {CreatePolygonRequest} from '../api/types';

export const useCreatePolygon = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitPolygon = async (polygon: CreatePolygonRequest) => {
        setIsSubmitting(true);

        try {
            const createdPolygon = await createPolygon({
                ...polygon,
                name: polygon.name.trim(),
            });

            notifications.show({
                title: 'Полигон сохранён',
                message: `Полигон «${createdPolygon.name}» успешно добавлен`,
                color: 'green',
            });

            return createdPolygon;
        } catch {
            notifications.show({
                title: 'Ошибка',
                message: 'Не удалось сохранить полигон',
                color: 'red',
            });

            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        submitPolygon,
    };
};
