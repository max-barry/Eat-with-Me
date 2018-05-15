import React, { Component } from 'react';
import { Spring, config } from 'react-spring';
import faker from 'faker';
import { Gesture } from 'react-with-gesture';
import { clamp } from 'lodash';
import { AddedItem } from './Added.components';
import { dimensions, bsint } from '../../../settings/styles';
import { AddedList as List } from './Added.styles';
import { calcWindowWidth } from '../../../shared';

const makeCompact = _ => ({
    title: faker.company.catchPhrase(),
    deck: faker.company.catchPhrase(),
    id: faker.lorem.word() + (Math.random() * 10).toFixed(2),
    strap: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].join(
        ' • '
    )
});

export default class extends Component {
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

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.computeStyles = this.computeStyles.bind(this);
    }

    componentDidMount() {
        this.windowWidth = calcWindowWidth();
    }

    toggleExpanded(id) {
        const shouldRemove = this.state.expanded.includes(id);
        this.setState({
            expanded: shouldRemove
                ? this.state.expanded.filter(n => n !== id)
                : [...this.state.expanded, id]
        });
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

    render() {
        const { order, expanded } = this.state;
        const swipeDismissW = this.swipeDismissW;
        const cardCompactW = this.cardCompactW;
        const halfDismissW = this.halfDismissW;
        // const {
        //     cardCompact: cardCompactW,
        //     swipeDismiss: swipeDismissW
        // } = dimensions;
        // const halfDismissW = swipeDismissW / 2;
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
                                (dimensions.simpleButton + bsint(0.5))
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
                                                            onDidUpdate={
                                                                onDidUpdate
                                                            }
                                                            isExpanded={
                                                                isExpanded
                                                            }
                                                            style={{
                                                                opacity,
                                                                transform: `translate3d(${x}px, 0px, 0)`
                                                            }}
                                                            onExpandedAction={() =>
                                                                this.remove(
                                                                    item.id
                                                                )
                                                            }
                                                            onClick={() => {
                                                                if (atRest) {
                                                                    this.toggleExpanded(
                                                                        item.id
                                                                    );
                                                                }
                                                            }}
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
