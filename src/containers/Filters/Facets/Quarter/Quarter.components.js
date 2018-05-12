import React from 'react';
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
    <span>
        {' '}
        {`${quarter.label} `} <em>{quarter.count}</em>{' '}
    </span>
));

const enhanceQuarterList = compose(
    setDisplayName('QuarterList'),
    setPropTypes({
        items: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    })
);

export const QuarterList = enhanceQuarterList(
    ({ items, onChange, ...props }) => (
        <List>
            {items.map((quarter, key) => (
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
                        onChange={() => onChange(quarter.value)}
                    />
                </ListItem>
            ))}
        </List>
    )
);
