import React, { Component } from 'react';

import { Route, Switch, Link } from 'react-router-dom';
// import { Transition, config } from 'react-spring';
import { withRouter } from 'react-router';
import { compose, lifecycle, withHandlers } from 'recompose';

import urls from '../../settings/urls';
import Feed from '../Feed';
import RestaurantDetail from '../RestaurantDetail';
import Register from '../Register';

class App extends Component {
    previousLocation = this.props.location;

    render() {
        const { location, checkIfModal } = this.props;
        const isModal = checkIfModal();
        return (
            <div>
                <Link to={urls.REGISTER}>Register</Link>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path={urls.HOME.pathname} component={Feed} />
                    <Route
                        path={urls.RESTAURANT_SLUG.pathname}
                        component={RestaurantDetail}
                    />
                    <Route path={urls.REGISTER.pathname} component={Register} />
                </Switch>
                {isModal ? (
                    <Route path={urls.REGISTER.pathname} component={Register} />
                ) : null}
            </div>
        );
    }
}

const lifecycleHandlers = lifecycle({
    componentWillUpdate(nextProps) {
        const { location } = this.props;
        if (
            nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
        }
    }
});

const extraHandlers = withHandlers({
    checkIfModal: props => _ => {
        const { location } = props;
        return !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        );
    }
});

const enhance = compose(withRouter, extraHandlers, lifecycleHandlers);

export default enhance(App);
