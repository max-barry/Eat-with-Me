import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from '../../components/Inputs';

export const FACET_IS_BAR = 'is_bar';

class Bar extends Component {
    state = { refined: this.props.items };

    componentDidMount = () =>
        this.props.onMount ? this.props.onMount(this) : null;

    clear = () => this.setState({ refined: true });

    onChange = () => {
        this.setState({
            refined: !this.state.refined
        });
    };

    render = () => (
        <Toggle
            name="isBar"
            title="Exclude bars &amp; pubs"
            tag="Bars are excluded by default"
            checked={this.state.refined}
            onChange={this.onChange}
        />
    );
}

Bar.defaultProps = {};

Bar.propTypes = {
    items: PropTypes.bool.isRequired,
    onMount: PropTypes.func
};

export default Bar;
