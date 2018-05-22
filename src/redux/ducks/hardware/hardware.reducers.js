import { handleActions } from 'redux-actions';
import { SET_HARDWARE } from './hardware.types';

const initial = {
    isOnline: true,
    networkEffectiveType: null
};

export default handleActions(
    {
        [SET_HARDWARE]: (state, { payload, ...action }) => ({
            ...state,
            ...payload
        })
    },
    initial
);
