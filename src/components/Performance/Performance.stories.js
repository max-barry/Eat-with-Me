import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withState } from '@dump247/storybook-state';
import centered from '@storybook/addon-centered';
// import faker from 'faker';
// import { css } from 'emotion';
import { LoadingHeading, LoadingButton, LoadingImage } from './Loading';
import { bs } from '../../settings/styles';

storiesOf('Performance', module)
    .addDecorator(centered)
    .add('Loading Elements', () => (
        <ul style={{ width: 350 }}>
            <li>
                <LoadingImage margin={1} />
            </li>
            <li>
                <LoadingHeading margin={0.5} dominant={true} />
            </li>
            <li>
                <LoadingHeading margin={1} />
            </li>
            <li>
                <LoadingButton dominant={true} />
            </li>
        </ul>
    ));
