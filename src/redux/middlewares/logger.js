const REGULAR = ['background: blue', 'color: white'].join(';');
const SUCCESS = ['background: green', 'color: white'].join(';');
const STARTED = ['background: darkorange', 'color: white'].join(';');
const FAILURE = ['background: red', 'color: white'].join(';');

const logGroupCollapsed = (...args) => {
    const logFunction =
        typeof console.groupCollapsed === 'function'
            ? console.groupCollapsed
            : console.info;
    logFunction(...args);
};

const logGroupEnd = (...args) => {
    const logFunction =
        typeof console.groupEnd === 'function'
            ? console.groupEnd
            : console.info;
    logFunction(...args);
};

const logInfo = (...args) => {
    console.info(...args);
};

const determineStyle = ({ type, meta, ...action }) => {
    if (!meta || !meta.async) return REGULAR;
    if (type.indexOf('_COMPLETED') > -1) return SUCCESS;
    if (type.indexOf('_FAILED') > -1) return FAILURE;
    return STARTED;
};

const createLogger = (active = true) => store => next => action => {
    if (!active) return next(action);

    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    logGroupCollapsed(`%c ${action.type} `, determineStyle(action));
    logInfo('%cprev state', 'color: darkorange', prevState);
    logInfo('%caction payload', 'color: blue', action.payload);
    logInfo('%cnext state', 'color: darkgreen', nextState);
    logGroupEnd();
    return result;
};

export default createLogger;
