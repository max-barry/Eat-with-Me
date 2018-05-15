import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered';

const reqComponents = require.context('../components', true, /\.stories\.js$/);
const reqContainers = require.context('../containers', true, /\.stories\.js$/);

const loadStories = () => {
    reqComponents.keys().forEach(filename => reqComponents(filename));
    reqContainers.keys().forEach(filename => reqContainers(filename));
};

addDecorator(checkA11y);
addDecorator(centered);

configure(loadStories, module);
