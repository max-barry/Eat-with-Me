import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

// if (process.env.NODE_ENV !== 'production') {
//     const { whyDidYouUpdate } = require('why-did-you-update');
//     whyDidYouUpdate(React, { exclude: [/^StoryState/] });
// }

const reqComponents = require.context('../components', true, /\.stories\.js$/);
const reqContainers = require.context('../containers', true, /\.stories\.js$/);

const loadStories = () => {
    reqComponents.keys().forEach(filename => reqComponents(filename));
    reqContainers.keys().forEach(filename => reqContainers(filename));
};

addDecorator(checkA11y);

configure(loadStories, module);
