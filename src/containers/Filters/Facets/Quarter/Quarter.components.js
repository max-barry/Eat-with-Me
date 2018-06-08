import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    QuarterTag as Tag,
    QuarterList as List,
    QuarterListItem as ListItem
} from './Quarter.styles';
import { Checkbox } from '../../../../components/Forms';

const quarterList = ({ items, update, ...props }) => (
    <List>
        {items.map((quarter, key) => (
            <ListItem key={key}>
                <Checkbox
                    name={`quarter_checkbox_${key}`}
                    checked={quarter.isRefined}
                    title={
                        <Fragment>
                            {quarter.label} <em>{quarter.count}</em>
                        </Fragment>
                    }
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
);

quarterList.displayName = 'QuarterList';

quarterList.propTypes = {
    items: PropTypes.array.isRequired,
    update: PropTypes.func.isRequired
};

export const QuarterList = quarterList;
