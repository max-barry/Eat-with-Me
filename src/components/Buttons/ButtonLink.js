import styled from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import { colors, dimensions } from '../../settings/styles';
import { buttonBaseClass as base } from './Button.styles';
import { isCursor } from '../../settings/styles';

export default onlyUpdateForKeys([])(
    styled('button')(base, {
        border: '1px dashed transparent',
        borderRadius: dimensions.borderRadius,
        [isCursor]: {
            '&:hover': {
                textDecoration: 'underline',
                backgroundColor: colors.grey1
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: colors.grey1
            },
            '&:active': {
                backgroundColor: colors.grey2
            }
        }
    })
);
