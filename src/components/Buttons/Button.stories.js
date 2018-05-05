import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonSimple from './ButtonSimple';

const action = _ => console.log('Clicked');

storiesOf('Buttons', module).add('Simple', () => (
    <ButtonSimple onClick={action}>Click me</ButtonSimple>
));
