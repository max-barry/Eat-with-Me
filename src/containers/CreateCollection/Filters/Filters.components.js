import React from 'react';
import styled, { css, cx } from 'react-emotion';
import { darken } from 'polished';
import { onlyUpdateForKeys, compose } from 'recompose';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { bs, colors, isCursor } from '../../../settings/styles';
import { ButtonSimple } from '../../../components/Buttons';

const FilterButtonLi = styled('li')(
    css({
        marginLeft: bs(0.25),
        marginRight: bs(0.25),
        '&:first-child': { marginLeft: 0 },
        '&:last-child': { marginRight: 0 }
    })
);

const filterButtonActiveClass = css({
    backgroundColor: colors.primary,
    [isCursor]: {
        '&:hover, &:focus': {
            backgroundColor: darken(0.03, colors.primary)
        }
    }
});

export const FilterButton = onlyUpdateForKeys(['hasValue'])(
    ({ children, onClick, hasValue, ...props }) => (
        <FilterButtonLi {...props}>
            <ButtonSimple
                onClick={onClick}
                className={cx({
                    [filterButtonActiveClass]: hasValue
                })}
            >
                {children}
            </ButtonSimple>
        </FilterButtonLi>
    )
);

export const VirtualRefinement = compose(connectRefinementList)(() => null);

// TODO : Avoid constant rerendering of virtuals by adding a "lastFiltered" and check in a shouldUpdate if lastFiltered matches this virtuals facet
