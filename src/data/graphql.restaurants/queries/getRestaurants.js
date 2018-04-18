import gql from 'graphql-tag';

import { RESTAURANT_FRAGMENT } from '../fragments';

export const GET_RESTAURANTS = gql`
    query GetRestaurants(
        $after: String = null,
        $orderBy: String = "-yelp_review_count",
        $limit: Int = 20,
        $includeClosed: Boolean = false,
        $includeLandmarks: Boolean = false
    ) {
        restaurants (
            after: $after,
            orderBy: $orderBy,
            limit: $limit,
            includeClosed: $includeClosed,
            includeLandmarks: $includeLandmarks
        ) {
            ...${RESTAURANT_FRAGMENT.name}
        }
    }
    ${RESTAURANT_FRAGMENT.fragment}
`;
