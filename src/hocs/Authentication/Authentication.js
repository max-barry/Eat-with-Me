import { withApollo } from 'react-apollo';
import { lifecycle, compose } from 'recompose';
import * as firebase from 'firebase/app';

const updateOnAuth = lifecycle({
    componentDidMount() {
        const { client } = this.props;
        firebase.auth().onAuthStateChanged(authObject => {
            client.writeData({
                data: {
                    FIREBASE_USER_UID: authObject.uid
                }
            });
        });
    }
});

const enhance = compose(withApollo, updateOnAuth);

const Authentication = props => props.children;

export default enhance(Authentication);
