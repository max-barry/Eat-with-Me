// import { createStore } from 'redux';
// import * as reducers from './redux/ducks';
// import middlewares from './redux/middlewares';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';
import './index.styles';

const App = Loadable({
    loader: _ => import('./containers/App'),
    loading: () => <p>App is loading</p>
});

// TODO : Authentication has been moved from index > app
//        as a temporary bugfix for https://github.com/ReactTraining/react-router/issues/6072
// const store = configureStore(window.REDUX_INITIAL_DATA);

// const configureStore = initialState =>
//     ;

const store = configureStore();
// export default configureStore;

// if (process.env.NODE_ENV !== 'production') {
//     const { whyDidYouUpdate } = require('why-did-you-update');
//     whyDidYouUpdate(React, { exclude: [/^StoryState/] });
// }

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
