import React from 'react';
import { css } from 'emotion';
import { onlyUpdateForKeys, compose } from 'recompose';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { bs, colors } from '../../settings/styles';
import { ButtonSimple } from '../../components/Buttons';
import { darken } from 'polished';
import { withPropsChecker } from '../../hocs/Debug/debug';

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

export const VirtualRefinement = compose(
    connectRefinementList
    // onlyUpdateForKeys(['currentRefinement', 'items', 'canRefine'])
    // withPropsChecker
)(() => null);

// TODO : Avoid constant rerendering of virtuals by adding a "lastFiltered" and check in a shouldUpdate if lastFiltered matches this virtuals facet
