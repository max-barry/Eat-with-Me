import React from 'react';
import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import {
    ContentFrameExterior as Exterior,
    ContentFrameInterior as Interior,
    ActionsList as List,
    ActionsListItem as ListItem
} from './ContentFrame.styles.js';
import {
    ButtonLink,
    ButtonSimpleIcon
} from '../../../components/Buttons/index.js';
import { cross } from '../../../components/SVGs/paths.js';
import { colors } from '../../../settings/styles.js';

const enhanceActions = compose(
    setPropTypes({
        apply: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        clear: PropTypes.func
    })
);

const Actions = enhanceActions(({ apply, close, clear }) => (
    <List>
        {clear && (
            <ListItem>
                <ButtonSimpleIcon onClick={clear} icon={cross}>
                    Clear all
                </ButtonSimpleIcon>
            </ListItem>
        )}
        <ListItem>
            <ButtonLink onClick={close}>Cancel</ButtonLink>
        </ListItem>
        <ListItem>
            <ButtonLink onClick={apply} color={colors.primaryDark}>
                Apply
            </ButtonLink>
        </ListItem>
    </List>
));

const ContentFrame = ({ children, apply, close, clear, ...props }) => (
    <Exterior>
        <Interior>{children}</Interior>
        <Actions apply={apply} close={close} clear={clear} />
    </Exterior>
);

const enhance = compose(
    setPropTypes({
        apply: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        clear: PropTypes.func.isRequired
    })
);

export default enhance(ContentFrame);
