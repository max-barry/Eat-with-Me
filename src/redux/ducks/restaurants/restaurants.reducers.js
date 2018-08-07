import { handleActions } from 'redux-actions';
import { FETCH_CUISINES } from './restaurants.types';

const initial = {
    cuisines: null,
    cuisinesIsPreload: true,
    cuisinesIsLoading: false,
    cuisinesIsError: false
};

export default handleActions(
    {
        [`${FETCH_CUISINES}_PENDING`]: (state, { payload, ...action }) => ({
            ...state,
            cuisinesIsPreload: false,
            cuisinesIsLoading: true
        }),
        [`${FETCH_CUISINES}_REJECTED`]: (state, { payload, ...action }) => ({
            ...state,
            cuisinesIsLoading: false,
            cuisinesIsError: true
        }),
        [`${FETCH_CUISINES}_FULFILLED`]: (state, { payload, ...action }) => ({
            ...state,
            cuisines: payload,
            cuisinesIsLoading: false
        })
    },
    initial
);
