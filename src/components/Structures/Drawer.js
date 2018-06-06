import React from 'react';
import { compose, setPropTypes, lifecycle, withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import delay from 'delay';
import { Keyframes, config, animated, Spring } from 'react-spring';
import {
    drawerOverlayClass as overlayClass,
    drawerContentClass as contentClass
} from './Drawer.styles';
import { transitionTimes } from '../../settings/styles';

// const TRANSITION_DELAY = transitionTimes.short;
// const OPEN_STATE = 'open';
// const PRE_STATE = 'pre';
// const CLOSED_STATE = 'closed';

// const ExteriorAnimation = Keyframes.Spring({
//     [PRE_STATE]: {
//         from: { yout: 100 },
//         to: { yout: 100 }
//     },
//     [OPEN_STATE]: {
//         from: { yout: 100 },
//         to: { yout: 0 },
//         config: config.stiff
//     },
//     [CLOSED_STATE]: async call => {
//         await delay(TRANSITION_DELAY);
//         await call({ to: { yout: 100 }, config: config.stiff });
//     }
// });

// const InteriorAnimation = Keyframes.Spring({
//     [PRE_STATE]: {
//         from: { yin: 100 },
//         to: { yout: 100 }
//     },
//     [OPEN_STATE]: async call => {
//         await delay(TRANSITION_DELAY);
//         await call({
//             from: { yin: 100 },
//             to: { yin: 0 },
//             config: config.stiff
//         });
//     },
//     [CLOSED_STATE]: { to: { yin: 100 }, config: config.stiff }
// });

const Drawer = ({ isOpen, mounted, children, ...props }) => {
    // const animationState = !mounted
    //     ? PRE_STATE
    //     : isOpen ? OPEN_STATE : CLOSED_STATE;
    return (
        <Spring
            native
            from={{ progress: 100 }}
            to={{ progress: isOpen && mounted ? 0 : 100 }}
            config={config.gentle}
        >
            {({ progress }) => (
                <animated.div
                    className={cx(overlayClass, props.overlayClass)}
                    aria-label="TODO"
                    tabIndex={-1}
                    style={{
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transform: progress.interpolate(
                            progress => `translate3d(0%, ${progress}%, 0)`
                        )
                    }}
                >
                    <animated.div
                        className={cx(contentClass, props.contentClass)}
                    >
                        {children}
                    </animated.div>
                </animated.div>
            )}
        </Spring>
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
