import React from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import 'instantsearch.css/themes/reset.css';
import {
    ALGOLIA_API_KEY,
    ALGOLIA_APP_ID,
    ALGOLIA_RESTAURANTS_INDEX
} from '../../settings/apis';

const withSearch = BaseComponent => props => (
    <InstantSearch
        appId={ALGOLIA_APP_ID}
        apiKey={ALGOLIA_API_KEY}
        indexName={ALGOLIA_RESTAURANTS_INDEX}
        onSearchStateChange={console.log}
    >
        <BaseComponent {...props} />
    </InstantSearch>
);

export default withSearch;
