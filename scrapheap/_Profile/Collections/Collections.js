// import React, { Component } from 'react';

// import { compose } from 'recompose';
// import { Query } from 'react-apollo';
// import { withRouter } from 'react-router';
// import { Link, Route } from 'react-router-dom';

// import { AuthenticationConsumer } from '../../../hocs/Authentication';
// import { GET_COLLECTIONS } from '../../../data/graphql.collections/queries/getCollections';
// import urls from '../../../settings/urls';
// import CollectionNew from './CollectionNew';

// const CollectionLoader = () => <div>Collections loading</div>;
// const CollectionEmpty = () => <p>There are no collections</p>;
// const CollectionAddNew = ({ username }) => (
//     <Link to={urls.PROFILE_COLLECTIONS_NEW.userfy(username)}>
//         Add a new collection
//     </Link>
// );

// class Collections extends Component {
//     render() {
//         const {
//             location,
//             match: { params: { username } },
//             user: { ability }
//         } = this.props;
//         return (
//             <Query query={GET_COLLECTIONS} variables={{ username }}>
//                 {({ loading, data }) => {
//                     if (loading) return <CollectionLoader />;

//                     const isOwner = ability
//                         ? ability.can('edit', location.pathname)
//                         : false;

//                     return (
//                         <div>
//                             <ul>
//                                 {isOwner && (
//                                     <CollectionAddNew username={username} />
//                                 )}
//                                 {!data.length && <CollectionEmpty />}
//                             </ul>
//                             {isOwner && (
//                                 <Route
//                                     exact
//                                     path={urls.PROFILE_COLLECTIONS_NEW.pathname}
//                                     component={CollectionNew}
//                                 />
//                             )}
//                         </div>
//                     );
//                 }}
//             </Query>
//         );
//     }
// }

// const enhance = compose(AuthenticationConsumer, withRouter);

// export default enhance(Collections);
