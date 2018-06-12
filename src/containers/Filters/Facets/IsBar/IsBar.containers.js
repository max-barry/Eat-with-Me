import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToggleWithLabel } from '../../../../components/Forms';

const isTrue = ['true', 'false'];
const isFalse = ['false'];

class IsBar extends Component {
    state = {
        items: this.props.initial[0].value.length === 0 ? isFalse : isTrue
    };

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    get isChecked() {
        return this.state.items.length > 1;
    }

    get refined() {
        return this.isChecked ? isTrue : isFalse;
    }

    componentDidMount() {
        this.props.onMount(this);
    }

    update(result) {
        this.setState({
            items: result ? isTrue : isFalse
        });
    }

    render() {
        return (
            <ToggleWithLabel
                name="include-bars"
                onChange={this.update}
                checked={this.isChecked}
                title="Include bars and pubs"
                tag="We don't include bars and pubs in results by default"
            />
        );
    }
}

IsBar.propTypes = {
    initial: PropTypes.array.isRequired
};

export default IsBar;
