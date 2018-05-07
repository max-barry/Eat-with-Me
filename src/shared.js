import { onlyUpdateForKeys } from 'recompose';

export const safeId = s => s.replace(/^[^a-z]+|[^\w:.-]+/gi, '');

export const unchange = onlyUpdateForKeys([]);
