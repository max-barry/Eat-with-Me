import React, { Component } from 'react';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { orderBy } from 'lodash';
import { setPropTypes, onlyUpdateForKeys, compose } from 'recompose';
import PropTypes from 'prop-types';
import { Checkbox } from '../../../../components/Forms';
// import {} from './Cuisine.styles';
import { Actions } from '../shared';
import { FACET_CUISINE } from '../../Filters.constants';
import BigSearch from '../../../../components/BigSearch/BigSearch';
import Chip from '../../../../components/Forms/Chip';

const List = ({
    currentRefinement,
    refine,
    searchForItems,
    items,
    onChange,
    ...props
}) => (
    <BigSearch
        placeholder="Mexican, Indian, American..."
        onChange={(event, callback) => {
            searchForItems(event.target.value);
            callback();
        }}
        items={orderBy(items, ['count', 'label'], ['desc', 'asc']).map(
            (cuisine, i) => (
                <Chip
                    title={`${cuisine.label} (${cuisine.count})`}
                    onChange={() => onChange(refine, cuisine.value)}
                    name={`cuisine_${i}`}
                    checked={cuisine.isRefined}
                    key={i}
                />
            )
        )}
    />
);

const EnhancedCuisineList = compose(
    onlyUpdateForKeys(['currentRefinement', 'items']),
    connectRefinementList
)(List);

class Cuisine extends Component {
    state = { refinement: this.props.defaultRefinement };

    save = force =>
        this.props.updateVirtuals(FACET_CUISINE, this.state.refinement, !force);

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    update([refine, value]) {
        refine(value);
        this.setState({ refinement: value });
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <EnhancedCuisineList
                    attribute={FACET_CUISINE}
                    defaultRefinemnet={this.props.defaultRefinemnet}
                    // searchable={true}
                    limit={20}
                    onChange={(...args) => this.update(args)}
                    {...this.props}
                />
                {/* <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                /> */}
            </div>
        );
    }
}

const enhance = compose(
    setPropTypes({
        defaultRefinement: PropTypes.array.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        updateVirtuals: PropTypes.func.isRequired
    }),
    onlyUpdateForKeys(['defaultRefinement'])
);

export default enhance(Cuisine);
