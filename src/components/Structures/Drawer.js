import React from 'react';
import {
    compose,
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

const Drawer = ({ isOpen, mounted, children, onClose, ...props }) => (
    <Spring
        native
        from={{ y: 100 }}
        to={{ y: isOpen && mounted ? 0 : 100 }}
        config={config.gentle}
        onRest={() => {
            // Function to call onClose
            if (onClose && mounted && !isOpen) onClose();
        }}
    >
        {({ y }) => (
            <animated.div
                className={cx(overlayClass, props.overlayClass)}
                aria-label="TODO"
                tabIndex={-1}
                style={{
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transform: y.interpolate(y => `translate3d(0%, ${y}%, 0)`)
                }}
            >
                <animated.div className={cx(contentClass, props.contentClass)}>
                    {children}
                </animated.div>
            </animated.div>
        )}
    </Spring>
);

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    overlayClass: PropTypes.string,
    contentClass: PropTypes.string,
    onClose: PropTypes.func
};

const enhance = compose(
    onlyUpdateForKeys(['isOpen', 'children']),
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
