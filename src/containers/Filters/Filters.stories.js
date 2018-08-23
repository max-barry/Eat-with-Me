import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { pluck } from 'ramda';
import Filters from './Filters';
import Quarter from './Filters.Quarter';
import Cuisine from './Filters.Cuisine';
import Bar from './Filters.Bar';
import Price from './Filters.Price';
import withSearch from '../../hocs/withSearch';
import { withRedux } from '../../stories/decorators';
import { algoliaItems, mockApi } from '../../stories/stories.shared';
import { cuisineTestdata } from './Filters.test';
import { FIRESTORE_COLLECTION_CATEGORY_GROUPS } from '../../settings';

storiesOf('Filters', module)
    .addDecorator(withRedux())
    .add('default', _ => {
        mockApi(FIRESTORE_COLLECTION_CATEGORY_GROUPS, cuisineTestdata);
        const Enhanced = withSearch(() => <Filters />);
        return <Enhanced />;
    })
    .add('Filters.Quarter', _ => {
        return <Quarter items={algoliaItems()} />;
    })
    .add('Filters.Price', _ => {
        return <Price items={algoliaItems(['1', '2', '3', '4'])} />;
    })
    .add('Filters.Bar', _ => {
        return <Bar items={false} />;
    })
    .add('Filters.Cuisine', _ => {
        mockApi(FIRESTORE_COLLECTION_CATEGORY_GROUPS, cuisineTestdata);
        return (
            <Cuisine items={algoliaItems(pluck('group', cuisineTestdata))} />
        );
    });
