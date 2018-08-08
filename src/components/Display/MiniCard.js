import React from 'react';
import styled from 'react-emotion';
import { omit } from 'ramda';
import { ellipsis } from 'polished';
import Card from './Card';
import { dimensions, shevy, colors, bs } from '../../settings';

const Outer = styled('div')({
    display: 'block',
    width: dimensions.card
});

const Headline = styled('h5')(shevy.h6);

const Strap = styled('h6')(shevy.h6, ellipsis, {
    color: colors.greyDark,
    display: 'block',
    maxWidth: '100%'
});

const ActionsRow = styled('div')({
    display: 'flex',
    '> *:not(:last-child)': {
        marginRight: bs(0.25)
    }
});

const MiniCard = ({ title, strap, deck, onClick, actions, ...props }) => (
    <Outer {...props}>
        <Headline>{title}</Headline>
        {strap && <Strap>{strap}</Strap>}
        {actions && <ActionsRow>{actions}</ActionsRow>}
    </Outer>
);

MiniCard.defaultProps = {};

MiniCard.propTypes = omit(['img', 'alt', 'tag'], Card.propTypes);

export default MiniCard;
