import styled, { css } from 'react-emotion';
import { colors, bs, dimensions } from '../../settings/styles';

export const loadingBasics = ({ dominant, margin, width = '100%' }) =>
    css({
        width,
        display: 'block',
        backgroundColor: dominant ? colors.grey2 : colors.grey1,
        marginBottom: bs(margin)
    });

export const LoadingHeading = styled('span')(props => loadingBasics(props), {
    '&::before': { content: '"x"', color: 'transparent' }
});

export const LoadingButton = styled('span')(props => loadingBasics(props), {
    height: dimensions.button,
    width: dimensions.button * 2
});

export const LoadingImage = styled('span')(
    props => loadingBasics(props),
    ({ height = 200 }) => ({
        height,
        borderRadius: dimensions.borderRadius
    })
);
