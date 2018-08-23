import React from 'react';
import PropTypes from 'prop-types';
import {
    ActionsList,
    MobileTopArea,
    MobileTopTitle,
    MobileBottomArea,
    Controls
} from './Filters.styles';
import { ButtonSimple as Button } from '../../components/Buttons';
import trashSvg from '../../../public/images/icons/trash.svg';
import { colors } from '../../settings';
import { desktopNavigation, checkIfHasValue } from './Filters.shared';

export const DesktopModalActions = ({ closeModal, apply, clear }) => (
    <ActionsList>
        <Button disabled={false} icon={trashSvg} onClick={clear}>
            Clear
        </Button>
        <Button color={colors.black} recessive={true} onClick={closeModal}>
            Close
        </Button>
        <Button color={colors.primary} recessive={true} onClick={apply}>
            Apply
        </Button>
    </ActionsList>
);

export const DesktopActions = ({ openModal, applied }) => (
    <Controls>
        {desktopNavigation.map(([label, attrs], i) => (
            <Button
                key={`Desktop_Nav_${i}`}
                onClick={e => openModal(e, attrs)}
                color={
                    checkIfHasValue(attrs, applied)
                        ? colors.secondary
                        : undefined
                }
            >
                {label}
            </Button>
        ))}
    </Controls>
);

export const MobileTopActions = ({ closeModal, clear, title }) => (
    <MobileTopArea>
        {clear && (
            <Button disabled={false} icon={trashSvg} onClick={clear}>
                Clear
            </Button>
        )}
        <MobileTopTitle>{title}</MobileTopTitle>
        {closeModal && (
            <Button color={colors.black} recessive={true} onClick={closeModal}>
                Close
            </Button>
        )}
    </MobileTopArea>
);

MobileTopActions.defaultProps = {
    title: 'Thingy'
};

MobileTopActions.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    closeModal: PropTypes.func,
    clear: PropTypes.func
};

export const MobileBottomActions = ({ apply }) => (
    <MobileBottomArea>
        <Button color={colors.primary} onClick={apply} fullWidth={true}>
            Apply
        </Button>
    </MobileBottomArea>
);
