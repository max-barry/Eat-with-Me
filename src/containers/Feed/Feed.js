import React, { Component } from 'react';

import { Query, compose } from 'react-apollo';

import { loadWaitingForData } from '../../data/utils';
import { GET_RESTAURANTS } from '../../data/graphql.restaurants/queries/getRestaurants';
import FeedLoading from './Feed.loading';
import RestaurantWrapper from '../../hocs/RestaurantWrapper';
import RestaurantMediaElement from '../../components/MediaElement/RestaurantMediaElement';

// class Feed extends Component {
//     onLoadMore() {
//         const {
//             restaurants,
//             getRestaurants: { fetchMore, variables }
//         } = this.props;
//         const lastRestaurant = restaurants[restaurants.length - 1];
//         fetchMore({
//             variables: {
//                 ...variables,
//                 after: lastRestaurant.id
//             },
//             updateQuery: (prev, { fetchMoreResult }) => {
//                 console.log(prev);
//                 console.log(fetchMoreResult);
//                 console.log({
//                     ...prev,
//                     getRestaurants: [...prev.getRestaurants, ...fetchMoreResult]
//                 });
//                 return {
//                     ...prev,
//                     getRestaurants: [...prev.getRestaurants, ...fetchMoreResult]
//                 };
//             }
//         });
//     }

//     render() {
//         const { restaurants = [] } = this.props;

//         return (
//             <ul>
//                 {restaurants.map((restaurant, i) => (
//                     <RestaurantWrapper
//                         key={i}
//                         restaurant={restaurant}
//                         component={RestaurantMediaElement}
//                     />
//                 ))}
//                 <button onClick={_ => this.onLoadMore()}>Load more</button>
//             </ul>
//         );
//     }
// }

// const enhance = compose(
//     getRestaurants,
//     loadWaitingForData('getRestaurants', FeedLoading)
// );

// export default enhance(Feed);

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
