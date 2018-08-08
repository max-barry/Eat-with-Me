import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, color, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import styled from 'react-emotion';
import Simple from './Simple';
import Badge from './Badge';
import { colors, bs } from '../../settings';
import trash from '../../../public/images/icons/trash.svg';

const Showcase = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '> *': { marginRight: bs(0.25), marginLeft: bs(0.25) }
});

storiesOf('Buttons', module)
    .addDecorator(centered)
    .add('Buttons.Simple', _ => {
        const buttonProps = {
            color: color('Color', colors.primary),
            disabled: boolean('Disabled', false),
            onClick: () => console.log('Clicked')
        };
        return (
            <Showcase>
                <Simple {...buttonProps}>Basic button</Simple>
                <Simple {...buttonProps} mini>
                    Mini button
                </Simple>
                <Simple {...buttonProps} icon={trash}>
                    Icon button
                </Simple>
                <Simple {...buttonProps} recessive={true}>
                    Recessive button
                </Simple>
            </Showcase>
        );
    })
    .add('Buttons.Badge', _ => (
        <Badge color={color('Color', colors.primary)}>
            {number('Count', 1)}
        </Badge>
    ));
