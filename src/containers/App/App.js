import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loadable from 'react-loadable';
import { compose, lifecycle, withHandlers } from 'recompose';
import urls from '../../settings/urls';
// import AsyncWrapper from '../../hocs/AsyncWrapper';
// import Header from '../Header';
import { withAuthenticationProvider } from '../../hocs/Authentication';

import Register from '../Register';

// export const Register = Loadable({
//     loader: _ => import('../Register'),
//     loading: <p>'Loading'</p>
// });

// const AsyncFeed = AsyncWrapper(_ => import('../Feed'));
// const AsyncRestaurantDetail = AsyncWrapper(_ => import('../RestaurantDetail'));
// const AsyncRegister = AsyncWrapper(_ => import('../Register'));
// const AsyncCollections = AsyncWrapper(_ => import('../Profile/Collections'));

class App extends Component {
    previousLocation = this.props.location;

    render() {
        const { location, isModal } = this.props;
        const showModal = isModal();
        return (
            <div>
                <Link to={urls.REGISTER}>Register</Link>
                {/* <Header /> */}
                <Switch location={showModal ? this.previousLocation : location}>
                    {/* <Route
                        exact
                        path={urls.HOME.pathname}
                        component={AsyncFeed}
                    />
                    <Route
                        exact
                        path={urls.RESTAURANT_SLUG.pathname}
                        component={AsyncRestaurantDetail}
                    />
                    <Route
                        exact
                        path={urls.PROFILE.pathname}
                        component={() => <div>Profile page</div>}
                    />
                    <Route
                        path={urls.PROFILE_COLLECTIONS.pathname}
                        component={AsyncCollections}
                    /> */}
                    <Route component={() => <p>Not found</p>} />
                </Switch>
                {showModal || location.pathname === urls.REGISTER.pathname ? (
                    <Route
                        path={urls.REGISTER.pathname}
                        component={() => <Register />}
                    />
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

const enhance = compose(
    withRouter,
    extraHandlers,
    lifecycleHandlers,
    withAuthenticationProvider
);

export default enhance(App);
