import { https } from 'firebase-functions';

import setupGraphQLServer from './graphql/server';
import {
    onUsernameSetUpdateUser as _onUsernameSetUpdateUser,
    onUsernameSetUpdateCollections as _onUsernameSetUpdateCollections
} from './firebase/firestore/functions';
import {
    onUserCreated as _onUserCreated,
    onUserDeleted as _onUserDeleted
} from './firebase/fireauth/functions';
// import { initialAlgoliaSetup } from './algolia/functions';

const GraphQLServer = setupGraphQLServer();

export const api = https.onRequest(GraphQLServer);
export const onUserCreated = _onUserCreated;
export const onUserDeleted = _onUserDeleted;
export const onUsernameSetUpdateUser = _onUsernameSetUpdateUser;
export const onUsernameSetUpdateCollections = _onUsernameSetUpdateCollections;

// export const algoliaInitial = https.onRequest(initialAlgoliaSetup);

// service:max-barry-685:B5aSiMIYx8C-ZgbpGjEW2A
