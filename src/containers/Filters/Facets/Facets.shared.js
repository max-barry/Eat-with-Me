import {
    withHandlers,
    compose,
    lifecycle,
    withPropsOnChange,
    setPropTypes,
    withStateHandlers
} from 'recompose';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { prop } from 'ramda';

export const withFacetLifecycle = lifecycle({
    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }
});

export const withFacetSave = withHandlers({
    save: ({ apply, items }) => (force = false) =>
        apply(items.filter(prop('isRefined')).map(prop('label')), !force)
});

// export const withFacetUpdate = withHandlers({
//     update: ({ refine }) => value => refine(value)
// });

export const withFacetPropTypes = setPropTypes({
    close: PropTypes.func.isRequired,
    // save: PropTypes.func.isRequired,
    apply: PropTypes.func.isRequired,
    initial: PropTypes.array.isRequired,
    clear: PropTypes.func
    // defaultRefinement: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    // .isRequired
});

export const withCondenseFacetActions = withPropsOnChange(
    ['save', 'close', 'clear'],
    ({ save, close, clear }) => ({
        actions: {
            clear,
            cancel: close,
            apply: save
        }
    })
);

export const withFacetAll = compose(
    withFacetPropTypes,
    withFacetSave,
    // withInternalState,
    // withFacetUpdate,
    withFacetLifecycle,
    withCondenseFacetActions
);

// export const withItemsOrdered = (
//     attributes,
//     direction,
//     postprocess = items => items
// ) =>
//     withPropsOnChange(['items'], props => ({
//         items: postprocess(orderBy(props.items, attributes, direction))
//     }));

// export const withPanelledUpdate = withHandlers({
//     update: ({ items, onChange }) => (panelLabel, itemLabel) => {
//         // Find the value associated with this label
//         // (kind of assumes all labels and panel names are unique)
//         const panel = items.find(({ name }) => name === panelLabel);
//         const item = panel.items.find(({ label }) => label === itemLabel);
//         onChange(item.value);
//     }
// });

export const priceIntToSymbol = int => '£'.repeat(parseFloat(int), 10);
