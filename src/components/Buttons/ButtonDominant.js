import styled from 'react-emotion';
import { onlyUpdateForKeys } from 'recompose';
import { shade, readableColor } from 'polished';
import { buttonBaseClass as base } from './Button.styles';
import { dimensions, colors, isCursor, mq } from '../../settings/styles';

export default onlyUpdateForKeys([])(
    styled('button')(base, ({ color = colors.primary }) =>
        mq({
            border: `1px solid ${shade(0.98, color)}`,
            // display: 'block',
            width: ['auto', '100%'],
            borderRadius: dimensions.borderRadius,
            color: readableColor(color),
            backgroundColor: color,
            // boxShadow: '0 0 1px rgba(0, 0, 0, 0.19) inset',
            [isCursor]: {
                '&:hover, &:focus': {
                    outline: 'none',
                    backgroundColor: shade(0.97, color)
                },
                '&:focus:not(:active)': {
                    borderColor: shade(0.94, color)
                },
                '&:active': {
                    backgroundColor: shade(0.94, color)
                }
            }
        })
    )
);
