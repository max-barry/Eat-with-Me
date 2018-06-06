import React from 'react';
import { compose, setPropTypes, lifecycle, withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import delay from 'delay';
import { Keyframes, config, animated } from 'react-spring';
import {
    drawerOverlayClass as overlayClass,
    drawerContentClass as contentClass
} from './Drawer.styles';
import { transitionTimes } from '../../settings/styles';

const TRANSITION_DELAY = transitionTimes.short;
const OPEN_STATE = 'open';
const PRE_STATE = 'pre';
const CLOSED_STATE = 'closed';

const ExteriorAnimation = Keyframes.Spring({
    [PRE_STATE]: {
        from: { yout: 100 },
        to: { yout: 100 }
    },
    [OPEN_STATE]: {
        from: { yout: 100 },
        to: { yout: 0 },
        config: config.stiff
    },
    [CLOSED_STATE]: async call => {
        await delay(TRANSITION_DELAY);
        await call({ to: { yout: 100 }, config: config.stiff });
    }
});

const InteriorAnimation = Keyframes.Spring({
    [PRE_STATE]: {
        from: { yin: 100 },
        to: { yout: 100 }
    },
    [OPEN_STATE]: async call => {
        await delay(TRANSITION_DELAY);
        await call({
            from: { yin: 100 },
            to: { yin: 0 },
            config: config.stiff
        });
    },
    [CLOSED_STATE]: { to: { yin: 100 }, config: config.stiff }
});

const Drawer = ({ isOpen, mounted, children, ...props }) => {
    console.log('render');
    const animationState = !mounted
        ? PRE_STATE
        : isOpen ? OPEN_STATE : CLOSED_STATE;
    return (
        <ExteriorAnimation native state={animationState}>
            {({ yout }) => (
                <animated.div
                    className={cx(overlayClass, props.overlayClass)}
                    aria-label="TODO"
                    tabIndex={-1}
                    style={{
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transform: yout.interpolate(
                            yout => `translate3d(0%, ${yout}%, 0)`
                        )
                    }}
                >
                    <InteriorAnimation native state={animationState}>
                        {({ yin }) => (
                            <animated.div
                                className={cx(contentClass, props.contentClass)}
                                style={{
                                    pointerEvents: isOpen ? 'auto' : 'none',
                                    transform: yin.interpolate(
                                        yin => `translate3d(0%, ${yin}%, 0)`
                                    )
                                }}
                            >
                                {children}
                            </animated.div>
                        )}
                    </InteriorAnimation>
                </animated.div>
            )}
        </ExteriorAnimation>
    );
};

const enhance = compose(
    setPropTypes({
        isOpen: PropTypes.bool.isRequired,
        overlayClass: PropTypes.string,
        contentClass: PropTypes.string
    }),
    withStateHandlers(
        {
            mounted: false
        },
        {
            setMounted: _ => _ => ({
                mounted: true
            })
        }
    ),
    lifecycle({
        componentDidMount() {
            this.props.setMounted();
        }
    })
);

export default enhance(Drawer);
