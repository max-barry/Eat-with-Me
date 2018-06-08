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

export const withListProcess = withHandlers({
    process: ({ items }) => _ =>
        items.filter(prop('isRefined')).map(prop('label'))
});

export const withListUpdate = withStateHandlers(
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
    initial: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
});

export const withShared = compose(withFacetPropTypes, withFacetLifecycle);

export const asFacetList = compose(withListUpdate, withListProcess, withShared);

export const priceIntToSymbol = int => '£'.repeat(parseFloat(int), 10);
