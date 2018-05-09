import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import BigSearch from './BigSearch';

const action = _ => console.log('Clicked');

storiesOf('Big search', module).add('default', () => (
    <div
        className={css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        })}
    >
        <BigSearch placeholder="Tell me a story" />
    </div>
));
