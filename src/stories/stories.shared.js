import faker from 'faker';
import fetchMock from 'fetch-mock';
import { arrOf } from '../shared';
import { SERVER_ENDPOINT } from '../settings';

export const algoliaItems = (labels = arrOf(faker.commerce.productName)) =>
    labels.map(label => ({
        label,
        isRefined: faker.random.boolean()
    }));

export const mockApi = (target, payload) =>
    fetchMock.restore().get(SERVER_ENDPOINT + target, payload);
