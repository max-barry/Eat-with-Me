import React, { Component, Fragment } from 'react';
import styled, { css, cx } from 'react-emotion';
import { darken } from 'polished';
import {
    compose,
    setPropTypes,
    onlyUpdateForKeys,
    withState,
    lifecycle
} from 'recompose';
import PropTypes from 'prop-types';
import { Spring, animated, config, interpolate } from 'react-spring';
import posed, { PoseGroup } from 'react-pose';
import Ink from 'react-ink';
import { bs, colors } from '../../settings/styles';
import {
    buttonSimpleClass,
    atcClass,
    atcSecondTextClass,
    atcActiveClass
} from './Button.styles';
import { cross, add } from '../SVGs/paths';
import Svg from '../SVGs';

const enhanceButtonSimple = compose(
    setPropTypes({ onClick: PropTypes.func.isRequired })
);

const ButtonSimple = ({ children, className, hasInk = true, ...props }) => (
    <button className={cx(buttonSimpleClass, className)} {...props}>
        {children}
        {hasInk && <Ink duration={500} />}
    </button>
);

export default enhanceButtonSimple(ButtonSimple);

const enhanceButtonSimpleIcon = compose(
    setPropTypes({ icon: PropTypes.string.isRequired })
);

export const ButtonSimpleIcon = enhanceButtonSimpleIcon(
    ({ icon, children, fill, ...props }) => (
        <ButtonSimple {...props}>
            <Svg
                aria-hidden={true}
                path={icon}
                fill={fill}
                style={{ marginRight: bs(0.25) }}
            />
            {children}
        </ButtonSimple>
    )
);

const enhanceButtonAddToCollection = compose(
    setPropTypes({ added: PropTypes.bool.isRequired }),
    onlyUpdateForKeys(['added']),
    withState('isInitial', 'setInitial', true),
    lifecycle({
        componentDidMount() {
            this.props.setInitial(n => false);
        }
    })
);

export const ButtonAddToCollection = enhanceButtonAddToCollection(
    ({ added, isInitial, setInitial, ...props }) => (
        <ButtonSimpleIcon
            icon={added ? cross : add}
            fill={added ? colors.white : colors.black}
            className={cx(atcClass, added ? atcActiveClass : null)}
            hasInk={false}
            {...props}
        >
            <Spring
                native
                immediate={isInitial}
                from={{ y: 0, opacity: 1 }}
                to={{ y: added ? 0 : 35, opacity: added ? 1 : 0 }}
                config={config.gentle}
            >
                {({ y, opacity }) => (
                    <Fragment>
                        <animated.span
                            role="presentation"
                            aria-hidden={added ? true : false}
                            style={{
                                opacity: opacity.interpolate(o => 1 - o),
                                transform: y.interpolate(
                                    t => `translate3d(0px, ${35 - t}px, 0)`
                                )
                            }}
                        >
                            Add to collection
                        </animated.span>
                        <animated.span
                            className={atcSecondTextClass}
                            role="presentation"
                            aria-hidden={added ? false : true}
                            style={{
                                opacity: opacity,
                                transform: y.interpolate(
                                    t => `translate3d(0px, ${-1 * t}px, 0)`
                                )
                            }}
                        >
                            Remove
                        </animated.span>
                    </Fragment>
                )}
            </Spring>
        </ButtonSimpleIcon>
    )
);
