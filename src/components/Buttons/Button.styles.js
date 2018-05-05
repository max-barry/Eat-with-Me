import { css } from 'react-emotion';
import {
    bs,
    sInteractive,
    fontFamily,
    fontWeights,
    transitionTimes as time
} from '../../settings/styles';

export const ButtonBase = css(sInteractive, {
    fontFamily,
    fontWeight: fontWeights.medium,
    paddingTop: bs(0.5),
    paddingBottom: bs(0.5),
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5),
    backgroundColor: 'none',
    border: 0,
    transition: `background-color ${time.weak}ms`
});
