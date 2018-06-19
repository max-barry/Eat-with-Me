import React from 'react';
import PropTypes from 'prop-types';
import {
    Img,
    LoadingImage,
    LoadingButton,
    LoadingHeading
} from '../Performance';
import {
    cardImgClass as imgClass,
    CardContainer as Container,
    CardStrap as Strap,
    CardBadge as Badge,
    CardDeck as Deck,
    CardActionRow as ActionRow,
    CardTitle,
    CARD_IMG_HEIGHT,
    CARD_IMG_WIDTH
} from './Card.styles';
import { dimensions } from '../../settings/styles';

// https://github.com/drcmda/react-spring/tree/master/examples

const Card = ({
    title,
    deck,
    src,
    alt,
    strap,
    badge,
    onClick,
    isLoading,
    action: Action,
    ...props
}) => {
    const hasStrap = !!(strap || badge);
    const hasDeck = !!deck;
    const hasAction = !!Action;

    return isLoading ? (
        <div style={{ width: dimensions.card }} {...props}>
            <LoadingImage height={180} margin={0.5} onClick={onClick} />
            <LoadingHeading margin={0.5} />
            <LoadingHeading width="80%" dominant={true} margin={0.25} />
            <LoadingHeading width="65%" margin={0.75} />
            <LoadingButton dominant={true} />
        </div>
    ) : (
        <Container {...props}>
            <Img
                responsive={true}
                height={CARD_IMG_HEIGHT}
                width={CARD_IMG_WIDTH}
                src={src}
                alt={alt || title}
                className={imgClass}
                onClick={onClick}
            />
            {hasStrap && (
                <Strap>
                    {badge && <Badge>{badge}</Badge>}
                    {strap}
                </Strap>
            )}
            <CardTitle>{title}</CardTitle>
            {hasDeck && <Deck>{deck}</Deck>}
            {hasAction && <ActionRow>{Action}</ActionRow>}
        </Container>
    );
};

Card.defaultProps = {
    isLoading: false
};

Card.propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    deck: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
    action: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    strap: PropTypes.string,
    badge: PropTypes.string,
    isLoading: PropTypes.bool
};

export default Card;
