import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../../redux/store';

const store = configureStore();

export default ({ story }) => (
    <ReduxProvider store={store}>{story}</ReduxProvider>
);
