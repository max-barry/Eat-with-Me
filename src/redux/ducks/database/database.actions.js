import { createAction } from 'redux-actions';
import * as types from './database.types';

// export const fetchCuisines = () => ({
//     type: types.FETCH_CUISINES,
//     // payload: new Promise((resolve, reject) => resolve())
//     payload: { dog: 1 }
// });

const a = () => {
    console.log('action doing');
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log('timeouty');
            resolve('foo');
        }, 500);
    });
};

export const fetchCuisines = createAction(types.FETCH_CUISINES, a);
// export const fetchCuisines = createAction(types.FETCH_CUISINES);
