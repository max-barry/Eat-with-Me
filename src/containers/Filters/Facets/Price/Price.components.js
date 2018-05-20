import React from 'react';
import { orderBy } from 'lodash';
import RangeCheckbox from '../../../../components/Forms/RangeCheckbox';
import { compose, withProps } from 'recompose';

const enhance = compose(
    withProps(props => ({
        items: orderBy(
            props.items.map(({ isRefined, label, value, ...item }) => {
                const disabled = label === '-1';
                return {
                    ...item,
                    disabled,
                    id: value,
                    int: parseFloat(label, 10),
                    checked: isRefined,
                    label: !disabled ? '£'.repeat(parseFloat(label), 10) : label
                };
            }),
            ['int'],
            ['asc']
        )
    }))
);

export const PriceOptions = enhance(({ items, onChange }) => (
    <RangeCheckbox items={items} onChange={value => onChange(value)} />
));
