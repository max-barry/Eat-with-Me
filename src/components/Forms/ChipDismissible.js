import React from 'react';
import { compose, setPropTypes, defaultProps } from 'recompose';
import PropTypes from 'prop-types';
import { css } from 'emotion';
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
    backgroundColorDark,
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
                    `&:focus, &:hover { background-color: ${backgroundColorDark}; }
                    &:focus:not(:active) { border-color: ${color}; }`
                )}
            >
                {actionLabel}
                <Ink duration={500} />
            </ActionButton>
            <DismissButton onClick={() => dismiss()}>
                <Svg fill={colors.greyDark} path={cross} />
                <Ink duration={500} />
            </DismissButton>
        </Wrap>
        {label && <Label id="dismissable-chip-label">{label}</Label>}
    </Container>
);

const enhance = compose(
    defaultProps({
        backgroundColor: colors.secondary,
        backgroundColorDark: colors.secondaryDark,
        color: colors.white
    }),
    setPropTypes({
        action: PropTypes.func.isRequired,
        actionLabel: PropTypes.string.isRequired,
        dismiss: PropTypes.func.isRequired,
        label: PropTypes.string,
        backgroundColor: PropTypes.string,
        backgroundColorDark: PropTypes.string,
        color: PropTypes.string
    })
);

export default enhance(ChipDismissible);
