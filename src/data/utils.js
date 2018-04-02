import { graphql } from 'react-apollo';

import { compose, branch, withPropsOnChange, renderComponent } from 'recompose';

// import {
//     // GET_USER_AUTH,
//     // GET_USER_PROFILE,
//     GET_RESTAURANT,
//     GET_RESTAURANTS
// } from './queries';
// import { UPDATE_RESTAURANT_LIKES } from './mutations';

export const loadWaitingForData = (query, loader) =>
    branch(
        props => !props[query] || (props[query] && props[query].loading),
        renderComponent(loader)
    );

export const loadWaitingForProp = (propKey, loader) =>
    branch(props => !props.propKey, renderComponent(loader));
