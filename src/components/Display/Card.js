import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { ellipsis } from 'polished';
import {
    dimensions,
    bs,
    shevy,
    colors,
    styles,
    fontWeights
} from '../../settings';
import Img from '../Performance/Img';

const cardWidth = dimensions.card;
const cardImageHeight = 180;

const Container = styled('div')({
    width: cardWidth
});

const strapClass = css(shevy.h6, ellipsis(), {
    marginTop: bs(0.5),
    display: 'block',
    color: colors.greyDark
});

const Tag = styled('span')(shevy.overline, {
    backgroundColor: colors.primary,
    color: colors.black,
    textTransform: 'none',
    marginRight: bs(0.5),
    borderRadius: dimensions.bevel,
    padding: styles.fn.pad(0.0625, 0.25)
});

const Headline = styled('h3')(shevy.h5, {
    marginTop: bs(0.5),
    marginBottom: 0
});

const Deck = styled('p')(shevy.h6, {
    marginBottom: 0,
    fontWeight: fontWeights.light
});

const Actions = styled('div')({
    marginTop: bs(0.5),
    display: 'flex',
    width: '100%',
    '> *:not(:last-child)': { marginRight: bs(0.5) }
});

const Card = ({
    title,
    strap,
    deck,
    img,
    alt,
    tag,
    onClick,
    action,
    ...props
}) => (
    <Container {...props}>
        <Img
            src={img}
            alt={alt || title}
            responsive={true}
            height={cardImageHeight}
            width={dimensions.card}
            style={{ borderRadius: dimensions.bevel }}
            onClick={onClick}
        />
        {(strap || tag) && (
            <h4 className={strapClass}>
                {tag && <Tag>{tag}</Tag>}
                {strap}
            </h4>
        )}
        <Headline>{title}</Headline>
        {deck && <Deck>{deck}</Deck>}
        {action && <Actions>{action}</Actions>}
    </Container>
);

Card.defaultProps = {};

Card.propTypes = {
    title: PropTypes.string,
    strap: PropTypes.string,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deck: PropTypes.string,
    img: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
    action: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array,
        PropTypes.element
    ])
};

export default Card;
