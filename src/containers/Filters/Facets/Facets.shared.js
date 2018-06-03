import {
    withHandlers,
    compose,
    lifecycle,
    withPropsOnChange,
    setPropTypes,
    withStateHandlers
} from 'recompose';
import PropTypes from 'prop-types';
import { prop } from 'ramda';

export const withFacetLifecycle = lifecycle({
    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }
});

export const withFacetListSave = withHandlers({
    save: ({ apply, items }) => (force = false) =>
        apply(items.filter(prop('isRefined')).map(prop('label')), !force)
});

export const withFacetListUpdate = withStateHandlers(
    ({ initial }) => ({
        lastUpdate: null,
        items: initial
    }),
    {
        update: ({ items }) => label => {
            // Find the index of the value you wish to update
            const i = items.findIndex(item => item.label === label);
            const item = items[i];
            // Update the element at index i with a new refined state
            items[i] = { ...item, isRefined: !item.isRefined };
            // Return the fresh new items
            return {
                items,
                // We have this lastUpdate to trigger a state rerender.
                // The items has changed deeply, so won't trigger rerender.
                lastUpdate: new Date().getTime()
            };
        }
    }
);

// export const withFacetUpdate = withHandlers({
//     update: ({ refine }) => value => refine(value)
// });

export const withFacetPropTypes = setPropTypes({
    close: PropTypes.func.isRequired,
    // save: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
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

export const withFacetShared = compose(
    withFacetPropTypes,
    withFacetLifecycle,
    withCondenseFacetActions
);

// export const withFacetAll = compose();
// withFacetSave,
// withInternalState,
// withFacetUpdate,

// export

export const asFacetList = compose(
    withFacetListUpdate,
    withFacetListSave,
    withFacetShared
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
