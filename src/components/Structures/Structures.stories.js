import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import centered from '@storybook/addon-centered';
import faker from 'faker';
import { css } from 'emotion';
import { assocPath, map } from 'ramda';
import Card from './Card';
import MediaElement from './MediaElement';
import Drawer from './Drawer';
import archiveSvg from '../SVGs/images/flaticons/archive.svg';
import {
    ButtonSimple,
    ButtonAddToCollection,
    ButtonSimpleIcon
} from '../Buttons';
import { bs, colors } from '../../settings/styles';
import { randomRestaurant } from '../../stories/shared';
import ExpandingThirds from './ExpandingThirds';
import { InfiniteList } from '../Performance';

let rowsLoaded = 0;
const ITEMS_PER_ROW = 30;

const makeItems = () =>
    Array(ITEMS_PER_ROW)
        .fill()
        .map((_, i) => ({
            component: Card,
            props: {
                ...randomRestaurant(),
                // isLoading: true,
                title: (rowsLoaded * ITEMS_PER_ROW + i).toString()
            }
        }));

const action = _ => console.log('Clicked');

storiesOf('Structures', module)
    .add(
        'Drawer',
        withState({ isOpen: false })(({ store }) => (
            <div>
                <ButtonSimple onClick={() => store.set({ isOpen: true })}>
                    Open
                </ButtonSimple>
                <Drawer
                    isOpen={store.state.isOpen}
                    overlayClass={css({ backgroundColor: colors.grey1 })}
                    contentClass={css({ backgroundColor: colors.grey2 })}
                >
                    <div style={{ padding: bs() }}>
                        <ButtonSimple
                            onClick={() => store.set({ isOpen: false })}
                        >
                            Close
                        </ButtonSimple>
                    </div>
                </Drawer>
            </div>
        ))
    )
    .add(
        'ExpandingThirds',
        withState({ isExpanded: false, items: makeItems() })(({ store }) => (
            <Fragment>
                <ExpandingThirds
                    sticky={true}
                    secondary={<div>Secondary</div>}
                    columns={store.state.isExpanded ? 1 : 2}
                    onClick={() =>
                        store.set({ isExpanded: !store.state.isExpanded })
                    }
                    primary={
                        <InfiniteList
                            items={store.state.items}
                            hasMore={store.state.items.length < 200}
                            loadMore={({ startIndex, stopIndex }) => {
                                rowsLoaded++;
                                store.set({
                                    items: [
                                        ...store.state.items,
                                        ...makeItems()
                                    ]
                                });
                            }}
                            onClick={() =>
                                store.set({
                                    isExpanded: !store.state.isExpanded
                                })
                            }
                        />
                    }
                />
            </Fragment>
        ))
    )

    .addDecorator(centered)
    .add('Card', () => (
        <Card
            {...randomRestaurant()}
            action={
                <ButtonSimpleIcon icon={archiveSvg} onClick={action}>
                    Action
                </ButtonSimpleIcon>
            }
        />
    ))
    .add(
        'Card (Loading)',
        withState({ isLoading: true })(({ store }) => (
            <Card
                {...randomRestaurant()}
                onClick={() => store.set({ isLoading: !store.state.isLoading })}
                isLoading={store.state.isLoading}
                action={
                    <ButtonSimpleIcon icon={archiveSvg} onClick={action}>
                        Action
                    </ButtonSimpleIcon>
                }
            />
        ))
    )
    .add(
        'Card (Restaurant)',
        withState({ added: false })(({ store }) => (
            <Card
                title="Dishoom (Shoreditch)"
                deck="Collected by 20 people"
                src="https://cdn.londonandpartners.com/asset/dishoom-kings-cross-e68f09d6444bb3c20d8e48ccfeb3c386.jpg"
                badge="92.83"
                strap={['Indian', 'Shoreditch', '3.4mil'].join(' • ')}
                action={
                    <ButtonAddToCollection
                        added={store.state.added}
                        onClick={() => store.set({ added: !store.state.added })}
                    />
                }
            />
        ))
    )
    .add('MediaElement', () => (
        <MediaElement
            title={faker.company.catchPhrase()}
            src="https://source.unsplash.com/featured/300x200/"
            smallFont={false}
            strap={[
                faker.lorem.word(),
                faker.lorem.word(),
                faker.lorem.word()
            ].join(' • ')}
        />
    ));
