import React from 'react';
import { css } from 'react-emotion';
import { setPropTypes, compose, setDisplayName } from 'recompose';
import PropTypes from 'prop-types';
import { colors } from '../../../settings/styles';
import { ButtonLink, ButtonSimpleIcon } from '../../../components/Buttons';
import {
    FacetActionsList as List,
    FacetActionsListItem as ListItem
} from './Facets.styles';
import { cross } from '../../../components/SVGs/paths';

const enhanceFacetActions = compose(
    setDisplayName('FacetActions'),
    setPropTypes({
        apply: PropTypes.func.isRequired,
        cancel: PropTypes.func.isRequired,
        clear: PropTypes.func
    })
);

// TODO : Add a reset button

export const FacetActions = enhanceFacetActions(({ apply, cancel, clear }) => (
    <List>
        {clear && (
            <ListItem>
                <ButtonSimpleIcon onClick={() => clear()} icon={cross}>
                    Clear all
                </ButtonSimpleIcon>
            </ListItem>
        )}
        <ListItem>
            <ButtonLink onClick={() => cancel()}>Cancel</ButtonLink>
        </ListItem>
        <ListItem>
            <ButtonLink
                onClick={() => apply()}
                className={css({ color: colors.primaryDark })}
            >
                Apply
            </ButtonLink>
        </ListItem>
    </List>
));
