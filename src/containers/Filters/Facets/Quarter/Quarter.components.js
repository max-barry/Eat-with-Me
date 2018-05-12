import React from 'react';
import connectRefinementList from 'react-instantsearch/connectors';
import { onlyUpdateForKeys } from 'recompose';
import { orderBy } from 'lodash';
import {
    QuarterTag as Tag,
    QuarterList as List,
    QuarterListItem as ListItem
} from './Quarter.styles';
import { Checkbox } from '../../../../components/Forms';

const Name = onlyUpdateForKeys([])(({ count, label }) => (
    <span>
        {' '}
        {`${label} `} <em>{count}</em>{' '}
    </span>
));

const SimpleQuarterList = ({
    currentRefinement,
    refine,
    items,
    onChange,
    ...props
}) => (
    <List>
        {orderBy(items, ['count', 'label'], ['desc', 'asc']).map(
            (quarter, key) => (
                <ListItem key={key}>
                    <Checkbox
                        name={`quarter_checkbox_${key}`}
                        checked={quarter.isRefined}
                        title={() => <Name quarter={quarter} />}
                        tag={() => (
                            <Tag>
                                Leicester Square · Covent Garden · Lots more
                                words
                            </Tag>
                        )}
                        onChange={() => onChange(refine, quarter.value)}
                    />
                </ListItem>
            )
        )}
    </List>
);

export const QuarterList = connectRefinementList(SimpleQuarterList);
