import { handleActions } from 'redux-actions';
import * as actions from './database.actions';

const initial = {
    cuisines: []
};

console.log(actions.fetchCuisines);

export default handleActions(
    {
        'app/database/FETCH_CUISINES_FULFILLED': (
            state,
            { payload, ...action }
        ) => {
            console.log('lol');
            console.log(state);
            return { ...state };
        }
    },
    initial
);

// import { createActions, handleActions, combineActions } from 'redux-actions';

// const defaultState = { counter: 10 };

// export const { increment, decrement } = createActions({
//     INCREMENT: (amount = 1) => ({ amount }),
//     DECREMENT: (amount = 1) => ({ amount: -amount })
// });

// const reducer = handleActions(
//     {
//         [combineActions(increment, decrement)](state, { payload: { amount } }) {
//             return { ...state, counter: state.counter + amount };
//         }
//     },
//     defaultState
// );

// export default reducer;

// import typeToReducer from 'type-to-reducer';
// import { FETCH_CUISINES } from './database.types';

// const initial = {
//     data: null,
//     isPending: false,
//     error: false
// };

// export default typeToReducer(
//     {
//         [FETCH_CUISINES]: {
//             PENDING: () => {
//                 console.log('fulfilled');
//                 return {
//                     ...initial,
//                     isPending: true
//                 };
//             },
//             REJECTED: (state, action) => {
//                 console.log('rejected');
//                 return {
//                     ...initial,
//                     error: action.payload
//                 };
//             },

//             FULFILLED: (state, action) => {
//                 console.log('fulfilled');
//                 return {
//                     ...initial,
//                     data: action.payload
//                 };
//             }
//         }
//     },
//     initial
// );
