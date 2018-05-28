import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import Checkbox from './Checkbox';
import Toggle, { ToggleWithLabel } from './Toggle';
import Chip from './Chip';
import ChipLite from './ChipLite';
import RangeCheckbox from './RangeCheckbox';
import ChipDismissible from './ChipDismissible';
import Badge from './Badge';
import { colors } from '../../settings/styles';

storiesOf('Forms', module)
    .add(
        'Checkbox',
        withState({ checked: false })(({ store }) => (
            <Checkbox
                title={() => 'Title for component'}
                tag={() => 'Tag underneath the title'}
                name="somename"
                checked={store.state.checked}
                onChange={() => store.set({ checked: !store.state.checked })}
            />
        ))
    )
    .add(
        'Toggle',
        withState({ checked: false })(({ store }) => (
            <Toggle
                name="somename"
                checked={store.state.checked}
                onChange={() => store.set({ checked: !store.state.checked })}
            />
        ))
    )
    .add(
        'Toggle with label',
        withState({ checked: false })(({ store }) => (
            <ToggleWithLabel
                title={() => 'Title for component'}
                tag={() => 'Tag underneath the title'}
                name="somename"
                checked={store.state.checked}
                onChange={() => store.set({ checked: !store.state.checked })}
            />
        ))
    )
    .add(
        'Chip',
        withState({ checked: false })(({ store }) => (
            <Chip
                checked={store.state.checked}
                onChange={() => store.set({ checked: !store.state.checked })}
                name="mexican"
                label="Mexican"
            />
        ))
    )
    .add(
        'Chip (green)',
        withState({ checked: false })(({ store }) => (
            <Chip
                checked={store.state.checked}
                onChange={() => store.set({ checked: !store.state.checked })}
                name="mexican"
                label="Mexican"
                color="#B5FED9"
                textColor="white"
            />
        ))
    )
    .add(
        'ChipLite',
        withState({ checked: false })(({ store }) => (
            <ChipLite
                label="Mexican"
                name="mexican"
                checked={store.state.checked}
                onChange={() => {
                    store.set({ checked: !store.state.checked });
                }}
            />
        ))
    )
    .add('ChipDismissible', () => (
        <ChipDismissible
            actionLabel={faker.lorem.words(5)}
            action={() => console.log('Action')}
            dismiss={() => console.log('Dismissed')}
        />
    ))
    .add('ChipDismissible (with label + color)', () => (
        <ChipDismissible
            label={faker.lorem.words(2)}
            actionLabel={faker.lorem.words(5)}
            action={() => console.log('Action')}
            dismiss={() => console.log('Dismissed')}
            backgroundColor={colors.primaryLight}
            color={colors.black}
        />
    ))
    .add('Badge', () => <Badge count={faker.random.number(12)} />)
    .add(
        'RangeCheckbox',
        withState({
            items: [
                { label: () => <span>Dog</span>, checked: true, id: 1 },
                { label: faker.lorem.word(), checked: true, id: 2 },
                { label: faker.lorem.word(), checked: false, id: 3 },
                { label: () => <span>Cat</span>, checked: false, id: 4 }
            ]
        })(({ store }) => {
            const items = store.state.items;
            const update = id => {
                const newItems = items.map(item => {
                    if (item.id === id) item.checked = !item.checked;
                    return item;
                });
                store.set({ items: newItems });
            };
            return <RangeCheckbox items={items} onChange={update} />;
        })
    );
