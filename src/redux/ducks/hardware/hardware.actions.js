import { createAction } from 'redux-actions';
import * as types from './hardware.types';

export const setNetworkStatus = createAction(types.SET_HARDWARE, event => ({
    isOnline: event.type === 'online',
    networkEffectiveType: window.navigator.connection.effectiveType
}));
