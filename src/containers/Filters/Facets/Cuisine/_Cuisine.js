/**
 * MOVE EVERYTHIGN TO TABS. BREAK IT UP IN TO Most Popular , Everyday, Global cuisine, Everything Else
 */

import React, { Component } from 'react';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { orderBy } from 'lodash';
import { setPropTypes, onlyUpdateForKeys, compose } from 'recompose';
import PropTypes from 'prop-types';
// import VirtualList from 'react-virtual-list';
import VirtualList from 'react-tiny-virtual-list';
import { Checkbox } from '../../../../components/Forms';
// import {} from './Cuisine.styles';
import { Actions } from '../shared';
import { FACET_CUISINE } from '../../Filters.shared';
// import BigSearch from '../../../../components/BigSearch/BigSearch';
import Chip from '../../../../components/Forms/Chip';
import {
    // CuisineListContainer as ListContainer,
    cuisineContainerClass,
    CuisineList as ListUl,
    CuisineListItem as ListItem
} from './Cuisine.styles';
import { CHIP_HEIGHT } from '../../../../components/Forms/Chip.styles';

const List = ({
    refine,
    items: cuisines,
    onChange,
    virtual,
    itemHeight,
    ...props
}) => (
    <ListUl style={virtual.style}>
        {cuisines.map((cuisine, i) => (
            <ListItem key={`cuisine_${i}`}>
                <Chip
                    title={`${cuisine.label} (${cuisine.count})`}
                    onChange={() => onChange(refine, cuisine.value)}
                    name={`cuisine_${i}`}
                    checked={cuisine.isRefined}
                    style={{ height: itemHeight }}
                />
            </ListItem>
        ))}
    </ListUl>
);

const Wrap = ({ items, onChange, refine, ...props }) => {
    // const VirtualCuisineList = VirtualList({
    //     initialState: {
    //         firstItemIndex: 0, // show first ten items
    //         lastItemIndex: 20 // during initial render
    //     }
    // })(List);

    // Subsect our list of items to anything with over 10 restaurants
    const orderedItems = orderBy(
        items,
        ['count', 'label'],
        ['desc', 'asc']
    ).filter(cuisine => cuisine.count > 10);

    return (
        <VirtualList
            width="100%"
            // height={600}
            height={450}
            // height="auto"
            itemCount={orderedItems.length}
            itemSize={50} // Also supports variable heights (array or function getter)
            renderItem={({ index, style }) => (
                <div key={index} style={style}>
                    <Chip
                        title={`${orderedItems[index].label} (${
                            orderedItems[index].count
                        })`}
                        onChange={() =>
                            onChange(refine, orderedItems[index].value)
                        }
                        name={`cuisine_${index}`}
                        checked={orderedItems[index].isRefined}
                    />
                </div>
            )}
        />
        // <VirtualList
        //     width="100%"
        //     height={600}
        //     itemCount={orderedItems.length}
        //     itemSize={CHIP_HEIGHT} // Also supports variable heights (array or function getter)
        //     renderItem={({ i, style }) => {
        //         console.log(i);
        //         const cuisine = orderedItems[i];
        //         return (
        //             <div key={`cuisine_index_${i}`} style={style}>
        //                 <Chip
        //                     title={`${cuisine.label} (${cuisine.count})`}
        //                     onChange={() => onChange(refine, cuisine.value)}
        //                     name={`cuisine_${i}`}
        //                     checked={cuisine.isRefined}
        //                 />
        //             </div>
        //         );
        //     }}
        // />
    );
};

const EnhancedCuisineWrap = compose(
    onlyUpdateForKeys(['currentRefinement', 'items', 'container']),
    connectRefinementList
)(Wrap);

class Cuisine extends Component {
    state = { refinement: this.props.defaultRefinement };

    save = force =>
        this.props.updateVirtuals(FACET_CUISINE, this.state.refinement, !force);

    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
        // this.forceUpdate();
    }

    update([refine, value]) {
        // refine(value);
        this.setState({ refinement: value });
    }

    render() {
        // const { virtualList: CuisineList = null } = this.state;
        return (
            <div className={cuisineContainerClass}>
                <EnhancedCuisineWrap
                    limit={100}
                    attribute={FACET_CUISINE}
                    defaultRefinemnet={this.props.defaultRefinemnet}
                    onChange={(...args) => this.update(args)}
                    {...this.props}
                />
                {/* {CuisineList && <CuisineList />} */}
                {/* <EnhancedCuisineList
                    attribute={FACET_CUISINE}
                    defaultRefinemnet={this.props.defaultRefinemnet}
                    // searchable={true}
                    limit={100}
                    itemHeight={CHIP_HEIGHT}
                    onChange={(...args) => this.update(args)}
                    {...this.props}
                /> */}
                {/* <Actions
                    applyAction={() => this.save()}
                    cancelAction={this.props.onRequestClose}
                /> */}
            </div>
        );
    }
}

const enhance = compose(
    setPropTypes({
        defaultRefinement: PropTypes.array.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        updateVirtuals: PropTypes.func.isRequired
    }),
    onlyUpdateForKeys(['defaultRefinement'])
);

export default enhance(Cuisine);
