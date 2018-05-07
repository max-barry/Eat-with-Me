import styled from 'react-emotion';
import { dimensions, sFlexed, bs, colors } from '../../settings/styles';

export const FiltersContainer = styled('nav')(sFlexed, {
    minHeight: dimensions.filtersBar,
    maxWidth: dimensions.container,
    alignItems: 'center',
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5)
});

export const FiltersModalStyles = props => {
    return {
        overlay: {
            position: 'absolute',
            // top: props.offsetTop(),
            top: props.top,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        },
        content: {
            position: 'absolute',
            top: 0,
            left: props.left,
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
