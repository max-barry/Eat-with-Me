import React from 'react';
import PropTypes from 'prop-types';
import { Img } from '../Performance';
import {
    cardImgClass as imgClass,
    CardContainer as Container,
    CardStrap as Strap,
    CardBadge as Badge,
    CardDeck as Deck,
    CardActionRow as ActionRow,
    CardTitle
} from './Card.styles';

// https://github.com/drcmda/react-spring/tree/master/examples

const Card = ({
    title,
    deck,
    src,
    alt,
    strap,
    badge,
    onClick,
    action: Action,
    ...props
}) => (
    <Container>
        <Img
            responsive={true}
            height={200}
            width={300}
            src={src}
            alt={alt || title}
            className={imgClass}
            onClick={onClick}
        />
        {(strap || badge) && (
            <Strap>
                {badge && <Badge>{badge}</Badge>}
                {strap}
            </Strap>
        )}
        <CardTitle>{title}</CardTitle>
        {deck && <Deck>{deck}</Deck>}
        {Action && <ActionRow>{Action}</ActionRow>}
    </Container>
);

Card.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deck: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
    action: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    strap: PropTypes.string,
    badge: PropTypes.string
};

export default Card;
