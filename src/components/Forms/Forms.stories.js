import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import Checkbox from './Checkbox';
import Toggle, { ToggleWithLabel } from './Toggle';
import Chip from './Chip';
import ChipLite from './ChipLite';
import { colors } from '../../settings/styles';
import RangeCheckbox from './RangeCheckbox';

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
    )
    .add(
        'ChipLite',
        withState({ checked: false })(({ store }) => {
            delete props.title;
            delete props.tag;
            return (
                <ChipLite
                    {...props}
                    checked={store.state.checked}
                    label="Mexican"
                    onChange={() => {
                        console.log('clicked');
                        store.set({ checked: !store.state.checked });
                    }}
                />
            );
        })
    )
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
