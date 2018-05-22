import { handleActions } from 'redux-actions';
import { FETCH_CUISINES } from './cuisine.types';

const initial = {
    result: null,
    isPreload: true,
    isLoading: false,
    isError: false
};

export default handleActions(
    {
        [`${FETCH_CUISINES}_PENDING`]: (state, { payload, ...action }) => ({
            ...state,
            isPreload: false,
            isLoading: true
        }),
        [`${FETCH_CUISINES}_REJECTED`]: (state, { payload, ...action }) => ({
            ...state,
            isLoading: false,
            isError: true
        }),
        [`${FETCH_CUISINES}_FULFILLED`]: (state, { payload, ...action }) => ({
            ...state,
            result: payload,
            isLoading: false
        })
    },
    initial
);
