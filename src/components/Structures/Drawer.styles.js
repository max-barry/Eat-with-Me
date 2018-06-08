import { css } from 'react-emotion';
import { colors } from '../../settings/styles';

export const drawerOverlayClass = css({
    position: 'fixed',
    backgroundColor: colors.white,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'auto',
    zIndex: 999,
    willChange: 'transform'
});

export const drawerContentClass = css({
    minHeight: '100%',
    minWidth: '100%'
});
