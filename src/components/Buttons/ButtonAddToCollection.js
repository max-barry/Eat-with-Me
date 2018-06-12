import React, { Fragment } from 'react';
import { cx } from 'react-emotion';
import {
    compose,
    setPropTypes,
    onlyUpdateForKeys,
    withState,
    lifecycle
} from 'recompose';
import PropTypes from 'prop-types';
import { Spring, animated, config } from 'react-spring';
import { colors } from '../../settings/styles';
import { atcClass, atcSecondTextClass, atcActiveClass } from './Button.styles';
import { cross, add } from '../SVGs/paths';
import { ButtonSimpleIconMorph } from './ButtonSimple';

const enhance = compose(
    setPropTypes({ added: PropTypes.bool.isRequired }),
    onlyUpdateForKeys(['added']),
    withState('isInitial', 'setInitial', true),
    lifecycle({
        componentDidMount() {
            this.props.setInitial(n => false);
        }
    })
);

export default enhance(({ added, isInitial, setInitial, ...props }) => (
    <ButtonSimpleIconMorph
        icon={added ? cross : add}
        fill={added ? colors.white : colors.black}
        className={cx(atcClass, added ? atcActiveClass : null)}
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
    </ButtonSimpleIconMorph>
));
