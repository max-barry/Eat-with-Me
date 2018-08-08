import { SERVER_ENDPOINT } from '../../settings';

export const fetchFromApi = target =>
    fetch(`${SERVER_ENDPOINT}${target}`).then(response => response.json());

export const fetchFromCache = (
    hasLoadedSelector,
    networkAction,
    dispatch,
    getState
) =>
    hasLoadedSelector(getState())
        ? Promise.resolve()
        : dispatch(networkAction());
