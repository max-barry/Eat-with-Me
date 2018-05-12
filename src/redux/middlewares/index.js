import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';
import createLogger from './logger';

export default [promiseMiddleware(), thunkMiddleware, createLogger()];
// export default [logger];
