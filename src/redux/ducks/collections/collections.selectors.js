import {
    path,
    pathOr,
    prop,
    filter,
    compose,
    join,
    invoker,
    propOr,
    head,
    identity
} from 'ramda';
import { createSelector } from 'reselect';
import { paths } from '../../../shared';

const selectors = {
    isLoaded: (state, id) => path(['collections', id], state)
};

export { selectors as collectionSelectors };
