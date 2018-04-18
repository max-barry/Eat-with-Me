export const setOrder = orderParam => [
    orderParam.startsWith('-') ? orderParam.substring(1) : orderParam,
    orderParam.startsWith('-') ? 'desc' : 'asc'
];
