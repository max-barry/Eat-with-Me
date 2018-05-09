import React from 'react';
import { css } from 'react-emotion';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';
import { colors } from '../../../settings/styles';
import ButtonLink from '../../../components/Buttons/ButtonLink';
import { ActionsList, ActionsListItem } from './shared.styles';

const ActionsComponent = ({
    applyLabel = 'Apply',
    cancelLabel = 'Cancel',
    applyAction,
    cancelAction
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
);

const enhance = compose(
    setPropTypes({
        applyLabel: PropTypes.string,
        applyAction: PropTypes.func.isRequired,
        cancelLabel: PropTypes.string,
        cancelAction: PropTypes.func.isRequired
    })
);

export const Actions = enhance(ActionsComponent);
