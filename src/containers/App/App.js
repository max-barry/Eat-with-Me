import React, { Component } from 'react';

import { Route, Switch, Link } from 'react-router-dom';
// import { Transition, config } from 'react-spring';
import { withRouter } from 'react-router';
import { compose, lifecycle, withHandlers } from 'recompose';

import urls from '../../settings/urls';
import AsyncWrapper from '../../hocs/AsyncWrapper';
import { AuthenticationProvider } from '../../hocs/Authentication';

const AsyncFeed = AsyncWrapper(_ => import('../Feed'));
const AsyncRestaurantDetail = AsyncWrapper(_ => import('../RestaurantDetail'));
const AsyncRegister = AsyncWrapper(_ => import('../Register'));

class App extends Component {
    previousLocation = this.props.location;

    render() {
        const { location, isModal } = this.props;
        const showModal = isModal();
        return (
            <AuthenticationProvider>
                <div>
                    <Link to={urls.REGISTER}>Register</Link>
                    <Switch
                        location={showModal ? this.previousLocation : location}
                    >
                        <Route
                            exact
                            path={urls.HOME.pathname}
                            component={AsyncFeed}
                        />
                        <Route
                            path={urls.RESTAURANT_SLUG.pathname}
                            component={AsyncRestaurantDetail}
                        />
                    </Switch>
                    {showModal ||
                    location.pathname === urls.REGISTER.pathname ? (
                        <Route
                            path={urls.REGISTER.pathname}
                            component={AsyncRegister}
                        />
                    ) : null}
                </div>
            </AuthenticationProvider>
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
            this.previousLocation = location;
        }
    }
});

const extraHandlers = withHandlers({
    isModal: ({ location }) => _ =>
        !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        )
});

const enhance = compose(withRouter, extraHandlers, lifecycleHandlers);

export default enhance(App);
