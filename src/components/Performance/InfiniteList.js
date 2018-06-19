import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    List,
    AutoSizer,
    InfiniteLoader,
    WindowScroller,
    CellMeasurerCache,
    CellMeasurer
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
    // InfiniteListContainer as Container,
    InfiniteListRow as Row
    // InfiniteListArea as Area
} from './InfiniteList.styles';
import { dimensions } from '../../settings/styles';

// @link http://next.plnkr.co/edit/zjCwNeRZ7XtmFp1PDBsc?p=preview

const cache = new CellMeasurerCache({
    defaultHeight: 325,
    minHeight: 300,
    fixedWidth: true
});

class InfiniteList extends Component {
    rowCount = null;
    itemsPerRow = null;
    state = { loadedRows: {}, loadedCount: 0, loadingCount: 0 };

    constructor(props) {
        super(props);
        this.RowRenderer = this.RowRenderer.bind(this);
    }

    get listSize() {
        return this.props.items.length;
    }

    RowRenderer({ index, key, style, parent }) {
        const rowItems = [];
        const fromIndex = index * this.itemsPerRow;
        const toIndex = Math.min(fromIndex + this.itemsPerRow, this.listSize);

        for (let i = fromIndex; i < toIndex; i++) {
            const { component: BaseComponent, props } = this.props.items[i];
            rowItems.push(<BaseComponent key={i} {...props} />);
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
    }

    render() {
        const { loadMore, hasMore, isLoadingMore } = this.props;

        // TODO : block loadMore call if already fetching

        // Only load 1 page of items at a time.
        // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
        // TODO : This is not working
        const loadMoreRows = isLoadingMore || !hasMore ? () => {} : loadMore;
        // const loadMoreRows = loadMore;

        return (
            <InfiniteLoader
                isRowLoaded={({ index }) => index < this.rowCount}
                loadMoreRows={loadMoreRows}
                rowCount={9000}
                // minimumBatchSize={20}
                // threshold={20}
            >
                {({ onRowsRendered, registerChild }) => (
                    <WindowScroller>
                        {({
                            height,
                            isScrolling,
                            scrollTop,
                            onChildScroll
                        }) => (
                            <AutoSizer disableHeight>
                                {({ width }) => {
                                    this.itemsPerRow = Math.floor(
                                        width / dimensions.card
                                    );

                                    this.rowCount = Math.ceil(
                                        this.listSize / this.itemsPerRow
                                    );

                                    return (
                                        <List
                                            autoHeight
                                            height={height}
                                            width={width}
                                            isScrolling={isScrolling}
                                            onScroll={onChildScroll}
                                            rowCount={this.rowCount}
                                            rowRenderer={this.RowRenderer}
                                            onRowsRendered={onRowsRendered}
                                            deferredMeasurementCache={cache}
                                            rowHeight={cache.rowHeight}
                                            scrollTop={scrollTop}
                                            style={{ outline: 0 }}
                                            ref={registerChild}
                                        />
                                    );
                                }}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                )}
            </InfiniteLoader>
        );
    }
}

InfiniteList.defaultProps = {
    // pageSize: 20
};

InfiniteList.propTypes = {
    hasMore: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    loadMore: PropTypes.func,
    // pageSize: PropTypes.number,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
                .isRequired,
            props: PropTypes.object
        })
    ).isRequired
};

export default InfiniteList;
