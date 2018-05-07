import { configure } from '@storybook/react';
// import '../index.styles';

const reqComponents = require.context('../components', true, /\.stories\.js$/);
const reqContainers = require.context('../containers', true, /\.stories\.js$/);

const loadStories = () => {
    reqComponents.keys().forEach(filename => reqComponents(filename));
    reqContainers.keys().forEach(filename => reqContainers(filename));
};

configure(loadStories, module);
