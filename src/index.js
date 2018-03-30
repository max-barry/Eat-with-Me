import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';

import './index.styles';
import ApolloClientStore from './graphql/index';
import Feed from './containers/Feed';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <ApolloProvider client={ApolloClientStore}>
        <Feed />
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();
