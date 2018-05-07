import React, { Component } from 'react';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { orderBy } from 'lodash';
import { setPropTypes, onlyUpdateForKeys } from 'recompose';
import PropTypes from 'prop-types';
import { Checkbox } from '../../../../components/Forms';
import {
    QuarterTag,
    QuarterList,
    QuarterListItem,
    QuarterContainer
} from './Quarter.styles';
import FilterSharedActions from '../FilterSharedActions';
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

const List = ({ currentRefinement, refine, items, ...props }) => (
    <div>
        <QuarterList>
            {orderBy(items, ['count', 'label'], ['desc', 'asc']).map(
                (quarter, key) => (
                    <QuarterListItem key={key}>
                        <Checkbox
                            name={`quarter_checkbox_${key}`}
                            initial={quarter.isRefined}
                            title={Name(quarter)}
                            tag={Tag}
                            onChange={() => refine(quarter.value)}
                        />
                    </QuarterListItem>
                )
            )}
        </QuarterList>
        <FilterSharedActions
            applyAction={() =>
                props.updateVirtuals(FACET_QUARTER, currentRefinement)
            }
            cancelAction={props.onRequestClose}
        />
    </div>
);

const EnhancedQuarterList = connectRefinementList(List);

class Quarter extends Component {
    render() {
        // const { refine, items } = this.props;
        // const sortedItems = ;
        return (
            <QuarterContainer>
                <EnhancedQuarterList
                    attribute={FACET_QUARTER}
                    defaultRefinemnet={this.props.defaultRefinemnet}
                    {...this.props}
                />
            </QuarterContainer>
        );
    }
}

const enhance = setPropTypes({
    defaultRefinement: PropTypes.array.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    updateVirtuals: PropTypes.func.isRequired
});

export default enhance(Quarter);
