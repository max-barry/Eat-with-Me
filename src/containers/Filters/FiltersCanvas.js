import React from 'react';
import { compose } from 'recompose';
import Loadable from 'react-loadable';
import withModal from '../../hocs/Modal/Modal';
import { FiltersModalStyles } from './Filters.styles';
import { FACET_QUARTER, FACET_EXTRAS } from './Filters.constants';

const FilterQuarter = Loadable({
    loader: _ => import('./FilterContent/Quarter/Quarter'),
    loading: () => <p>Loading quarter filter</p>
});

const FilterExtras = Loadable({
    loader: _ => import('./FilterContent/Extra/Extra'),
    loading: () => <p>Loading extra filter</p>
});

const filterComponents = {
    [FACET_QUARTER]: FilterQuarter,
    [FACET_EXTRAS]: FilterExtras
};

const FiltersCanvas = ({ contentKey, isOpen, top, left, ...props }) => {
    const FilterComponent = filterComponents[contentKey];
    console.log(props);
    return <FilterComponent {...props} />;
};

const enhance = compose(
    withModal({
        contentLabel: 'Filters',
        parentSelector: () => document.getElementById('FilterCanvasWrap'),
        isOpen: props => props.isOpen,
        onRequestClose: props => props.onRequestClose(),
        style: props => FiltersModalStyles(props)
    })
);

export default enhance(FiltersCanvas);
