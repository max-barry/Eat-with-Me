import {
    withHandlers,
    compose,
    lifecycle,
    withPropsOnChange,
    setPropTypes
} from 'recompose';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';

export const withFacetLifecycle = lifecycle({
    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }
});
export const withFacetSave = withHandlers({
    save: props => (force = false) =>
        props.updateVirtuals(props.currentRefinement, !force)
});

export const withFacetUpdate = withHandlers({
    update: props => value => props.refine(value)
});

export const withFacetPropTypes = setPropTypes({
    onRequestClose: PropTypes.func.isRequired,
    defaultRefinement: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
        .isRequired,
    updateVirtuals: PropTypes.func.isRequired
});

export const withFacetAll = compose(
    withFacetSave,
    withFacetUpdate,
    withFacetLifecycle,
    withFacetPropTypes
);

export const withItemsOrdered = (
    attributes,
    direction,
    postprocess = items => items
) =>
    withPropsOnChange(['items'], props => ({
        items: postprocess(orderBy(props.items, attributes, direction))
    }));

export const withPanelledUpdate = withHandlers({
    update: ({ items, onChange }) => (panelLabel, itemLabel) => {
        // Find the value associated with this label
        // (kind of assumes all labels and panel names are unique)
        const panel = items.find(({ name }) => name === panelLabel);
        const item = panel.items.find(({ label }) => label === itemLabel);
        onChange(item.value);
    }
});

export const priceIntToSymbol = int => '£'.repeat(parseFloat(int), 10);
