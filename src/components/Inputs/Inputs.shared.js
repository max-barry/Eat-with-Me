import styled from 'react-emotion';
import { CHAR_SPACE } from '../../shared';
import { mq, dimensions, shevy, colors } from '../../settings';
import { ellipsis } from 'polished';

const onKeyPress = (onChange, result) => ({ charCode: key, ...event }) =>
    CHAR_SPACE.includes(key) ? onChange(result) : null;

export const changeActions = (onChange, output) => ({
    onClick: onChange ? () => onChange(output) : null,
    onKeyPress: onChange ? onKeyPress(onChange, output) : null
});

export const Label = styled('label')(
    mq({
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column'
    })
);

export const LabelTitle = styled('span')(shevy.h6, {
    em: {
        color: colors.greyDark
    }
});

export const LabelTag = styled('span')(shevy.h6, ellipsis(), {
    color: colors.greyDark,
    fontWeight: shevy.content.fontWeight,
    marginTop: -2
});

export const defaultColor = colors.secondary;
