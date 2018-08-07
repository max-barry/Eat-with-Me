import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Checkbox } from '../../components/Inputs';
import { bs, dimensions, mq } from '../../settings';
import { setInitialChecked, clearChecked } from './Filters.shared';

export const FACET_QUARTER = 'quarter.name';

const List = styled('ul')(
    mq({
        display: 'grid',
        gridTemplateColumns: ['1fr 1fr', '100%'],
        gridGap: `${bs(0.75)} ${bs(0.5)}`,
        width: [dimensions.input * 2, 'auto']
    })
);

// TODO : Moize

class Quarter extends Component {
    state = setInitialChecked(this.props.items);

    componentDidMount = () =>
        this.props.onMount ? this.props.onMount(this) : null;

    clear = () => this.setState(clearChecked(this.props.items));

    onChange = label => () =>
        this.setState({
            [label]: !this.state[label]
        });

    render = () => (
        <List>
            {this.props.items.map(({ label, count, ...quarter }, key) => (
                <li key={`quarter_${key}`}>
                    <Checkbox
                        name={`quarter_checkbox_${key}`}
                        checked={this.state[label]}
                        title={label}
                        badge={count}
                        tag="Leicester Square · Covent Garden · Lots more words"
                        onChange={this.onChange(label)}
                    />
                </li>
            ))}
        </List>
    );
}

Quarter.defaultProps = {};

Quarter.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            isRefined: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

// TODO : Prop types
export default Quarter;
