import styled from 'react-emotion';
import { dimensions, sFlexed, bs, colors } from '../../settings/styles';

export const FiltersContainer = styled('nav')(sFlexed, {
    minHeight: dimensions.filtersBar,
    maxWidth: dimensions.container,
    alignItems: 'center',
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5)
});

export const FiltersModalSimple = ({ top, left }) => {
    return {
        overlay: {
            top,
            position: 'absolute',
            // top: props.offsetTop(),
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        },
        content: {
            left,
            position: 'absolute',
            top: 0,
            right: 'auto',
            bottom: 'auto',
            minWidth: dimensions.filtersComponentMinWidth,
            border: `1px solid ${colors.greyBorder}`,
            background: 'white',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: dimensions.borderRadius,
            outline: 'none',
            padding: bs()
        }
    };
};

export const FiltersModalAdvanced = ({ top, left }) => {
    return {
        overlay: {
            top,
            position: 'absolute',
            // top: props.offsetTop(),
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            backgroundColor: 'transparent'
        },
        content: {
            top,
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            minWidth: dimensions.filtersComponentMinWidth,
            border: 0,
            background: 'transparent',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: dimensions.borderRadius,
            outline: 'none',
            padding: bs()
        }
    };
};
