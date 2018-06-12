import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { buttonBaseClass as base } from './Button.styles';
import { bs, colors, isCursor, dimensions } from '../../settings/styles';
import { SvgFromFile, Svg } from '../SVGs';

const ICON_DIMENSION = 28;
const BUTTON_DIMENSION = 56;

// const hasValueClass = css({
//     '&::before':
// });

// ({ hasValue }) => (hasValue ? hasValueClass : null),

const Button = styled('button')(
    base,
    ({ hasValue, badgeColor, color = colors.primary }) => ({
        flexDirection: 'column',
        padding: bs(0.25),
        fontSize: 10,
        position: 'relative',
        border: '1px dashed transparent',
        minWidth: BUTTON_DIMENSION,
        minHeight: BUTTON_DIMENSION,
        zIndex: 0,
        '&::before': {
            zIndex: 1,
            top: dimensions.badge * 0.25,
            right: dimensions.badge * 0.25,
            borderRadius: '50%',
            position: 'absolute',
            content: '""',
            display: hasValue ? 'block' : 'none',
            width: dimensions.badge * 0.5,
            height: dimensions.badge * 0.5,
            backgroundColor: badgeColor || color
        },
        [isCursor]: {
            [`&:focus`]: {
                outline: 0
            },
            [`&:focus:not(:active)`]: {
                borderColor: colors.greyDark
            }
        }
    })
);

const ButtonIcon = ({
    onClick,
    path,
    icon,
    alt,
    hasValue,
    color = colors.black,
    children,
    ...props
}) => (
    <Button
        onClick={onClick}
        style={{ color }}
        hasValue={hasValue}
        color={color}
        {...props}
    >
        {path && (
            <Svg
                role="presentation"
                path={path}
                height={ICON_DIMENSION}
                width={ICON_DIMENSION}
                fill={color}
                style={{ marginBottom: bs(0.25) }}
            />
        )}
        {icon && (
            <SvgFromFile
                path={icon}
                role="presentation"
                fill={color}
                svgClassName={css({
                    marginBottom: bs(0.25),
                    height: ICON_DIMENSION,
                    width: ICON_DIMENSION
                })}
            />
        )}
        {children}
    </Button>
);

ButtonIcon.propTypes = {
    onClick: PropTypes.func.isRequired,
    path: PropTypes.string,
    icon: PropTypes.string,
    hasValue: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string
};

export default ButtonIcon;
