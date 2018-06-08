import React, { Fragment } from 'react';
import {
    onlyUpdateForKeys,
    setPropTypes,
    compose,
    setDisplayName
} from 'recompose';
import PropTypes from 'prop-types';
import {
    QuarterTag as Tag,
    QuarterList as List,
    QuarterListItem as ListItem
} from './Quarter.styles';
import { Checkbox } from '../../../../components/Forms';

const Name = onlyUpdateForKeys([])(({ quarter }) => (
    <Fragment>
        {quarter.label} <em>{quarter.count}</em>
    </Fragment>
));

const enhanceQuarterList = compose(
    setDisplayName('QuarterList'),
    setPropTypes({
        items: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired
    })
);

export const QuarterList = enhanceQuarterList(({ items, update, ...props }) => (
    <List>
        {items.map((quarter, key) => (
            <ListItem key={key}>
                <Checkbox
                    name={`quarter_checkbox_${key}`}
                    checked={quarter.isRefined}
                    title={<Name quarter={quarter} />}
                    tag={
                        <Tag>
                            Leicester Square · Covent Garden · Lots more words
                        </Tag>
                    }
                    onChange={() => update(quarter.label)}
                />
            </ListItem>
        ))}
    </List>
));
