import { withApollo } from 'react-apollo';
import { lifecycle, compose, pure } from 'recompose';

import { auth } from '../../settings/firebase';
import { gqlGetUserAuth } from '../../data/composers';

const updateOnAuth = lifecycle({
    componentDidMount() {
        auth.onAuthStateChanged((authObject = {}) => {
            const { displayName, uid } = authObject;
            this.props.client.writeData({
                data: {
                    userAuth: {
                        __typename: 'userAuth',
                        displayName,
                        uid
                    }
                }
            });
        });
    }
});

const enhance = compose(gqlGetUserAuth, updateOnAuth, pure);

const Authentication = props => props.children;

export default withApollo(enhance(Authentication));
