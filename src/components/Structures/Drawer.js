import React from 'react';
import {
    compose,
    setPropTypes,
    lifecycle,
    withStateHandlers,
    onlyUpdateForKeys
} from 'recompose';
import PropTypes from 'prop-types';
import { cx } from 'emotion';
import { config, animated, Spring } from 'react-spring';
import {
    drawerOverlayClass as overlayClass,
    drawerContentClass as contentClass
} from './Drawer.styles';
import { withPropsChecker } from '../../hocs/Debug/debug';

const Drawer = ({ isOpen, mounted, children, onClose, ...props }) => {
    return (
        <Spring
            native
            from={{ progress: 100 }}
            to={{ progress: isOpen && mounted ? 0 : 100 }}
            config={config.gentle}
            onRest={() => {
                // Function to call onClose
                if (onClose && mounted && !isOpen) onClose();
            }}
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
    onlyUpdateForKeys(['isOpen', 'children']),
    withStateHandlers(
        {
            mounted: false
            // animationCompleted: false
        },
        {
            setMounted: _ => _ => ({
                mounted: true
            })
            // setAnimationComplete: _ => isComplete => {
            //     console.log('yoman');
            //     return {
            //         animationCompleted: isComplete
            //     };
            // }
        }
    ),
    lifecycle({
        componentDidMount() {
            this.props.setMounted();
        }
    })
);

export default enhance(Drawer);
