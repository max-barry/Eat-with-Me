import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Hits } from 'react-instantsearch/dom';
import faker from 'faker';
import { compose } from 'recompose';
import { connectSearchBox } from 'react-instantsearch/connectors';
import Filters from './Filters.containers';
// import Quarter from './Facets/Quarter/Quarter.containers';
import { QuarterList } from './Facets/Quarter/Quarter.components';
import Extra from './Facets/Extra/Extra.containers';
import Cuisine from './Facets/Cuisine/Cuisine.containers';
import { FacetBars } from './Facets/Extra/Extra.components';
import withSearch from '../../hocs/Search/Search';
import {
    FACET_EXTRAS,
    initialRefinements
    // FACET_CUISINE,
    // FACET_QUARTER
} from './Filters.shared';

const onChange = () => console.log('Change');

const randomRefinements = Array(8)
    .fill()
    .map((_, i) => ({
        label: faker.address.city(),
        count: faker.random.number(500),
        isRefined: false
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
        const Enhanced = compose(withSearch, withParent)(() => <Filters />);
        return <Enhanced />;
    })
    .add('Quarters', () => (
        <QuarterList onChange={onChange} items={randomRefinements} />
    ))
    // .add('Cusine', () => {
    //     const Enhanced = enhance(() => (
    //         <Cuisine
    //             defaultRefinement={[]}
    //             onRequestClose={() => console.log('Exit modal')}
    //             updateVirtuals={() => console.log('Applied changes')}
    //         />
    //     ));
    //     return <Enhanced />;
    // })
    .add('Extras: Bars', () => {
        // const EnhancedVirtual = connectSearchBox(
        //     class VirtualSearch extends Component {
        //         constructor(props) {
        //             super(props);
        //             props.refine('chesh');
        //         }
        //         render() {
        //             return null;
        //         }
        //     }
        // );

        // const Enhanced = enhance(() => (
        //     <div>
        //         <EnhancedVirtual />
        //         <Extra
        //             defaultRefinement={initialRefinements[FACET_EXTRAS]}
        //             onRequestClose={() => console.log('Exit modal')}
        //             updateVirtuals={() => console.log('Applied changes')}
        //         />
        //     </div>
        // ));
        return <FacetBars currentRefinement={[false]} onChange={onChange} />;
    });
