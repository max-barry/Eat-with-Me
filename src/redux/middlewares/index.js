import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import createLogger from './logger';

export default [promiseMiddleware(), thunk, createLogger()];
// export default [logger];
