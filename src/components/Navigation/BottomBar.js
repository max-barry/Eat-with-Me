import React from 'react';
import PropTypes from 'prop-types';
import {
    BottomBarList as List,
    BottomBarInterior as Interior
} from './BottomBar.styles';
import { ButtonIcon } from '../Buttons';

const BottomBar = ({ items, ...props }) => (
    <List {...props}>
        <Interior>
            {items.map(({ label, icon, onClick, ...props }, key) => (
                <ButtonIcon
                    icon={icon}
                    onClick={onClick}
                    key={`bottom_bar_item_${key}`}
                >
                    {label}
                </ButtonIcon>
            ))}
        </Interior>
    </List>
);

BottomBar.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired
        })
    ).isRequired
};

export default BottomBar;
