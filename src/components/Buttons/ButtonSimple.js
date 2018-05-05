import styled, { css } from 'react-emotion';
import { bs, shevy, colors } from '../../settings/styles';
import { darken } from 'polished';
import { ButtonBase } from './Button.styles';

export default styled('button')(
    ButtonBase,
    {
        ...shevy.h6,
        marginBottom: 0,
        borderRadius: '2px',
        border: `1px solid transparent`,
        backgroundColor: colors.greyLight
    },
    css`
        &:hover {
            background-color: ${darken(0.03, colors.greyLight)};
        }
        &:focus {
            outline: none;
            border: 1px dashed ${darken(0.08, colors.greyLight)};
            background-color: ${darken(0.015, colors.greyLight)};
        }
        &:active {
            background-color: ${darken(0.06, colors.greyLight)};
        }
    `
);
