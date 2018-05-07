import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './Checkbox';
import Toggle, { ToggleWithLabel } from './Toggle';

const props = {
    id: 'someid',
    name: 'somename',
    checked: false,
    onChange: () => console.log('Action'),
    title: () => 'Title for component',
    tag: () => 'Tag underneath the title'
};

storiesOf('Forms', module)
    .add('Checkbox', () => <Checkbox {...props} />)
    .add('Toggle', () => <Toggle {...props} />)
    .add('Toggle with label', () => <ToggleWithLabel {...props} />);
