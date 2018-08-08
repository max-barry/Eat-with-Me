import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from './ducks';
import middlewares from './middlewares';

const configureStore = (initialState = {}) =>
    createStore(
        combineReducers(reducers),
        // initialState,
        applyMiddleware(...middlewares)
    );

export default configureStore;
