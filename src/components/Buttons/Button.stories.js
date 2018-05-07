import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonSimple from './ButtonSimple';
import ButtonLink from './ButtonLink';

const action = _ => console.log('Clicked');

storiesOf('Buttons', module)
    .add('Simple', () => <ButtonSimple onClick={action}>Click me</ButtonSimple>)
    .add('Link', () => <ButtonLink onClick={action}>Click me</ButtonLink>);
