import React from 'react';
import { css } from 'react-emotion';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';
import { colors } from '../../../settings/styles';
import ButtonLink from '../../../components/Buttons/ButtonLink';
import {
    FacetActionsList as ActionsList,
    FacetActionsListItem as ActionsListItem
} from './shared.styles';

const enhanceFacetActions = compose(
    setPropTypes({
        applyAction: PropTypes.func.isRequired,
        cancelAction: PropTypes.func.isRequired,
        applyLabel: PropTypes.string,
        cancelLabel: PropTypes.string
    })
);

export const FacetActions = enhanceFacetActions(
    ({
        applyAction,
        cancelAction,
        applyLabel = 'Apply',
        cancelLabel = 'Cancel'
    }) => (
        <ActionsList>
            <ActionsListItem>
                <ButtonLink onClick={cancelAction}>{cancelLabel}</ButtonLink>
            </ActionsListItem>
            <ActionsListItem>
                <ButtonLink
                    onClick={applyAction}
                    className={css({ color: colors.accent })}
                >
                    {applyLabel}
                </ButtonLink>
            </ActionsListItem>
        </ActionsList>
    )
);
