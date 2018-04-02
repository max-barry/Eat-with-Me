import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import ApolloClientStore from './data/index';
import Authentication from './hocs/Authentication';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.styles';

// Configure Firebase.
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDwMcRpOphCy_LbaCIqUxUQ7ab7bjDE8QA',
    authDomain: 'eat-with-me-alpha.firebaseapp.com'
};

// Initialize
firebase.initializeApp(FIREBASE_CONFIG);

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
