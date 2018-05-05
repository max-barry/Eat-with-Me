import styled from 'react-emotion';
import { dimensions, sFlexed, bs } from '../../settings/styles';

export const NavigationContainer = styled('nav')(sFlexed, {
    minHeight: dimensions.navigation,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: bs(1),
    paddingRight: bs(1)
});

export const NavigationLogoContainer = styled('div')(sFlexed, {
    alignItems: 'center',
    img: {
        width: dimensions.navigation__logo,
        height: dimensions.navigation__logo
    }
});

export const NavigationList = styled('ul')(sFlexed, {
    // paddingLeft: ,
    // paddingright: ,
});

export const NavigationListItem = styled('li')({
    display: 'flex',
    a: {
        paddingLeft: bs(0.5),
        paddingRight: bs(0.5),
        lineHeight: `${dimensions.navigation}px`
    }
});

// export const NavigationItem = styled('li')({
//     display: 'flex',
//     flexDirection: 'row'
// });

// export const MediaElementContainer = styled('div')({
//     display: 'flex',
//     flexDirection: 'row'
// });

// export const MediaElementImage = styled('img')({});

// export const MediaElementBody = styled('div')({
//     marginLeft: '1em',
//     flex: '1'
// });

// export const MediaElementActionList = styled('ul')({
//     display: 'flex'
// });
