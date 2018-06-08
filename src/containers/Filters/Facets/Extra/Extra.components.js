import React from 'react';
import PropTypes from 'prop-types';
import { ToggleWithLabel } from '../../../../components/Forms';

const facetBars = ({ refinement, update, ...props }) => (
    <ToggleWithLabel
        name="include-bars"
        onChange={update}
        checked={refinement.length > 1}
        title="Include bars and pubs"
        tag="We don't include bars and pubs in results by default"
    />
);

facetBars.displayName = 'FacetBars';

facetBars.propTypes = {
    update: PropTypes.func.isRequired
};

export const FacetBars = facetBars;
