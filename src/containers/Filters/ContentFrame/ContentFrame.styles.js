import styled from 'react-emotion';
import {
    mq,
    shevy,
    colors,
    fontWeights,
    bs,
    dimensions
} from '../../../settings/styles';

export const ContentFrameExterior = styled('div')(
    mq({
        minHeight: [0, '100vh']
    })
);

export const ContentFrameInterior = styled('div')(
    mq({
        padding: [0, `${bs(0.5)} 0`],
        overflow: 'auto',
        maxHeight: [
            'none',
            `calc(100vh - ${bs(0.5 * 2)} - ${dimensions.button}px)`
        ]
    })
);

export const ActionsList = styled('ul')(shevy.h6, ({ fixed }) =>
    mq({
        display: 'flex',
        backgroundColor: colors.white,
        justifyContent: ['flex-end', 'space-between'],
        alignItems: 'center',
        marginLeft: ['auto', 0],
        padding: [`${bs(0.75)} 0 0 0`, bs(0.5)],
        borderTop: `1px solid ${colors.grey2}`,
        borderBottom: [0, `1px solid ${colors.grey2}`],
        marginBottom: 0,
        position: fixed ? 'fixed' : 'relative',
        zIndex: 1,
        bottom: fixed ? 0 : 'auto',
        left: fixed ? 0 : 'auto',
        right: fixed ? 0 : 'auto'
    })
);

export const ActionsListItem = styled('li')(
    mq({
        display: 'inline-block',
        color: colors.greyDark,
        fontWeight: fontWeights.medium,
        position: 'relative',
        '&:not(:last-child)': {
            marginRight: [bs(2), 0]
        }
    })
);
