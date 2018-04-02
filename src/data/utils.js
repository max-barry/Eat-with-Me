import { branch, renderComponent } from 'recompose';

export const loadWaitingForData = (query, loader) =>
    branch(
        props => !props[query] || (props[query] && props[query].loading),
        renderComponent(loader)
    );
