import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from './ducks';
import middlewares from './middlewares';

const configureStore = initialState =>
    createStore(combineReducers(reducers), applyMiddleware(...middlewares));

export default configureStore;
