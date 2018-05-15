import styled, { css } from 'react-emotion';
import { bs, shevy, colors, dimensions } from '../../settings/styles';
import { darken } from 'polished';
import { ButtonBase } from './Button.styles';

export default styled('button')(
    ButtonBase,
    {
        ...shevy.h6,
        marginBottom: 0,
        padding: `${bs(0.25)} ${bs(0.5)}`,
        textDecoration: 'none',
        border: '1px dashed transparent',
        borderRadius: dimensions.borderRadius
    },
    css`
        &:hover {
            text-decoration: underline;
            background-color: ${colors.grey1};
        }
        &:focus {
            outline: none;
            background-color: ${colors.grey1};
        }
        &:active {
            background-color: ${colors.grey2};
        }
    `
);
