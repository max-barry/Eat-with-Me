import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import registerServiceWorker from './registerServiceWorker';
import ApolloClientStore from './graphql';
import './index.styles';

const App = Loadable({
    loader: _ => import('./containers/App'),
    loading: () => <p>App is loading</p>
});

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
