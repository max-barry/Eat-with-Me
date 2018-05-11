import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { GET_RESTAURANTS } from '../../data/graphql.restaurants/queries';
import FeedLoading from './Feed.loading';
import RestaurantWrapper from '../../hocs/RestaurantWrapper';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

class Feed extends Component {
    getNextPage(fetchMore, lastRestaurant, previousVariables) {
        fetchMore({
            variables: {
                ...previousVariables,
                after: lastRestaurant.id
            },
            updateQuery: (
                prev,
                { fetchMoreResult: { restaurants: newRestaurants } }
            ) => ({
                ...prev,
                restaurants: [...prev.restaurants, ...newRestaurants]
            })
        });
    }
    render() {
        // fetchPolicy="cache-and-network"
        return (
            <Query query={GET_RESTAURANTS}>
                {({ loading, data: { restaurants }, fetchMore, variables }) => {
                    return loading ? (
                        <FeedLoading />
                    ) : (
                        <ul>
                            {(restaurants || []).map((restaurant, i) => (
                                <RestaurantWrapper
                                    key={i}
                                    restaurant={restaurant}
                                    component={RestaurantMediaElement}
                                />
                            ))}
                            <button
                                onClick={_ =>
                                    this.getNextPage(
                                        fetchMore,
                                        restaurants[restaurants.length - 1],
                                        variables
                                    )
                                }
                            >
                                Load more
                            </button>
                        </ul>
                    );
                }}
            </Query>
        );
    }
}

export default Feed;
