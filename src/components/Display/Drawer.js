import React, { Fragment } from 'react';
import styled, { css } from 'react-emotion';
import { config, animated, Spring } from 'react-spring';
import PropTypes from 'prop-types';
import { dimensions, fontWeights, bs, colors } from '../../settings';
import { Badge } from '../Buttons';

const size = 56;

const Actions = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.grey2}`,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99
});

const Button = styled('button')(({ icon }) => ({
    border: 0,
    outline: 0,
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    backgroundColor: 'transparent',
    minHeight: size,
    minWidth: size,
    fontWeight: fontWeights.medium,
    lineHeight: 1,
    padding: bs(0.25),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:focus, &:hover': {
        outline: 0,
        backgroundColor: colors.grey1
    },
    img: {
        width: '100%',
        display: 'block',
        maxWidth: dimensions.icon * 0.75,
        maxHeight: dimensions.icon * 0.75
    }
}));

const drawerOverlay = css({
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

const drawerContent = css({
    minHeight: '100%',
    minWidth: '100%'
});

const badgeClass = css({
    position: 'absolute',
    top: bs(0.25),
    right: bs(0.25)
});

const Drawer = ({ items, children, isOpen, ...props }) => (
    <Fragment {...props}>
        <Spring
            native
            from={{ y: 100 }}
            to={{ y: isOpen ? 0 : 100 }}
            config={config.gentle}
        >
            {({ y }) => (
                <animated.div
                    className={drawerOverlay}
                    aria-label="Drawer"
                    tabIndex={-1}
                    style={{
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transform: y.interpolate(
                            y => `translate3d(0%, ${y}%, 0)`
                        )
                    }}
                >
                    <animated.div className={drawerContent}>
                        {children}
                    </animated.div>
                </animated.div>
            )}
        </Spring>
        <Actions>
            {items.map(({ label, icon, onClick }, i) => (
                <Button onClick={onClick} key={`Drawer_Item_${i}`}>
                    <Badge
                        color={colors.secondary}
                        small={true}
                        className={badgeClass}
                    >
                        &nbsp;
                    </Badge>
                    <img src={icon} alt={label} />
                    {label}
                </Button>
            ))}
        </Actions>
    </Fragment>
);

Drawer.defaultProps = {
    isOpen: false
};

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func
        })
    ).isRequired
};

export default Drawer;
