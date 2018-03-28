import React, { Component } from 'react';

import { IconWithTextContainer } from './Icon.styles';

export const IconWithText = ({ text, children, ...props }) => (
    <IconWithTextContainer {...props}>
        {children}
        <span>{text}</span>
    </IconWithTextContainer>
);
