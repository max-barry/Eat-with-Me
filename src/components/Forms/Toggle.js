import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import { transparentize } from 'polished';
import {
    ToggleLabel,
    ToggleLabelText,
    ToggleTitle,
    ToggleTag
} from './Toggle.styles';
import { requiredPropTypes } from './Forms.shared';
import { colors, sFlexedCenter } from '../../settings/styles';
import { SvgFromFile } from '../SVGs';
import multipleSvg from '../SVGs/images/flaticons/multiply.svg';
import successSvg from '../SVGs/images/flaticons/success-1.svg';

const iconProperties = {
    fill: colors.white,
    className: css(sFlexedCenter, {
        height: '100%',
        '> div': { display: 'flex' }
    }),
    svgStyle: {
        height: 16,
        width: 16
    }
};

const UncheckedIcon = () => (
    <SvgFromFile {...iconProperties} path={multipleSvg} />
);

const CheckedIcon = () => <SvgFromFile {...iconProperties} path={successSvg} />;

// TODO : Make this totally controlled by the parent

const Toggle = ({ checked, onChange, name }) => (
    <Switch
        // className={toggleSwitchClass}
        checked={checked}
        onChange={onChange}
        id={name}
        offColor={colors.greyDark}
        onColor={colors.secondary}
        uncheckedIcon={<UncheckedIcon />}
        checkedIcon={<CheckedIcon />}
        activeBoxShadow={`0px 0px 2px 3px ${transparentize(0.7, colors.black)}`}
    />
);

Toggle.propTypes = requiredPropTypes;

export default onlyUpdateForKeys(['checked'])(Toggle);

const toggleWithLabel = ({
    title: TitleComponent,
    tag: TagComponent,
    ...props
}) => (
    <ToggleLabel for={props.id}>
        <ToggleLabelText>
            <ToggleTitle>
                {typeof TitleComponent === 'string' ? (
                    TitleComponent
                ) : (
                    <TitleComponent />
                )}
            </ToggleTitle>
            {TagComponent && (
                <ToggleTag>
                    {typeof TagComponent === 'string' ? (
                        TagComponent
                    ) : (
                        <TagComponent />
                    )}
                </ToggleTag>
            )}
        </ToggleLabelText>
        <Toggle {...props} />
    </ToggleLabel>
);

toggleWithLabel.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string
    ]).isRequired,
    tag: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string
    ]),
    ...requiredPropTypes
};

export const ToggleWithLabel = onlyUpdateForKeys(['checked'])(toggleWithLabel);
