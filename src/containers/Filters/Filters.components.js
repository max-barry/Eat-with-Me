import React from 'react';
import { css } from 'emotion';
import { onlyUpdateForKeys } from 'recompose';
import connectRefinementList from 'react-instantsearch/connectors';
import { bs } from '../../settings/styles';
import { ButtonSimple } from '../../components/Buttons';

const filterButtonClass = css(
    { marginLeft: bs(0.25), marginRight: bs(0.25) },
    `&:first-child {margin-left: 0}
    &:last-child  {margin-right: 0}`
);

export const FilterButton = onlyUpdateForKeys([])(
    ({ children, onClick, ...props }) => (
        <li {...props} className={filterButtonClass}>
            <ButtonSimple onClick={onClick}>{children}</ButtonSimple>
        </li>
    )
);

export const VirtualRefinement = connectRefinementList(() => null);
