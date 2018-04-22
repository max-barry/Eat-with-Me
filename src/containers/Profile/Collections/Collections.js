import React, { Component } from 'react';

import { compose } from 'recompose';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import { AuthenticationConsumer } from '../../../hocs/Authentication';
import { GET_COLLECTIONS } from '../../../data/graphql.collections/queries/getCollections';
import urls from '../../../settings/urls';

const CollectionLoader = () => <div>Collections loading</div>;
const CollectionEmpty = () => <p>Add a new collection</p>;

class Collections extends Component {
    render() {
        const {
            match: { params: { username }, ...route },
            user: { user, authLoaded, ability }
        } = this.props;
        return (
            <Query query={GET_COLLECTIONS} variables={{ username }}>
                {({ loading, data }) => {
                    if (loading) return <CollectionLoader />;

                    if (authLoaded) {
                        console.log(ability.can('edit', route.url));
                    }

                    return (
                        <div>
                            <ul>
                                {!data.length && <CollectionEmpty />}
                                <li>Dog</li>
                            </ul>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

const enhance = compose(AuthenticationConsumer, withRouter);

export default enhance(Collections);
