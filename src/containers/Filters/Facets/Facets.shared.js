import {
    withHandlers,
    compose,
    lifecycle,
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

export const withFacetPropTypes = setPropTypes({
    close: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    apply: PropTypes.func.isRequired,
    initial: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
        .isRequired,
    clear: PropTypes.func
});

export const withFacetShared = compose(withFacetPropTypes, withFacetLifecycle);

export const asFacetList = compose(
    withFacetListUpdate,
    withFacetListSave,
    withFacetShared
);

export const priceIntToSymbol = int => '£'.repeat(parseFloat(int), 10);
