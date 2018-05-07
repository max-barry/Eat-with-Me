import React, { Component } from 'react';
import { FACET_CUISINE } from '../../Filters.constants';

class Cuisine extends Component {
    state = { refinement: this.props.defaultRefinement };

    save = force =>
        this.props.updateVirtuals(FACET_CUISINE, this.state.refinement, !force);

    componentDidMount() {
        this.props.onMount(this);
    }

    render() {
        return <div>Cuisinneey</div>;
    }
}

export default Cuisine;
