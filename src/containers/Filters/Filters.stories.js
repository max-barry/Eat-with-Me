import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Hits } from 'react-instantsearch/dom';
import { compose } from 'recompose';
import { connectSearchBox } from 'react-instantsearch/connectors';
import Filters from './Filters';
import Quarter from './FilterContent/Quarter/Quarter';
import Extra from './FilterContent/Extra/Extra';
import withSearch from '../../hocs/Search/Search';
import { FACET_EXTRAS, initial_refinements } from './Filters.constants';

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
                attribute="quarter.name"
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