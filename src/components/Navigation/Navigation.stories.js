import React from 'react';
import faker from 'faker';
import { storiesOf } from '@storybook/react';
import Mast from './Mast';
import BottomBar from './BottomBar';
import { randomIcon } from '../../stories/shared';

const action = () => console.log('Clicked');

const DEMO_ITEMS = [
    { text: 'Google', link: 'https://google.com' },
    { text: 'Facebook', link: 'https://facebook.com' },
    { text: 'Twitter', link: 'https://twitter.com' },
    { text: 'Instagram', link: 'https://instagram.com' }
];

const ITEMS = Array(3)
    .fill()
    .map(_ => ({
        onClick: action,
        label: faker.commerce.productMaterial(),
        icon: randomIcon()
    }));

storiesOf('Navigation', module)
    .add('Mast', () => <Mast items={DEMO_ITEMS} />)
    .add('BottomBar', () => (
        <div>
            {faker.lorem.paragraphs(30)}
            <BottomBar items={ITEMS} />
        </div>
    ));
