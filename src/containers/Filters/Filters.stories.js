import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Hits } from 'react-instantsearch/dom';
import { compose } from 'recompose';
import { connectSearchBox } from 'react-instantsearch/connectors';
import Filters from './Filters';
import Quarter from './Facets/Quarter/Quarter';
import Extra from './Facets/Extra/Extra';
import Cuisine from './Facets/Cuisine/Cuisine';
import withSearch from '../../hocs/Search/Search';
import {
    FACET_EXTRAS,
    initial_refinements,
    FACET_CUISINE,
    FACET_QUARTER
} from './filters.shared';

const hitComponent = ({ hit }) =>
    `${hit.name} | ${hit.quarter ? hit.quarter.name : 'no quarter'}`;

const withParent = BaseComponent => props => (
    <div>
        <BaseComponent />
        <Hits hitComponent={hitComponent} />
    </div>
);

const enhance = compose(withSearch, withParent);

storiesOf('Filters', module)
    .add('default', () => {
        const Enhanced = enhance(() => <Filters />);
        return <Enhanced />;
    })
    .add('Quarters', () => {
        const Enhanced = enhance(() => (
            <Quarter
                defaultRefinement={[]}
                onRequestClose={() => console.log('Exit modal')}
                updateVirtuals={() => console.log('Applied changes')}
            />
        ));
        return <Enhanced />;
    })
    .add('Cusine', () => {
        const Enhanced = enhance(() => (
            <Cuisine
                defaultRefinement={[]}
                onRequestClose={() => console.log('Exit modal')}
                updateVirtuals={() => console.log('Applied changes')}
            />
        ));
        return <Enhanced />;
    })
    .add('Extras', () => {
        const EnhancedVirtual = connectSearchBox(
            class VirtualSearch extends Component {
                constructor(props) {
                    super(props);
                    props.refine('chesh');
                }
                render() {
                    return null;
                }
            }
        );

        const Enhanced = enhance(() => (
            <div>
                <EnhancedVirtual />
                <Extra
                    defaultRefinement={initial_refinements[FACET_EXTRAS]}
                    onRequestClose={() => console.log('Exit modal')}
                    updateVirtuals={() => console.log('Applied changes')}
                />
            </div>
        ));
        return <Enhanced />;
    });
