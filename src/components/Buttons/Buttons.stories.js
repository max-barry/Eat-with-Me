import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, color, number } from '@storybook/addon-knobs';
import Simple from './Simple';
import Badge from './Badge';
import { colors } from '../../settings';
import trash from '../../../public/images/icons/trash.svg';

storiesOf('Buttons', module)
    .add('Buttons.Simple', _ => (
        <Simple
            color={color('Color', colors.primary)}
            disabled={boolean('Disabled', false)}
            recessive={boolean('Recessive', false)}
            icon={boolean('Icon', false) ? trash : null}
        >
            Click me
        </Simple>
    ))
    .add('Buttons.Badge', _ => (
        <Badge color={color('Color', colors.primary)}>
            {number('Count', 1)}
        </Badge>
    ));
