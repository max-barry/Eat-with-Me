import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import styled from 'react-emotion';
import { spring, decay } from 'popmotion';
import { transitionTimes } from '../../settings';

// @link https://codepen.io/popmotion/pen/rdzeKQ

const xDist = 190;
const dismissPercent = 0.8;
const isDismissed = x => x >= xDist * dismissPercent;

const DraggableItem = posed.li({
    draggable: 'x',
    dragEnd: {
        transition: ({ from, to, velocity }) =>
            isDismissed(from)
                ? decay({ from, velocity: Math.max(velocity, 300) })
                : spring({ from, to: 0, velocity, stiffness: 750, damping: 50 })
    }
});

const ItemContainer = posed.div({
    exit: {
        opacity: 0,
        // translateY: 0,
        transition: { duration: transitionTimes.minimal }
    },
    enter: {
        opacity: 1,
        // translateY: 0,
        transition: { duration: transitionTimes.short }
    },
    preenter: { opacity: 0 }
});

const StyledItem = styled(ItemContainer)(({ gap }) => ({
    '&:not(:last-child)': {
        marginBottom: gap
    }
}));

class AnimatedList extends Component {
    exited = {};

    // TODO : Make the container elastic

    render = () => {
        const { items, onExit, gap, ...props } = this.props;
        return (
            <ul {...props}>
                <PoseGroup preEnterPose="preenter">
                    {items.map(({ key, component }) => (
                        <StyledItem key={key} gap={gap}>
                            <DraggableItem
                                onValueChange={{
                                    x: x => {
                                        if (this.exited[key] || !isDismissed(x))
                                            return;

                                        onExit(key);
                                        this.exited[key] = true;
                                    }
                                }}
                            >
                                {component}
                            </DraggableItem>
                        </StyledItem>
                    ))}
                </PoseGroup>
            </ul>
        );
    };
}

AnimatedList.defaultProps = {
    gap: 0
};

AnimatedList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
                .isRequired,
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    ).isRequired,
    gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onExit: PropTypes.func
};

export default AnimatedList;
