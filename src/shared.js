import { onlyUpdateForKeys } from 'recompose';
import { curry, ap, __, path } from 'ramda';

export const safeId = s => s.replace(/^[^a-z]+|[^\w:.-]+/gi, '');

export const distributeArray = (items, k) => {
    const subs = Array.apply(null, { length: k }).map(() => []);
    items.forEach((item, i) => subs[i % k].push(items[i]));
    return subs;
};

export const blankArr = (n = 9) => {
    const arr = [];
    arr.length = n;
    arr.fill(null);
    return arr;
};

export const startAnimation = callback => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            callback();
        });
    });
};

export const calcWindowWidth = () =>
    Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );

export const paths = curry((ps, obj) => ap([path(__, obj)], ps));
