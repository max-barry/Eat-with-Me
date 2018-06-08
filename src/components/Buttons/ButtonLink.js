import styled from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import { bs, shevy, colors, dimensions } from '../../settings/styles';
import { buttonBaseClass as base } from './Button.styles';
import { isCursor } from '../../settings/styles';

export default onlyUpdateForKeys([])(
    styled('button')(base, {
        ...shevy.h6,
        marginBottom: 0,
        padding: `${bs(0.25)} ${bs(0.5)}`,
        textDecoration: 'none',
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
