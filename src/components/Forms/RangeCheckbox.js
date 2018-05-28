import React from 'react';
import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import {
    RangeList as List,
    RangeListItem as ListItem,
    RangeCheck as Check,
    RangeLabel as Label,
    rangeActiveClass as activeClass
} from './RangeCheckbox.styles';
import { makeAriaCheckboxProps, makeAriaLabelProps } from './Forms.shared';

const RangeCheckbox = ({ items, onChange, ...props }) => (
    <List>
        {items.map(({ label: Content, checked, id, disabled }, i) => (
            <ListItem key={`listItem_${i}`}>
                <Label
                    className={cx({ [activeClass]: checked })}
                    {...makeAriaLabelProps(
                        checked,
                        id,
                        () => onChange(id),
                        disabled
                    )}
                >
                    <Check
                        {...makeAriaCheckboxProps(checked, id, 0, disabled)}
                    />
                    {typeof Content === 'function' ? <Content /> : Content}
                </Label>
            </ListItem>
        ))}
    </List>
);

const enhance = compose(
    setPropTypes({
        onChange: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                checked: PropTypes.bool.isRequired,
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.func,
                    PropTypes.element
                ]).isRequired,
                id: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.array,
                    PropTypes.number
                ]).isRequired
            })
        ).isRequired
    })
);

export default enhance(RangeCheckbox);
