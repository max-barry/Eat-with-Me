import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import ApolloClientStore from './graphql';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { FIREBASE_CONFIG } from './settings/apis';
import './index.styles';

// Initialize Firebase but check an app doesn't exist
if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

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
