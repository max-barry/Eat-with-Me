import React, { Component } from 'react';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { orderBy } from 'lodash';
import { setPropTypes, onlyUpdateForKeys, compose } from 'recompose';
import PropTypes from 'prop-types';
import { Checkbox } from '../../../../components/Forms';
import {
    QuarterTag,
    QuarterList,
    QuarterListItem,
    QuarterContainer
} from './Quarter.styles';
import { Actions, EnhanceFilter } from '../shared';
import { initial_refinements, FACET_QUARTER } from '../../Filters.constants';

const unchangeable = onlyUpdateForKeys([]);

const Name = ({ count, label }) =>
    unchangeable(() => (
        <span>
            {`${label} `}
            <em>{count}</em>
        </span>
    ));

const Tag = unchangeable(() => (
    <QuarterTag>
        'Leicester Square · Covent Garden · Lots more words'
    </QuarterTag>
));

const List = ({ currentRefinement, refine, items, onChange, ...props }) => (
    <QuarterList>
        {orderBy(items, ['count', 'label'], ['desc', 'asc']).map(
            (quarter, key) => (
                <QuarterListItem key={key}>
                    <Checkbox
                        name={`quarter_checkbox_${key}`}
                        checked={quarter.isRefined}
                        title={Name(quarter)}
                        tag={Tag}
                        onChange={() => onChange(refine, quarter.value)}
                    />
                </QuarterListItem>
            )
        )}
    </QuarterList>
);

const EnhancedQuarterList = connectRefinementList(List);

class Quarter extends Component {
    state = { refinement: this.props.defaultRefinement };

    save = force =>
        this.props.updateVirtuals(FACET_QUARTER, this.state.refinement, !force);

    componentDidMount() {
        this.props.onMount(this);
    }

    update([refine, value]) {
        refine(value);
        this.setState({ refinement: value });
    }

    render() {
        return (
            <QuarterContainer>
                <EnhancedQuarterList
                    attribute={FACET_QUARTER}
                    defaultRefinemnet={this.props.defaultRefinemnet}
                    onChange={(...args) => this.update(args)}
                    {...this.props}
                />
                <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                />
            </QuarterContainer>
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

export default enhance(Quarter);
