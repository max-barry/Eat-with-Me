import React from 'react';
import { cx } from 'react-emotion';
import PropTypes from 'prop-types';
import { bs } from '../../settings/styles';
import { buttonSimpleClass } from './Button.styles';
import { SvgMorph, SvgFromFile } from '../SVGs';

const ButtonSimple = ({ children, className, ...props }) => (
    <button className={cx(buttonSimpleClass, className)} {...props}>
        {children}
    </button>
);

ButtonSimple.propTypes = { onClick: PropTypes.func.isRequired };

export default ButtonSimple;

const buttonSimpleIcon = ({ icon, children, fill, ...props }) => (
    <ButtonSimple {...props}>
        <SvgFromFile
            aria-hidden={true}
            path={icon}
            fill={fill}
            style={{ marginRight: bs(0.25) }}
        />
        {children}
    </ButtonSimple>
);

buttonSimpleIcon.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
};

export const ButtonSimpleIcon = buttonSimpleIcon;

const buttonSimpleIconMorph = ({ icon, children, fill, ...props }) => (
    <ButtonSimple {...props}>
        <SvgMorph
            aria-hidden={true}
            path={icon}
            fill={fill}
            style={{ marginRight: bs(0.25) }}
        />
        {children}
    </ButtonSimple>
);

buttonSimpleIconMorph.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
};

export const ButtonSimpleIconMorph = buttonSimpleIconMorph;
