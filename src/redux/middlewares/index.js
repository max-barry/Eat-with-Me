import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import createLogger from './logger';

export default [promiseMiddleware(), thunk, createLogger()];
