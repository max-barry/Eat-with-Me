import React from 'react';
import { css } from 'react-emotion';
import { setPropTypes, compose, setDisplayName } from 'recompose';
import PropTypes from 'prop-types';
import { colors } from '../../../settings/styles';
import ButtonLink from '../../../components/Buttons/ButtonLink';
import {
    FacetActionsList as List,
    FacetActionsListItem as ListItem
} from './Facets.styles';

const enhanceFacetActions = compose(
    setDisplayName('FacetActions'),
    setPropTypes({
        applyAction: PropTypes.func.isRequired,
        cancelAction: PropTypes.func.isRequired,
        applyLabel: PropTypes.string,
        cancelLabel: PropTypes.string
    })
);

// TODO : Add a reset button

export const FacetActions = enhanceFacetActions(
    ({
        applyAction,
        cancelAction,
        applyLabel = 'Apply',
        cancelLabel = 'Cancel'
    }) => (
        <List>
            <ListItem>
                <ButtonLink onClick={cancelAction}>{cancelLabel}</ButtonLink>
            </ListItem>
            <ListItem>
                <ButtonLink
                    onClick={applyAction}
                    className={css({ color: colors.primaryDark })}
                >
                    {applyLabel}
                </ButtonLink>
            </ListItem>
        </List>
    )
);
