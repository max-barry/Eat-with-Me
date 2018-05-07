import React from 'react';
import styled, { css } from 'react-emotion';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';
import { shevy, colors, fontWeights, bs } from '../../../settings/styles';
import ButtonLink from '../../../components/Buttons/ButtonLink';

const SharedActionsList = styled('ul')(shevy.h6, {
    display: 'block',
    textAlign: 'right',
    // justifyContent: 'space-between',
    // maxWidth: dimensions.filtersComponentMinWidth * 0.5,
    marginLeft: 'auto',
    paddingTop: bs(0.75),
    borderTop: `1px solid ${colors.greyMid}`,
    marginBottom: 0
});

const SharedActionsListItem = styled('li')(
    {
        display: 'inline-block',
        color: colors.greyText,
        fontWeight: fontWeights.medium
    },
    `
    &:first-child {margin-right: ${bs(2)};}
    `
);

const FilterSharedActions = ({
    applyLabel = 'Apply',
    cancelLabel = 'Cancel',
    applyAction,
    cancelAction
}) => (
    <SharedActionsList>
        <SharedActionsListItem>
            <ButtonLink onClick={cancelAction}>{cancelLabel}</ButtonLink>
        </SharedActionsListItem>
        <SharedActionsListItem>
            <ButtonLink
                onClick={applyAction}
                className={css({ color: colors.accent })}
            >
                {applyLabel}
            </ButtonLink>
        </SharedActionsListItem>
    </SharedActionsList>
);

const enhance = compose(
    setPropTypes({
        applyLabel: PropTypes.string,
        applyAction: PropTypes.func.isRequired,
        cancelLabel: PropTypes.string,
        cancelAction: PropTypes.func.isRequired
    })
);

export default enhance(FilterSharedActions);
