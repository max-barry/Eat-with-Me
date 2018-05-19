import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hits } from 'react-instantsearch/dom';
import faker from 'faker';
import { shuffle } from 'lodash';
import { compose, setDisplayName } from 'recompose';
import { withState } from '@dump247/storybook-state';
import Filters from './Filters.containers';
import { QuarterList } from './Facets/Quarter/Quarter.components';
import { CuisineTabs } from './Facets/Cuisine/Cuisine.components';
import { PriceOptions } from './Facets/Price/Price.components';
import { FacetBars } from './Facets/Extra/Extra.components';
import withSearch from '../../hocs/Search/Search';
import AddedList from './Added';

const onChange = () => console.log('Change');

const makeRefinements = n =>
    Array(n)
        .fill()
        .map(_ => ({
            label: faker.address.city(),
            value: faker.address.city(),
            count: faker.random.number(500),
            isRefined: false
        }));

const randomGroupedRefinements = Array(3)
    .fill()
    .map(_ => ({
        name: faker.address.state(),
        items: makeRefinements(12)
    }));

const withParent = BaseComponent => props => (
    <div>
        <BaseComponent />
        <Hits
            hitComponent={({ hit }) =>
                `${hit.name} | ${hit.quarter ? hit.quarter.name : 'no quarter'}`
            }
        />
    </div>
);

storiesOf('Filters', module)
    .add('default', () => {
        const Enhanced = compose(
            setDisplayName('Filters'),
            withSearch,
            withParent
        )(() => <Filters />);
        return <Enhanced />;
    })
    .add('Quarter', () => (
        <QuarterList onChange={onChange} items={makeRefinements(8)} />
    ))
    .add(
        'Cusine',
        withState({ items: randomGroupedRefinements })(({ store }) => (
            <CuisineTabs
                items={store.state.items}
                // onChange={onChange}
                onChange={value => {
                    store.set({
                        items: store.state.items.map(panel => {
                            panel.items = panel.items.map(cuisine => {
                                if (cuisine.value === value)
                                    cuisine.isRefined = !cuisine.isRefined;
                                return cuisine;
                            });
                            return panel;
                        })
                    });
                }}
            />
        ))
    )
    .add('Price', () => (
        <PriceOptions
            onChange={onChange}
            items={[-1, 1, 2, 3, 4].map(v => ({
                label: v.toString(),
                value: v,
                isRefined: faker.random.boolean()
            }))}
        />
    ))
    .add('Extras.Bars', () => (
        <FacetBars currentRefinement={[false]} onChange={onChange} />
    ))
    .add('Card List', () => <AddedList />);
