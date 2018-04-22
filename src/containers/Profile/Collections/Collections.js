import React, { Component } from 'react';

import { compose } from 'recompose';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import { AuthenticationConsumer } from '../../../hocs/Authentication';
import { GET_COLLECTIONS } from '../../../data/graphql.collections/queries/getCollections';

class Collections extends Component {
    render() {
        const { match: { params } } = this.props;
        // console.log(params);
        return (
            <Query
                query={GET_COLLECTIONS}
                variables={{ username: params.username }}
            >
                {({ loading, data: { restaurants } }) => (
                    <ul>
                        <li>Dog</li>
                    </ul>
                )}
            </Query>
        );
    }
}

const enhance = compose(AuthenticationConsumer, withRouter);

export default enhance(Collections);
