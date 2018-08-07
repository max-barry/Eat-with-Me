import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { withState } from '@dump247/storybook-state';
import faker from 'faker';
import { sample } from 'lodash';
import { omit, keys, filter } from 'ramda';
import { arrOf } from '../../shared';
import Drawer from './Drawer';
import Card from './Card';
import MiniCard from './MiniCard';
import AnimatedList from './AnimatedList';
import success from '../../../public/images/icons/success.svg';
import trash from '../../../public/images/icons/trash.svg';
import { dimensions, colors } from '../../settings';
import Simple from '../Buttons/Simple';

const ph = () => faker.company.catchPhrase();
const onClick = () => console.log('Clicked');

const cardProps = editable => ({
    title: editable ? text('Title', ph()) : ph(),
    strap: editable ? text('Strap', ph()) : ph(),
    tag: editable
        ? text('Tag', `${rndNum()}.${rndNum()}`)
        : `${rndNum()}.${rndNum()}`,
    deck: editable ? text('Deck', ph()) : ph(),
    img: 'https://source.unsplash.com/random/400x300',
    action: [
        <Simple key={1} color={colors.valid} onClick={onClick}>
            Click me
        </Simple>,
        <Simple key={2} onClick={onClick}>
            Also me
        </Simple>
    ]
});

const makeCard = () => <Card {...cardProps()} />;

const drawerItems = arrOf(
    _ => ({
        label: faker.random.word(),
        icon: faker.random.arrayElement([success, trash]),
        onClick: () => console.log('Open')
    }),
    3
);

const rndNum = _ => faker.random.number({ min: 1, max: 100 }).toString();

class AnimatedItems {
    constructor() {
        this.id = 0;
        this.rendered = {};
        this.items = [this.makeItem(), this.makeItem()];

        this.removeItem = this.removeItem.bind(this);
        this.makeItem = this.makeItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    getItems() {
        return filter(item => this.rendered[item.key], this.items);
    }

    makeItem() {
        this.id++;
        this.rendered[this.id] = true;
        return {
            component: <MiniCard {...cardProps(false)} />,
            key: this.id
        };
    }

    addItem() {
        this.items = [...this.items, this.makeItem()];
    }

    removeItem(n) {
        const toLeave = n || sample(keys(filter(n => n, this.rendered)));
        this.items = this.items.filter(item => item.key !== toLeave);
        this.rendered[toLeave] = false;
    }
}

const ItemsClass = new AnimatedItems();

storiesOf('Display', module)
    .add('Display.Drawer', _ => (
        <Drawer isOpen={boolean('Open', false)} items={drawerItems}>
            {faker.lorem.paragraphs(4)}
        </Drawer>
    ))

    .add(
        'Display.AnimatedList',
        withState({ tick: 0 })(({ store }) => {
            const numberOfItems = number('Extra items', 2, { min: 0, max: 10 });

            if (numberOfItems > ItemsClass.previous) ItemsClass.addItem();
            if (numberOfItems < ItemsClass.previous) ItemsClass.removeItem();

            ItemsClass.previous = numberOfItems;

            return (
                <div style={{ maxWidth: dimensions.card }}>
                    <AnimatedList
                        items={ItemsClass.getItems()}
                        onExit={key => {
                            ItemsClass.removeItem(key);
                            store.set({ tick: store.state.tick + 1 });
                        }}
                    />
                </div>
            );
        })
    )
    .addDecorator(centered)
    .add('Display.Card', makeCard)
    .add('Display.MiniCard', () => (
        <MiniCard {...omit(['img'], cardProps())} />
    ));
