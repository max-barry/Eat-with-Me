import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    AutoSizer,
    WindowScroller,
    CellMeasurerCache,
    CellMeasurer
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
    ContractableListContainer as Container,
    ContractableListRow as Row,
    ContractableListArea as Area
} from './ContractableList.styles';
import { dimensions } from '../../settings/styles';

// @link http://next.plnkr.co/edit/zjCwNeRZ7XtmFp1PDBsc?p=preview

const TOTAL_COLUMNS = 3;

const cache = new CellMeasurerCache({
    defaultHeight: 360,
    minHeight: 300,
    fixedWidth: true
});

const ContractableList = ({
    items,
    columns,
    children,
    itemsCount,
    sticky,
    ...props
}) => {
    return (
        <Container {...props}>
            <WindowScroller>
                {({
                    height,
                    width,
                    isScrolling,
                    registerChild,
                    onChildScroll,
                    scrollTop
                }) => {
                    const listSize = itemsCount || items.length;
                    const adjustedWidth = width * (columns / TOTAL_COLUMNS);

                    const itemsPerRow = Math.floor(
                        adjustedWidth / dimensions.card
                    );

                    const rowCount = Math.ceil(listSize / itemsPerRow);

                    const RowRenderer = ({ index, key, style, parent }) => {
                        const rowItems = [];
                        const fromIndex = index * itemsPerRow;
                        const toIndex = Math.min(
                            fromIndex + itemsPerRow,
                            listSize
                        );

                        for (let i = fromIndex; i < toIndex; i++) {
                            const { component: Component, props } = items[i];
                            rowItems.push(<Component key={i} {...props} />);
                        }

                        return (
                            <CellMeasurer
                                cache={cache}
                                columnIndex={0}
                                key={key}
                                parent={parent}
                                rowIndex={index}
                            >
                                {() => <Row style={style}>{rowItems}</Row>}
                            </CellMeasurer>
                        );
                    };

                    return (
                        <div
                            ref={registerChild}
                            style={{ gridColumn: `span ${columns}` }}
                        >
                            <List
                                autoHeight
                                height={height}
                                isScrolling={isScrolling}
                                onScroll={onChildScroll}
                                rowCount={rowCount}
                                rowRenderer={RowRenderer}
                                width={adjustedWidth}
                                deferredMeasurementCache={cache}
                                rowHeight={cache.rowHeight}
                                scrollTop={scrollTop}
                                style={{ outline: 0 }}
                            />
                        </div>
                    );
                }}
            </WindowScroller>
            <Area
                style={{ gridColumn: `span ${TOTAL_COLUMNS - columns}` }}
                sticky={sticky}
            >
                {children}
            </Area>
        </Container>
    );
};

ContractableList.defaultProps = {
    columns: 3,
    sticky: false
};

ContractableList.propTypes = {
    columns: PropTypes.number,
    sticky: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
                .isRequired,
            props: PropTypes.object
        })
    ).isRequired
};

export default ContractableList;
