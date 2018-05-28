import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { css, cx } from 'emotion';
import {
    checkboxBoxWrapClass as boxWrapClass,
    checkboxTitleClass as titleClass,
    checkboxTagClass as tagClass,
    CheckboxContainer as Container,
    CheckboxLabel as Label,
    checkboxCheckedClass as checkedClass,
    checkboxBoxInnerClass as boxInnerClass
} from './Checkbox.styles';
import { tick as svgtick } from '../SVGs/paths';
import { requiredPropTypes, withAriaProps } from './Forms.shared';

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
            // ref={this.checkboxRef}
            {...aria}
            className={cx(boxWrapClass, checked ? checkedClass : null)}
        >
            <span className={css(boxInnerClass)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path
                        fill={checked ? 'white' : 'black'}
                        fillRule="evenodd"
                        d={svgtick}
                    />
                </svg>
            </span>
        </span>
        <Label {...ariaLabel}>
            <span className={titleClass}>
                {typeof TitleComponent === 'string' ? (
                    TitleComponent
                ) : (
                    <TitleComponent />
                )}
            </span>
            {TagComponent && (
                <span className={tagClass}>
                    {typeof TagComponent === 'string' ? (
                        TagComponent
                    ) : (
                        <TagComponent />
                    )}
                </span>
            )}
        </Label>
    </Container>
);

const enhance = compose(
    setPropTypes({
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
            .isRequired,
        tag: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        ...requiredPropTypes
    }),
    withAriaProps(true)
);

export default enhance(Checkbox);
