import React from 'react';
import styled from 'react-emotion';
import { omit } from 'ramda';
import { ellipsis } from 'polished';
import Card from './Card';
import { dimensions, shevy, colors } from '../../settings';

const Outer = styled('div')({
    display: 'block',
    width: dimensions.card
    // width: '100%'
});

const Headline = styled('h5')(shevy.h6);

const Strap = styled('h6')(shevy.h6, ellipsis, {
    color: colors.greyDark,
    maxWidth: '100%'
});

const MiniCard = ({ title, strap, deck, onClick, ...props }) => (
    <Outer {...props}>
        <Headline>{title}</Headline>
        {strap && <Strap>{strap}</Strap>}
    </Outer>
);

MiniCard.defaultProps = {};

MiniCard.propTypes = omit(['img', 'alt', 'tag'], Card.propTypes);

export default MiniCard;
