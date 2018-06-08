import React from 'react';
import styled, { css } from 'react-emotion';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';
import { buttonBaseClass as base } from './Button.styles';
import { bs, colors, isCursor } from '../../settings/styles';
import { SvgFromFile, Svg } from '../SVGs';

const ICON_DIMENSION = 28;
const BUTTON_DIMENSION = 56;

const Button = styled('button')(base, {
    flexDirection: 'column',
    padding: bs(0.25),
    fontSize: 10,
    border: '1px dashed transparent',
    minWidth: BUTTON_DIMENSION,
    minHeight: BUTTON_DIMENSION,
    [isCursor]: {
        [`&:focus`]: {
            outline: 0
        },
        [`&:focus:not(:active)`]: {
            borderColor: colors.greyDark
        }
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
            <SvgFromFile
                path={icon}
                role="presentation"
                color={color}
                className={css({
                    marginBottom: bs(0.25),
                    height: ICON_DIMENSION,
                    width: ICON_DIMENSION
                })}
            />
        )}
        {children}
    </Button>
);

const enhance = compose(
    setPropTypes({
        onClick: PropTypes.func.isRequired,
        path: PropTypes.string,
        icon: PropTypes.string,
        color: PropTypes.string,
        className: PropTypes.string
    })
);

export default enhance(ButtonIcon);
