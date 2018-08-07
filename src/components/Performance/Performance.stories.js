import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import Img from './Img';

storiesOf('Performance', module)
    .addDecorator(centered)
    .add('Performance.Img', _ => (
        <div style={{ width: 320, height: 240 }}>
            <Img
                src="https://source.unsplash.com/random/400x300"
                width={320}
                height={240}
                responsive={true}
                alt="MyAlt"
            />
        </div>
    ));
