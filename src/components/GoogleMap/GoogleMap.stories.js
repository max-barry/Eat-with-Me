import React from 'react';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import randomLocation from 'random-location';
import GoogleMap, { MARKER_STYLES } from './GoogleMap';
import { MediaElement } from '../Structures';

const TRAFALGAR = { latitude: 51.5079211, longitude: -0.1294319 };

const MARKERS = Array(5)
    .fill()
    .map(_ => ({
        id: faker.random.uuid(),
        labelStyle: faker.random.arrayElement(Object.values(MARKER_STYLES)),
        coordinates: (() => {
            const {
                latitude: lat,
                longitude: lng
            } = randomLocation.randomCirclePoint(TRAFALGAR, 8000);
            return { lat, lng };
        })(),
        expandedProps: {
            title: faker.company.catchPhrase(),
            width: 260,
            smallFont: true,
            src: 'https://source.unsplash.com/featured/200x200/',
            strap: [
                faker.lorem.word(),
                faker.lorem.word(),
                faker.lorem.word()
            ].join(' • ')
        }
    }));

storiesOf('GoogleMap', module)
    .addDecorator(centered)
    .add('default', () => (
        <GoogleMap expandedElement={MediaElement} markers={MARKERS} />
    ));
