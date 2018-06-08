import React, { Component } from 'react';
import { Spring, config } from 'react-spring';
import faker from 'faker';
import { Gesture } from 'react-with-gesture';
import { clamp } from 'lodash';
import { AddedItem } from './Added.components';
import { dimensions, bsint } from '../../../settings/styles';
import { AddedList as List } from './Added.styles';
import { calcWindowWidth } from '../../../shared';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withPropsChecker } from '../../../hocs/Debug';

const makeCompact = _ => ({
    title: faker.company.catchPhrase(),
    deck: faker.company.catchPhrase(),
    id: faker.lorem.word() + (Math.random() * 10).toFixed(2),
    strap: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].join(
        ' • '
    )
});

class Added extends Component {
    state = {
        order: [
            makeCompact(),
            makeCompact(),
            makeCompact(),
            makeCompact(),
            makeCompact()
        ],
        expanded: []
    };

    constructor(props) {
        super(props);

        this.swipeDismissW = dimensions.swipeDismiss;
        this.cardCompactW = dimensions.cardCompact;
        this.halfDismissW = dimensions.swipeDismiss / 2;

        this.onItemClick = this.onItemClick.bind(this);
        this.remove = this.remove.bind(this);
        this.computeStyles = this.computeStyles.bind(this);
    }

    componentDidMount() {
        this.windowWidth = calcWindowWidth();
    }

    remove(id) {
        this.setState({
            expanded: [...this.state.expanded.filter(n => n.id !== id)],
            order: [...this.state.order.filter(n => n.id !== id)]
        });
    }

    computeStyles(down, xDelta, item) {
        const clampedDelta = clamp(
            xDelta,
            -20, // Give it a little wobble backwards
            this.windowWidth
        );
        const shouldDismiss = xDelta >= this.swipeDismissW;

        const shouldFade = down && xDelta >= this.halfDismissW;

        const fade = shouldFade
            ? clamp(1 - (xDelta - this.halfDismissW) / this.halfDismissW, 0, 1)
            : 1;

        const onDidUpdate =
            shouldDismiss && !down ? () => this.remove(item.id) : null;

        return {
            onDidUpdate,
            fade,
            calculatedX: down ? clampedDelta : shouldDismiss ? 500 : 0
        };
    }

    onItemClick(atRest, id) {
        if (!atRest) return;

        const shouldExpand = this.state.expanded.includes(id);
        this.setState({
            expanded: shouldExpand
                ? this.state.expanded.filter(n => n !== id)
                : [...this.state.expanded, id]
        });
    }

    render() {
        const { order, expanded } = this.state;
        const cardCompactW = this.cardCompactW;
        return (
            <List>
                {order.map((item, i) => {
                    // TODO : Must be able to optimise the below a bit to remove findindex
                    const expandedBeforeThis = order.filter(
                        el =>
                            order.findIndex(x => x.id === el.id) <
                                order.findIndex(x => x.id === item.id) &&
                            expanded.includes(el.id)
                    );

                    const isExpanded = expanded.includes(item.id);

                    const toStyle = {
                        y:
                            i * cardCompactW +
                            i * bsint(1) +
                            expandedBeforeThis.length *
                                (dimensions.button + bsint(0.5))
                    };

                    return (
                        <Spring
                            // from={previous}
                            to={toStyle}
                            key={`order_spring_${item.id}`}
                            config={config.wobbly}
                        >
                            {({ y }) => (
                                <li
                                    style={{
                                        transform: `translate3d(0px, ${y}px, 0)`
                                    }}
                                >
                                    <Gesture>
                                        {({ down, xDelta }) => {
                                            const {
                                                calculatedX,
                                                fade,
                                                onDidUpdate
                                            } = this.computeStyles(
                                                down,
                                                xDelta,
                                                item
                                            );

                                            const atRest =
                                                xDelta <= 10 && xDelta >= 0;

                                            return (
                                                <Spring
                                                    to={{
                                                        x: calculatedX,
                                                        opacity: fade
                                                    }}
                                                    key={`swipe_spring_${
                                                        item.id
                                                    }`}
                                                >
                                                    {({ x, opacity }) => (
                                                        <AddedItem
                                                            {...item}
                                                            key={item.id}
                                                            id={item.id}
                                                            atRest={atRest}
                                                            isExpanded={
                                                                isExpanded
                                                            }
                                                            style={{
                                                                opacity,
                                                                transform: `translate3d(${x}px, 0px, 0)`
                                                            }}
                                                            onDidUpdate={
                                                                onDidUpdate
                                                            }
                                                            onExpandedAction={
                                                                this.remove
                                                            }
                                                            onClick={
                                                                this.onItemClick
                                                            }
                                                        />
                                                    )}
                                                </Spring>
                                            );
                                        }}
                                    </Gesture>
                                </li>
                            )}
                        </Spring>
                    );
                })}
            </List>
        );
    }
}

const enhance = compose(onlyUpdateForKeys([]), withPropsChecker);

export default enhance(Added);
