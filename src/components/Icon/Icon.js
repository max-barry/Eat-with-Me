import React from 'react';

import { pure, compose } from 'recompose';

import { IconWithTextContainer } from './Icon.styles';

const enhance = compose(pure);

export const IconWithText = enhance(({ text, children, ...props }) => (
    <IconWithTextContainer {...props}>
        {children}
        <span>{text}</span>
    </IconWithTextContainer>
));
