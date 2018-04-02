import { withApollo } from 'react-apollo';
import { lifecycle, compose, pure } from 'recompose';
import * as firebase from 'firebase/app';

// import { auth } from '../../settings/fb';
import { gqlGetUser } from '../../data/composers';

const updateOnAuth = lifecycle({
    componentDidMount() {
        firebase.auth().onAuthStateChanged(authObject => {
            authObject = authObject || { uid: null };
            const { uid } = authObject;
            this.props.client.writeData({
                data: {
                    getUserAuth: {
                        __typename: 'getUserAuth',
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
