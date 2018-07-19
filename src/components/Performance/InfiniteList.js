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
import { InfiniteListRow as Row } from './InfiniteList.styles';
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

    RowRenderer({ index, key, style, parent, isScrolling }) {
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
        const { loadMore, hasMore, isLoadingMore, threshold } = this.props;

        // Only load 1 page of items at a time.
        // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
        // TODO : Block loadMore call if already fetching. The below is not working
        const loadMoreRows = isLoadingMore || !hasMore ? () => {} : loadMore;

        return (
            <InfiniteLoader
                isRowLoaded={({ index }) => index < this.rowCount}
                loadMoreRows={loadMoreRows}
                rowCount={9000}
                // minimumBatchSize={20}
                threshold={threshold}
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
                                            rowCount={this.rowCount}
                                            rowRenderer={this.RowRenderer}
                                            deferredMeasurementCache={cache}
                                            rowHeight={cache.rowHeight}
                                            scrollTop={scrollTop}
                                            style={{ outline: 0 }}
                                            ref={registerChild}
                                            onScroll={onChildScroll}
                                            onRowsRendered={onRowsRendered}
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
    threshold: 10
};

InfiniteList.propTypes = {
    hasMore: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    loadMore: PropTypes.func,
    threshold: PropTypes.number,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
                .isRequired,
            props: PropTypes.object
        })
    ).isRequired
};

export default InfiniteList;
