import styled from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import { tint } from 'polished';
import { colors, dimensions, isCursor } from '../../settings/styles';
import { buttonBaseClass as base } from './Button.styles';

export default onlyUpdateForKeys([])(
    styled('button')(base, ({ color }) => ({
        border: '1px dashed transparent',
        borderRadius: dimensions.borderRadius,
        color: color || colors.black,
        [isCursor]: {
            '&:hover, &:focus': {
                textDecoration: 'underline',
                outline: 'none',
                backgroundColor: color ? tint(0.1, color) : colors.grey1
            },
            '&:active': {
                backgroundColor: color ? tint(0.2, color) : colors.grey2
            }
        }
    }))
);
