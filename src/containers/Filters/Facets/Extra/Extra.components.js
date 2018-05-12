import React from 'react';
import PropTypes from 'prop-types';
import { ToggleWithLabel } from '../../../../components/Forms';
import {
    onlyUpdateForKeys,
    compose,
    setPropTypes,
    setDisplayName
} from 'recompose';

const enhanceBars = compose(
    setDisplayName('FacetBars'),
    setPropTypes({
        currentRefinement: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }),
    onlyUpdateForKeys(['currentRefinement'])
);

export const FacetBars = enhanceBars(
    ({ currentRefinement: refinements, onChange, ...props }) => (
        <ToggleWithLabel
            name="include-bars"
            onChange={onChange}
            checked={refinements.length > 1}
            title={() => 'Include bars and pubs'}
            tag={() => "We don't include bars and pubs in results by default"}
        />
    )
);
