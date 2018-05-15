import React, { Component } from 'react';
import { Spring, config } from 'react-spring';
import { range } from 'lodash';
import faker from 'faker';
import { Gesture } from 'react-with-gesture';
import { CardCompact } from '../../../components/Structures';
import { dimensions, bsint } from '../../../settings/styles';
import {
    addedListItemClass as listItemClass,
    AddedList as List
} from './Added.styles';

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
        this.toggleExpanded = this.toggleExpanded.bind(this);
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

    render() {
        const { order, previousOrder, expanded } = this.state;
        return (
            <List>
                {order.map((item, i) => {
                    const expandedBeforeThis = order.filter(el => {
                        return (
                            order.findIndex(x => x.id === el.id) <
                                order.findIndex(x => x.id === item.id) &&
                            expanded.includes(el.id)
                        );
                    });

                    const isExpanded = expanded.includes(item.id);

                    const n = i;
                    const next = {
                        y:
                            n * dimensions.cardCompact +
                            n * bsint(1) +
                            expandedBeforeThis.length *
                                (dimensions.simpleButton + bsint(0.5))
                    };

                    return (
                        <Spring
                            // from={previous}
                            to={next}
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
                                            return (
                                                <Spring
                                                    // from={{ x: 0 }}
                                                    to={{
                                                        x: down
                                                            ? xDelta
                                                            : xDelta > 200
                                                                ? 500
                                                                : 0
                                                    }}
                                                    immediate={name =>
                                                        down && name === 'x'
                                                    }
                                                    key={`swipe_spring_${
                                                        item.id
                                                    }`}
                                                >
                                                    {({ x }) => (
                                                        <CardCompact
                                                            {...item}
                                                            key={item.id}
                                                            isExpanded={
                                                                isExpanded &&
                                                                !down
                                                            }
                                                            style={{
                                                                transform: `translate3d(${x}px, 0px, 0)`
                                                            }}
                                                            onExpandedAction={() =>
                                                                this.remove(
                                                                    item.id
                                                                )
                                                            }
                                                            className={
                                                                listItemClass
                                                            }
                                                            onClick={() =>
                                                                this.toggleExpanded(
                                                                    item.id
                                                                )
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
