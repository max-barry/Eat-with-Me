import React from 'react';
import { compose, setPropTypes, defaultProps } from 'recompose';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { darken } from 'polished';
import Ink from 'react-ink';
import {
    ChipDismissibleContainer as Container,
    ChipDismissibleWrap as Wrap,
    ChipDismissibleLabel as Label,
    ChipDismissibleDismissButton as DismissButton,
    ChipDismissibleActionButton as ActionButton
} from './ChipDismissible.styles';
import Svg from '../SVGs';
import { cross } from '../SVGs/paths';
import { colors } from '../../settings/styles';

const ChipDismissible = ({
    backgroundColor,
    color,
    action,
    actionLabel,
    dismiss,
    label,
    ...props
}) => (
    <Container {...props}>
        <Wrap aria-describedby="dismissable-chip-label">
            <ActionButton
                onClick={() => action()}
                className={css(
                    { backgroundColor, color },
                    `&:focus, &:hover { background-color: ${darken(
                        0.02,
                        backgroundColor
                    )}; }
                    &:focus:not(:active) { border-color: ${darken(
                        0.3,
                        backgroundColor
                    )}; }`
                )}
            >
                {actionLabel}
                <Ink duration={500} />
            </ActionButton>
            <DismissButton onClick={() => dismiss()}>
                <Svg
                    fill={colors.greyDark}
                    path={cross}
                    height={11}
                    width={11}
                />
                <Ink duration={500} />
            </DismissButton>
        </Wrap>
        {label && <Label id="dismissable-chip-label">{label}</Label>}
    </Container>
);

const enhance = compose(
    defaultProps({
        backgroundColor: colors.grey1,
        color: colors.greyDark
    }),
    setPropTypes({
        action: PropTypes.func.isRequired,
        actionLabel: PropTypes.string.isRequired,
        dismiss: PropTypes.func.isRequired,
        label: PropTypes.string,
        backgroundColor: PropTypes.string,
        color: PropTypes.string
    })
);

export default enhance(ChipDismissible);
