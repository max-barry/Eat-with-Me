import React from 'react';
import { css } from 'emotion';
import { onlyUpdateForKeys } from 'recompose';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { bs, colors } from '../../settings/styles';
import { ButtonSimple } from '../../components/Buttons';
import { darken } from 'polished';

const filterButtonClass = css(
    { marginLeft: bs(0.25), marginRight: bs(0.25) },
    `&:first-child {margin-left: 0}
    &:last-child  {margin-right: 0}`
);

export const FilterButton = onlyUpdateForKeys(['hasValue'])(
    ({ children, onClick, hasValue, ...props }) => (
        <li {...props} className={filterButtonClass}>
            <ButtonSimple
                onClick={onClick}
                className={
                    hasValue
                        ? css`
                              background-color: ${colors.primary};
                              &:hover, &:focus {background-color: ${darken(
                                  0.03,
                                  colors.primary
                              )}};
                          `
                        : null
                }
            >
                {children}
            </ButtonSimple>
        </li>
    )
);

export const VirtualRefinement = connectRefinementList(() => null);
