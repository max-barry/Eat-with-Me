import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { spring, decay, tween } from 'popmotion';
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
    exit: { opacity: 0, transition: { duration: transitionTimes.minimal } },
    enter: { opacity: 1, transition: { duration: transitionTimes.minimal } }
});

class AnimatedList extends Component {
    exited = {};

    render = () => {
        const { items, onExit, ...props } = this.props;
        return (
            <ul {...props}>
                <PoseGroup>
                    {items.map(({ key, component }) => (
                        <ItemContainer key={key}>
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
                        </ItemContainer>
                    ))}
                </PoseGroup>
            </ul>
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
    onExit: PropTypes.func
};

export default AnimatedList;
