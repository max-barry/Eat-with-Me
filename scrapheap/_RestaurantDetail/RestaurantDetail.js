// import React, { Component } from 'react';

// import { compose } from 'react-apollo';
// import { Query } from 'react-apollo';
// import { withRouter } from 'react-router';
// // import { loadWaitingForData } from '../../data/utils';
// // import getRestaurant from '../../data/graphql.restaurants/queries/getRestaurant';
// import { GET_RESTAURANT } from '../../data/graphql.restaurants/queries/getRestaurant';
// import RestaurantLoading from './Restaurant.loading';
// import RestaurantWrapper from '../../hocs/RestaurantWrapper';
// import withGooglePlaces from '../../hocs/GooglePlaces';

// const Content = ({ restaurant, ...props }) => {
//     return <p>{restaurant.name}</p>;
// };

// const enhanceContent = compose(
//     withGooglePlaces(({ restaurant: { google_place_id } }) => google_place_id)
// );
// const enhancedContent = enhanceContent(Content);

// // const RestaurantDetail = ({ getRestaurant: { getRestaurant }, ...props }) => (
// // const RestaurantDetail = ({ restaurant, ...props }) => {
// class RestaurantDetail extends Component {
//     render() {
//         return (
//             <Query
//                 query={GET_RESTAURANT}
//                 variables={{ slug: this.props.match.params.slug }}
//             >
//                 {({ loading, data: { restaurant }, fetchMore, variables }) => {
//                     return loading ? (
//                         <RestaurantLoading />
//                     ) : (
//                         <RestaurantWrapper
//                             restaurant={restaurant}
//                             component={enhancedContent}
//                         />
//                     );
//                 }}
//             </Query>
//         );
//     }
// }

// const enhance = compose(
//     withRouter
//     // loadWaitingForData('restaurant', RestaurantLoading)
// );

// export default enhance(RestaurantDetail);
