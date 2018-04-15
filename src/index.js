import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import ApolloClientStore from './data/index';
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

// TODO : Authentication has been moved from index > app
//        as a temporary bugfix for https://github.com/ReactTraining/react-router/issues/6072
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={ApolloClientStore}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
