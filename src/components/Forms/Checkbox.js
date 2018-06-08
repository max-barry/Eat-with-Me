import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys } from 'recompose';
import { cx } from 'emotion';
import {
    checkboxBoxWrapClass as boxWrapClass,
    CheckboxTitle,
    CheckboxTag as Tag,
    CheckboxContainer as Container,
    CheckboxLabel as Label,
    checkboxCheckedClass as checkedClass,
    CheckboxBoxInner as BoxInner
} from './Checkbox.styles';
import { tick as svgtick } from '../SVGs/paths';
import { requiredPropTypes, withAriaProps } from './Forms.shared';
import { Svg } from '../SVGs';

const Checkbox = ({
    checked,
    title: TitleComponent,
    tag: TagComponent,
    aria,
    ariaLabel,
    ...props
}) => (
    <Container>
        <span
            {...aria}
            className={cx(boxWrapClass, { [checkedClass]: checked })}
        >
            <BoxInner>
                <Svg fill={checked ? 'white' : 'black'} path={svgtick} />
            </BoxInner>
        </span>
        <Label {...ariaLabel}>
            <CheckboxTitle>{TitleComponent}</CheckboxTitle>
            <Tag>{TagComponent}</Tag>
        </Label>
    </Container>
);

Checkbox.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    ...requiredPropTypes
};

const enhance = compose(onlyUpdateForKeys(['checked']), withAriaProps(true));

export default enhance(Checkbox);
