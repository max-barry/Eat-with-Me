import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { renderComponent, compose, branch } from 'recompose';
import urls from '../../settings/urls';
import { withAuthenticationConsumer } from '../../hocs/Authentication';
import withModal from '../../hocs/Modal';

const RedirectRegister = props => (
    <Redirect
        to={{
            pathname: urls.REGISTER.pathname,
            state: {
                modalClose: urls.HOME.pathname,
                next: props.location.pathname
            }
        }}
    />
);

// {
//     pathname: urls.REGISTER.pathname,
//     state: {
//         next: props.location
//     }
// }

class NewCollection extends Component {
    render() {
        const { auth, ...rest } = this.props;
        return auth.loaded && auth.user ? (
            <div>New collection</div>
        ) : (
            <RedirectRegister {...rest} />
        );
    }
}

const enhance = compose(
    withAuthenticationConsumer,
    branch(
        ({ auth }) => auth.loaded && !auth.user,
        renderComponent(RedirectRegister)
    )
);

export default enhance(NewCollection);
