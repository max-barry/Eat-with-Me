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
    CardCompactContainer as CompactContainer
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

const enhanceCompactCard = compose(
    setPropTypes({
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        deck: PropTypes.string,
        strap: PropTypes.string,
        isExpanded: PropTypes.bool
    })
);

export const CardCompact = enhanceCompactCard(
    ({
        title,
        deck,
        strap,
        onClick,
        onExpandedAction,
        isExpanded,
        color = colors.secondaryDark,
        ...props
    }) => {
        return (
            <CompactContainer {...props}>
                <div className={sInteractive} onClick={() => onClick()}>
                    <CompactTitle style={{ lineHeight: 1.3, color }}>
                        {title}
                    </CompactTitle>
                    {strap && (
                        <Strap
                            style={{
                                marginTop: bs(0.25),
                                marginBottom: bs(0.25),
                                lineHeight: 1
                            }}
                        >
                            {strap}
                        </Strap>
                    )}
                    {deck && (
                        <Deck className={sElipsify} style={{ lineHeight: 1.3 }}>
                            {deck}
                        </Deck>
                    )}
                </div>
                <Spring
                    native
                    from={{ opacity: 0 }}
                    to={{ opacity: isExpanded ? 1 : 0 }}
                    config={config.stiff}
                >
                    {styles => (
                        <animated.button
                            className={buttonSimpleClass}
                            style={{ marginTop: bs(0.5), ...styles }}
                            onClick={() => onExpandedAction()}
                        >
                            Button
                        </animated.button>
                    )}
                </Spring>

                {/* <Transition
                    // native
                    config={config.stiff}
                    from={{ scale: 0, opacity: 0 }}
                    enter={{ scale: 1, opacity: 1 }}
                    leave={{ scale: 0, opacity: 0 }}
                >
                    {isExpanded && CompactActions}
                </Transition> */}
            </CompactContainer>
        );
    }
);
