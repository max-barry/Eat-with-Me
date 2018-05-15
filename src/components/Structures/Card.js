import React, { Fragment, createFactory } from 'react';
import { setPropTypes, compose, defaultProps, lifecycle } from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import { Spring, Transition, animated, config } from 'react-spring';
import { Img } from '../Performance';
import { ButtonSimple } from '../Buttons';
import {
    cardImgClass as imgClass,
    CardContainer as Container,
    CardStrap as Strap,
    CardBadge as Badge,
    CardDeck as Deck,
    CardActionRow as ActionRow,
    CardTitle,
    CardCompactTitle as CompactTitle,
    cardCompactContainerClass as compactContainerClass
} from './Card.styles';
import { bs, sInteractive, colors, sElipsify } from '../../settings/styles';
import { buttonSimpleClass } from '../Buttons/Button.styles';

// https://github.com/drcmda/react-spring/tree/master/examples

const enhanceCard = compose(
    setPropTypes({
        src: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        deck: PropTypes.string,
        alt: PropTypes.string,
        onClick: PropTypes.func,
        action: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        strap: PropTypes.string,
        badge: PropTypes.string
    })
);

export const Card = enhanceCard(
    ({
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
    )
);
