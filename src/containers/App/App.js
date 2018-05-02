import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loadable from 'react-loadable';
import { compose, withPropsOnChange } from 'recompose';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FIREBASE_CONFIG } from '../../settings/apis';
import urls from '../../settings/urls';
import { withAuthenticationProvider } from '../../hocs/Authentication';

// Initialize Firebase but check an app doesn't exist
if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const Register = Loadable({
    loader: _ => import('../Register'),
    loading: () => <p>'Loading'</p>
});

// const AsyncFeed = AsyncWrapper(_ => import('../Feed'));
// const AsyncRestaurantDetail = AsyncWrapper(_ => import('../RestaurantDetail'));
// const AsyncRegister = AsyncWrapper(_ => import('../Register'));
// const AsyncCollections = AsyncWrapper(_ => import('../Profile/Collections'));

class App extends Component {
    state = { previousLocation: this.props.location };
    modalUrls = [urls.REGISTER.pathname];

    componentDidUpdate({ location }, prevState, snapshot) {
        if (
            this.props.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        )
            this.setState({ previousLocation: location });
    }

    render() {
        return (
            <div>
                <Link to={urls.REGISTER}>Register</Link>
                {/* <Header /> */}
                <Switch
                    location={
                        this.props.isModal
                            ? this.state.previousLocation
                            : this.props.location
                    }
                >
                    <Route
                        exact
                        path={urls.HOME.pathname}
                        component={() => <p>Home</p>}
                    />
                    {/*<Route
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
                {(this.props.isModal ||
                    this.modalUrls.includes(this.props.location.pathname)) && (
                    <Route
                        path={urls.REGISTER.pathname}
                        component={() => <Register />}
                    />
                )}
            </div>
        );
    }
}

const modalPropsHandler = withPropsOnChange(['location'], ownerProps => ({
    isModal:
        ownerProps.location.state &&
        ownerProps.location.state.modal &&
        this.previousLocation !== ownerProps.location
}));

const enhance = compose(
    withRouter,
    withAuthenticationProvider,
    modalPropsHandler
);

export default enhance(App);
