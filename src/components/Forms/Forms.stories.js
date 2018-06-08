import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import centered from '@storybook/addon-centered';
import faker from 'faker';
import Checkbox from './Checkbox';
import Toggle, { ToggleWithLabel } from './Toggle';
import Chip from './Chip';
import ChipLite from './ChipLite';
import RangeCheckbox from './RangeCheckbox';
import ChipDismissible from './ChipDismissible';
import Badge from './Badge';
import { colors, sFlexed } from '../../settings/styles';

storiesOf('Forms', module)
    .addDecorator(centered)
    .add(
        'Checkbox',
        withState({
            checked: false,
            title: faker.lorem.words(3),
            tag: faker.lorem.words(12)
        })(({ store }) => (
            <Checkbox
                title={store.state.title}
                tag={store.state.tag}
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
        'Toggle (with label)',
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
        withState({ checked1: false, checked2: false })(({ store }) => (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 300
                }}
            >
                <Chip
                    checked={store.state.checked1}
                    name="mexican"
                    label="Mexican"
                    onChange={() =>
                        store.set({ checked1: !store.state.checked1 })
                    }
                />
                <Chip
                    checked={store.state.checked2}
                    name="american"
                    label="American"
                    color="#B5FED9"
                    onChange={() =>
                        store.set({ checked2: !store.state.checked2 })
                    }
                />
            </div>
        ))
    )
    .add(
        'Chip.Lite',
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
    .add('Chip.Dismissible', () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 400
            }}
        >
            <ChipDismissible
                actionLabel={faker.lorem.words(5)}
                action={() => console.log('Action')}
                dismiss={() => console.log('Dismissed')}
            />
            <ChipDismissible
                label={faker.lorem.words(2)}
                actionLabel={faker.lorem.words(5)}
                action={() => console.log('Action')}
                dismiss={() => console.log('Dismissed')}
                backgroundColor={colors.primaryLight}
                color={colors.black}
            />
        </div>
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
