import React from 'react';
import { css } from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import { readableColor, transparentize, tint } from 'polished';
import { T } from 'ramda';
import { RIEInput } from 'riek';
import PropTypes from 'prop-types';
import {
    shevy,
    colors,
    transitionTimes,
    styles,
    bs,
    isCursor,
    mq
} from '../../settings';
import { notEmpty } from '../../shared';

const validate = required => (required ? notEmpty : T);

const headlineEditing = css({
    border: 0,
    margin: 0,
    outline: 0,
    padding: 0,
    paddingRight: '0 !important',
    width: 'auto',
    boxShadow: 'none',
    display: 'inline-block'
});

const headline = ({ headingStyles, color }) => {
    const singleLineHeight =
        headingStyles.lineHeight *
        parseInt(headingStyles.fontSize.replace('px', ''), 10);

    return css(
        headingStyles,
        mq({
            color,
            position: 'relative',
            cursor: 'pointer',
            border: 0,
            margin: 0,
            outline: 0,
            padding: 0,
            paddingRight: bs(2),
            display: 'inline-block',
            maxWidth: '100%',
            '&::before': {
                content: '"Edit"',
                position: 'absolute',
                right: 0,
                top: singleLineHeight * 0.5,
                fontSize: 10,
                lineHeight: 1,
                backgroundColor: color,
                padding: styles.fn.pad(0.25, 0.25),
                color: readableColor(color),
                opacity: [0, 1],
                transform: ['translateY(-150%)', 'translateY(-50%)'],
                transition: `opacity ${transitionTimes.minimal}ms, transform ${
                    transitionTimes.minimal
                }ms ease-out`,
                willChange: 'opacity, transform'
            },
            [`&:not(.${headlineEditing}):hover`]: {
                color: [transparentize(0.4, color), 'currentColor'],
                '&::before': {
                    opacity: 1,
                    transform: 'translateY(-50%)'
                }
            },
            [`&.${headlineEditing}`]: {
                borderBottom: `1px dashed ${tint(0.3, color)}`,
                '&::selection': {
                    backgroundColor: tint(0.1, color)
                }
            }
        })
    );
};

const EditableHeadline = ({
    value,
    onChange,
    required,
    headingStyles,
    color,
    ...props
}) => (
    <RIEInput
        value={value}
        propName="newValue"
        change={onChange}
        validate={validate(required)}
        className={headline({ headingStyles, color })}
        classEditing={headlineEditing}
        {...props}
    />
);

EditableHeadline.defaultProps = {
    headingStyles: shevy.h3,
    color: colors.black
};

EditableHeadline.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.string,
    headingStyles: PropTypes.object
};

const enhance = onlyUpdateForKeys(['value']);

export default enhance(EditableHeadline);
