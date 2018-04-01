import { withApollo } from 'react-apollo';
import { lifecycle, compose, pure } from 'recompose';

import { auth } from '../../settings/firebase';
import { gqlGetUser } from '../../data/composers';

const updateOnAuth = lifecycle({
    componentDidMount() {
        auth.onAuthStateChanged((authObject = {}) => {
            const { displayName, uid } = authObject;
            this.props.client.writeData({
                data: {
                    getUserAuth: {
                        __typename: 'getUserAuth',
                        displayName,
                        uid
                    }
                }
            });
        });
    }
});

const enhance = compose(withApollo, gqlGetUser, updateOnAuth, pure);

const Authentication = props => props.children;

export default enhance(Authentication);
