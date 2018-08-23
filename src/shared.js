import { curry, pathOr, ap, __, not, isEmpty, compose } from 'ramda';

export const CHAR_SPACE = [32, 13];
export const empty = (n = 10) => Array(n).fill();
export const arrOf = (fn, n) => empty(n).map(fn);
export const paths = curry((ps, obj) => ap([pathOr(null, __, obj)], ps));
export const notEmpty = compose(
    not,
    isEmpty
);
