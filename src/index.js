import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import ApolloClientStore from './data/index';
import Authentication from './containers/Authentication';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.styles';

// import * as firebaseui from 'firebaseui';

// Configure Firebase.
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDwMcRpOphCy_LbaCIqUxUQ7ab7bjDE8QA',
    authDomain: 'eat-with-me-alpha.firebaseapp.com'
};

// Initialize
firebase.initializeApp(FIREBASE_CONFIG);

// export const auth = firebase.auth();

// export default firebase;

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={ApolloClientStore}>
            <Authentication>
                <App />
            </Authentication>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
