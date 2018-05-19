import React, { Component } from 'react';
import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import {
    RangeList as List,
    RangeListItem as ListItem,
    RangeCheck as Check,
    RangeLabel as Label,
    // rangeNoPreviousClass as noPreviousClass,
    // rangeNoNextClass as noNextClass,
    rangeActiveClass as activeClass
    // RangeHandleWrap as HandleWrap,
    // RangeHandle as Handle,
    // RangeHandleConnector as Connector
    // rangeActiveClass as activeClass
    // rangeActiveCapClass as activeCapClass
} from './RangeCheckbox.styles';
import { makeAriaCheckboxProps, makeAriaLabelProps } from './Forms.shared';

class RangeCheckbox extends Component {
    render() {
        const { items, onChange } = this.props;

        return (
            <List>
                {items.map(({ label: Content, checked, id }, i) => {
                    const classes = {
                        // [noPreviousClass]:
                        //     checked && (!items[i - 1] || !items[i - 1].checked),
                        // [noNextClass]:
                        //     checked && (!items[i + 1] || !items[i + 1].checked),
                        [activeClass]: checked
                    };
                    return (
                        <ListItem key={`listItem_${i}`}>
                            <Label
                                className={cx(classes)}
                                {...makeAriaLabelProps(checked, id, () =>
                                    onChange(id)
                                )}
                            >
                                <Check
                                    {...makeAriaCheckboxProps(checked, id)}
                                />
                                {typeof Content === 'function' ? (
                                    <Content />
                                ) : (
                                    Content
                                )}
                            </Label>
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

const enhance = compose(
    setPropTypes({
        items: PropTypes.array.isRequired
    })
    // withAriaProps
);

export default enhance(RangeCheckbox);
