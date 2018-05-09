import React, { Component } from 'react';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { orderBy } from 'lodash';
import { setPropTypes, onlyUpdateForKeys, compose } from 'recompose';
import PropTypes from 'prop-types';
import { Checkbox } from '../../../../components/Forms';
import {
    CuisineList,
    CuisineListItem,
    CuisineContainer
    // QuarterContainer
} from './Cuisine.styles';
import { Actions } from '../shared';
import { FACET_CUISINE } from '../../Filters.constants';

const List = ({ currentRefinement, refine, items, onChange, ...props }) => (
    <CuisineList>
        {orderBy(items, ['count', 'label'], ['desc', 'asc']).map(
            (cuisine, key) => (
                <CuisineListItem key={key}>
                    <Checkbox
                        name={`cuisine_checkbox_${key}`}
                        checked={cuisine.isRefined}
                        title={() => cuisine.label}
                        onChange={() => onChange(refine, cuisine.value)}
                    />
                </CuisineListItem>
            )
        )}
    </CuisineList>
);

const EnhancedCuisineList = connectRefinementList(List);

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
            <CuisineContainer>
                <EnhancedCuisineList
                    attribute={FACET_CUISINE}
                    defaultRefinemnet={this.props.defaultRefinemnet}
                    searchable={true}
                    limit={5}
                    onChange={(...args) => this.update(args)}
                    {...this.props}
                />
                <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                />
            </CuisineContainer>
        );
    }
}

const enhance = compose(
    setPropTypes({
        defaultRefinement: PropTypes.array.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        updateVirtuals: PropTypes.func.isRequired
    })
);

export default enhance(Cuisine);
