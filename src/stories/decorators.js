import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../redux/store';

const store = configureStore();

export const Provider = ({ story }) => (
    <ReduxProvider store={store}>{story}</ReduxProvider>
);

export const withRedux = () => story => <Provider story={story()} />;
