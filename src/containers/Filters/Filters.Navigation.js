import React from 'react';
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

export const MobileTopActions = ({ closeModal, apply, clear }) => (
    <MobileTopArea>
        <Button disabled={false} icon={trashSvg} onClick={clear}>
            Clear
        </Button>
        <MobileTopTitle>Thingy</MobileTopTitle>
        <Button color={colors.black} recessive={true} onClick={closeModal}>
            Close
        </Button>
    </MobileTopArea>
);

export const MobileBottomActions = ({ apply }) => (
    <MobileBottomArea>
        <Button color={colors.primary} onClick={apply} fullWidth={true}>
            Apply
        </Button>
    </MobileBottomArea>
);
