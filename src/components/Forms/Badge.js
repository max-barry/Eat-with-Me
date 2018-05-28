import React from 'react';

import { BadgeWrap } from './Badge.styles';
import { colors } from '../../settings/styles';

const Badge = ({
    count,
    color = colors.black,
    backgroundColor = colors.primaryLight,
    style,
    ...props
}) => (
    <BadgeWrap style={{ color, backgroundColor, ...style }} {...props}>
        {count || null}
    </BadgeWrap>
);

export default Badge;
