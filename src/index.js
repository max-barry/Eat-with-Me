import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ApolloClientStore from './data/index';
import Feed from './containers/Feed';
import registerServiceWorker from './registerServiceWorker';
import './index.styles';
import RestaurantDetail from './containers/RestaurantDetail';

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={ApolloClientStore}>
            <Switch>
                <Route exact path="/" component={Feed} />
                <Route path="/:slug" component={RestaurantDetail} />
            </Switch>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
