import React from 'react';
import {
    onlyUpdateForKeys,
    setPropTypes,
    compose,
    setDisplayName
} from 'recompose';
import PropTypes from 'prop-types';
import {
    quarterTagClass as tagClass,
    QuarterList as List,
    QuarterListItem as ListItem
} from './Quarter.styles';
import { Checkbox } from '../../../../components/Forms';

const Name = onlyUpdateForKeys([])(({ quarter }) => (
    <span>
        {quarter.label} <em>{quarter.count}</em>
    </span>
));

const Tag = onlyUpdateForKeys([])(({ content }) => (
    <span className={tagClass}>{content}</span>
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
                    title={() => <Name quarter={quarter} />}
                    tag={() => (
                        <Tag
                            content={
                                'Leicester Square · Covent Garden · Lots more words'
                            }
                        />
                    )}
                    onChange={() => update(quarter.label)}
                />
            </ListItem>
        ))}
    </List>
));
