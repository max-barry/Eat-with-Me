import { SERVER_ENDPOINT } from '../../settings';

export const fetchFromApi = (target, slug) => {
    const slugPath = slug ? `/${slug}` : '';
    const url = `${SERVER_ENDPOINT}${target}${slugPath}`;
    return fetch(url).then(response => response.json());
};
