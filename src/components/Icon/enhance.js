import PropTypes from 'prop-types';
import {
    compose,
    setPropTypes,
    onlyUpdateForKeys,
    defaultProps
} from 'recompose';

const propCheck = setPropTypes({
    active: PropTypes.bool.isRequired,
    initial: PropTypes.bool
});

const defaults = defaultProps({ initial: false, active: false });

const reRenderOn = onlyUpdateForKeys(['active']);

export default compose(defaults, propCheck, reRenderOn);
