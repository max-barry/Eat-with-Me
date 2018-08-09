import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import styled from 'react-emotion';
import { spring, decay, transform } from 'popmotion';
import { transitionTimes, dimensions, colors } from '../../settings';
import trashSvg from '../../../public/images/icons/trash.svg';

// @link https://codepen.io/popmotion/pen/rdzeKQ

const { interpolate, pipe, clamp } = transform;

const xDist = dimensions.card;
const dismissPoint = xDist * 0.6;
const isDismissed = x => x >= dismissPoint;
const dismissIconSize = 50;

const Item = posed.div({
    preenter: { opacity: 0 },
    enter: {
        opacity: 1,
        transition: { duration: transitionTimes.short }
    },
    exit: {
        opacity: 0,
        transition: { duration: transitionTimes.minimal }
    },
    draggable: 'x',
    dragBounds: { left: 0, right: xDist },
    dragEnd: {
        transition: ({ from, to, velocity }) =>
            isDismissed(from)
                ? decay({ from, velocity: Math.max(velocity, 300) })
                : spring({ from, to: 0, velocity, stiffness: 750, damping: 50 })
    }
});

const StyledItem = styled(Item)({
    position: 'relative'
});

const DismissIcon = posed.i({
    passive: {
        translateX: ['x', x => -Math.abs(x), true],
        scale: [
            'x',
            pipe(
                // At x = 0 the icon is invisible. At x = 50px (the width of the dismiss icon)
                // it is still scale(0) but begins growing. It reaches full size at point of dismiss
                interpolate(
                    [0, dismissIconSize * 0.5, dismissPoint],
                    [0, 0, 1]
                ),
                clamp(0, 1)
            ),
            true
        ]
    }
});

const StyledDismissIcon = styled(DismissIcon)({
    width: dismissIconSize,
    height: dismissIconSize,
    display: 'block',
    backgroundColor: colors.error,
    transform: 'scale(0)',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    marginTop: -0.5 * dismissIconSize,
    '&::before': {
        content: '""',
        position: 'absolute',
        width: dismissIconSize,
        height: dismissIconSize,
        display: 'block',
        backgroundImage: `url(${trashSvg})`,
        backgroundSize: '60%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'invert(100%)'
    }
});

const InternalComponentWrap = posed.div({
    passive: {
        opacity: ['x', interpolate([0, dismissPoint], [1, 0]), true]
    }
});

class AnimatedList extends Component {
    exited = {};

    // TODO : Make the container elastic

    render = () => {
        const { items, onDismiss, ...props } = this.props;
        return (
            <div {...props}>
                <PoseGroup preEnterPose="preenter">
                    {items.map(({ key, component }) => (
                        <StyledItem
                            key={key}
                            onValueChange={{
                                x: x => {
                                    if (this.exited[key] || !isDismissed(x))
                                        return;

                                    onDismiss(key);
                                    this.exited[key] = true;
                                }
                            }}
                        >
                            <StyledDismissIcon />
                            <InternalComponentWrap>
                                {component}
                            </InternalComponentWrap>
                        </StyledItem>
                    ))}
                </PoseGroup>
            </div>
        );
    };
}

AnimatedList.defaultProps = {};

AnimatedList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
                .isRequired,
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    ).isRequired,
    onDismiss: PropTypes.func
};

export default AnimatedList;
