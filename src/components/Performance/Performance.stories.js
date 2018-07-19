import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
// import { withState } from '@dump247/storybook-state';
import centered from '@storybook/addon-centered';
// import faker from 'faker';
// import { css } from 'emotion';
import { LoadingHeading, LoadingButton, LoadingImage } from './Loading';
import { bs, dimensions } from '../../settings/styles';
import InfiniteList from './InfiniteList';
import { Card } from '../Structures';
import { randomRestaurant } from '../../stories/shared';

let rowsLoaded = 0;
const ITEMS_PER_ROW = 30;

const makeItems = () =>
    Array(ITEMS_PER_ROW)
        .fill()
        .map((_, i) => ({
            component: Card,
            props: {
                ...randomRestaurant(),
                title: (rowsLoaded * ITEMS_PER_ROW + i).toString()
            }
        }));

storiesOf('Performance', module)
    .add(
        'InfiniteList',
        withState({ isExpanded: false, items: makeItems() })(({ store }) => (
            <InfiniteList
                items={store.state.items}
                hasMore={store.state.items.length < 200}
                loadMore={({ startIndex, stopIndex }) => {
                    // console.log(startIndex, stopIndex);
                    rowsLoaded++;
                    store.set({
                        items: [...store.state.items, ...makeItems()]
                    });
                }}
                onClick={() =>
                    store.set({
                        isExpanded: !store.state.isExpanded
                    })
                }
            />
        ))
    )
    .addDecorator(centered)
    .add('Loading Elements', () => (
        <ul style={{ width: 350 }}>
            <li>
                <LoadingImage margin={1} />
            </li>
            <li>
                <LoadingHeading margin={0.5} dominant={true} />
            </li>
            <li>
                <LoadingHeading margin={1} />
            </li>
            <li>
                <LoadingButton dominant={true} />
            </li>
        </ul>
    ));
