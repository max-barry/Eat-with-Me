import React, { Fragment } from 'react';
import { orderBy } from 'lodash';
import RangeCheckbox from '../../../../components/Forms/RangeCheckbox';
import { compose, withProps } from 'recompose';
import { priceIntToSymbol } from '../Facets.shared';
import { bs, shevy, colors } from '../../../../settings/styles';
import styled from 'react-emotion';

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
                    label: !disabled ? priceIntToSymbol(label) : label
                };
            }),
            ['int'],
            ['asc']
        )
    }))
);

const PriceTitle = styled('h5')(shevy.h6, {});
const PriceDeck = styled('h6')(shevy.h6, { color: colors.greyDark });

export const PriceOptions = enhance(({ items, onChange }) => (
    <Fragment>
        <PriceTitle>Choose a price range</PriceTitle>
        <PriceDeck>Filter by price</PriceDeck>
        <RangeCheckbox
            items={items}
            onChange={value => onChange(value)}
            style={{ marginBottom: bs(2), marginTop: bs() }}
        />
    </Fragment>
));
