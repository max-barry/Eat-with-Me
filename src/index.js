import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import ApolloClientStore from './data/index';
import Authentication from './containers/Authentication';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.styles';

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
