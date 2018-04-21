import { https } from 'firebase-functions';

import setupGraphQLServer from './graphql/server';
import { onUsernameSet as _onUsernameSet } from './firebase/firestore/functions';
import {
    onUserCreated as _onUserCreated,
    onUserDeleted as _onUserDeleted
} from './firebase/fireauth/functions';

const GraphQLServer = setupGraphQLServer();

export const api = https.onRequest(GraphQLServer);
export const onUserCreated = _onUserCreated;
export const onUserDeleted = _onUserDeleted;
export const onUsernameSet = _onUsernameSet;

// service:max-barry-685:B5aSiMIYx8C-ZgbpGjEW2A
