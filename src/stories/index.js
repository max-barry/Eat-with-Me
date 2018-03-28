import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import MediaElement from '../components/MediaElement';
import RestaurantMediaElement from '../components/MediaElement/RestaurantMediaElement';

storiesOf('Welcome', module).add('to Storybook', () => (
    <Welcome showApp={linkTo('MediaElement')} />
));

storiesOf('MediaElement', module)
    .add('default', () => <MediaElement />)
    .add('Restaurant', () => <RestaurantMediaElement />);
