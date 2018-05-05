import React from 'react';
import { storiesOf } from '@storybook/react';
import Navigation from './Navigation';

const DEMO_ITEMS = [
    { text: 'Google', link: 'https://google.com' },
    { text: 'Facebook', link: 'https://facebook.com' },
    { text: 'Twitter', link: 'https://twitter.com' },
    { text: 'Instagram', link: 'https://instagram.com' }
];

storiesOf('Navigation', module).add('default', () => (
    <Navigation items={DEMO_ITEMS} />
));
