import React from 'react';

const Svg = ({ path, height = 16, width = 16, fill = 'inherit', ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        height={height}
        width={width}
    >
        <path fill={fill} fillRule="evenodd" d={path} />
    </svg>
);

export default Svg;
