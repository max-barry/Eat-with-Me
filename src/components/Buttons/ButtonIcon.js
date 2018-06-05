import React from 'react';
import styled, { cx } from 'react-emotion';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';
import { buttonBaseClass as base } from './Button.styles';
import {
    sFlexed,
    transitionTimes,
    bs,
    colors,
    shevy
} from '../../settings/styles';
import Svg from '../SVGs';
import Ink from 'react-ink';

const ICON_DIMENSION = 32;

const Button = styled('button')(base, {
    flexDirection: 'column',
    padding: bs(0.25),
    fontSize: 10,
    // width: BUTTON_DIMENSION,
    // height: BUTTON_DIMENSION,
    [`&:focus`]: {
        outline: 0
    },
    [`&:focus:not(:active)`]: {
        border: `1px dashed ${colors.greyDark}`
    }
});

const ButtonIcon = ({
    onClick,
    path,
    icon,
    alt,
    color = colors.black,
    children,
    ...props
}) => (
    <Button onClick={onClick} style={{ color }} {...props}>
        {path && (
            <Svg
                role="presentation"
                path={path}
                height={ICON_DIMENSION}
                width={ICON_DIMENSION}
                style={{ marginBottom: bs(0.25) }}
                fill={color}
            />
        )}
        {icon && (
            <img
                alt={alt}
                role="presentation"
                height={ICON_DIMENSION}
                width={ICON_DIMENSION}
                style={{ marginBottom: bs(0.25) }}
                src={icon}
            />
        )}
        <Ink duration={transitionTimes.ink} />
        {children}
    </Button>
);

const enhance = compose(
    setPropTypes({
        onClick: PropTypes.func.isRequired,
        path: PropTypes.string,
        icon: PropTypes.string,
        alt: PropTypes.string,
        color: PropTypes.string,
        className: PropTypes.string
    })
);

export default enhance(ButtonIcon);
