import styled from 'react-emotion';
import { dimensions, sFlexed, bs } from '../../settings/styles';

export const MastContainer = styled('nav')(sFlexed, {
    minHeight: dimensions.mast,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: bs(1),
    paddingRight: bs(1)
});

export const MastLogoContainer = styled('div')(sFlexed, {
    alignItems: 'center',
    img: {
        width: dimensions.mastLogo,
        height: dimensions.mastLogo
    }
});

export const MastList = styled('ul')(sFlexed, {});

export const MastListItem = styled('li')({
    display: 'flex',
    a: {
        paddingLeft: bs(0.5),
        paddingRight: bs(0.5),
        lineHeight: `${dimensions.mast}px`
    }
});
