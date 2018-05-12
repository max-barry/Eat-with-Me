import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import Checkbox from './Checkbox';
import Toggle, { ToggleWithLabel } from './Toggle';
import Chip from './Chip';
import { colors } from '../../settings/styles';

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
    .add('Toggle with label', () => <ToggleWithLabel {...props} />)
    .add(
        'Chip',
        withState({ checked: false })(({ store }) => (
            <Chip
                {...props}
                checked={store.state.checked}
                onChange={() => store.set({ checked: !store.state.checked })}
                label="Mexican"
            />
        ))
    )
    .add(
        'Chip (green)',
        withState({ checked: false })(({ store }) => (
            <Chip
                {...props}
                checked={store.state.checked}
                onChange={() => store.set({ checked: !store.state.checked })}
                label="Mexican"
                color="#B5FED9"
                textColor="white"
            />
        ))
    );
