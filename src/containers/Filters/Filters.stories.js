import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hits } from 'react-instantsearch/dom';
import faker from 'faker';
import { compose, setDisplayName } from 'recompose';
import { withState } from '@dump247/storybook-state';
import centered from '@storybook/addon-centered';
import { Provider } from '../../stories/decorators';
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
    .addDecorator(story => <Provider story={story()} />)
    .add('default', () => {
        const Enhanced = compose(
            setDisplayName('Filters'),
            withSearch,
            withParent
        )(() => <Filters />);
        return <Enhanced />;
    })
    .addDecorator(centered)
    .add(
        'Quarter',
        withState({ items: makeRefinements(8) })(({ store }) => (
            <QuarterList
                items={store.state.items}
                update={value => {
                    store.set({
                        items: store.state.items.map(refinemnet => {
                            if (refinemnet.label === value)
                                refinemnet.isRefined = !refinemnet.isRefined;
                            return refinemnet;
                        })
                    });
                }}
            />
        ))
    )
    .add(
        'Cusine',
        withState({ items: randomGroupedRefinements })(({ store }) => (
            <CuisineTabs
                items={store.state.items}
                // onChange={onChange}
                update={value => {
                    store.set({
                        items: store.state.items.map(panel => {
                            panel.items = panel.items.map(cuisine => {
                                if (cuisine.label === value)
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
            update={onChange}
            items={[-1, 1, 2, 3, 4].map(v => ({
                label: v.toString(),
                value: v,
                isRefined: faker.random.boolean()
            }))}
        />
    ))
    .add('Extras.Bars', () => (
        <FacetBars refinement={[false]} update={onChange} />
    ))
    .add('Card List', () => <AddedList />);
