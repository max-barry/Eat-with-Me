import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { darken } from 'polished';
import { setPropTypes, compose } from 'recompose';
import PropTypes from 'prop-types';
import {
    BigSearchInput as Input,
    BigSearchContainer as Container
} from './BigSearch.styles';
import { colors } from '../../settings/styles';

const themes = {
    default: {
        background: colors.offWhite,
        darkerColor: darken(0.45, colors.offWhite),
        focusBorderColor: colors.secondary
    },
    primary: {
        background: colors.primary,
        darkerColor: darken(0.3, colors.primary),
        focusBorderColor: 'white'
    }
};

const BigSearch = ({
    theme = 'default',
    placeholder = 'Enter your text',
    ...props
}) => {
    return (
        <ThemeProvider theme={themes[theme]}>
            <Container>
                <div>
                    <Input
                        type={props.type || 'text'}
                        placeholder={placeholder}
                    />
                </div>
            </Container>
        </ThemeProvider>
    );
};

const enhance = compose(
    setPropTypes({
        placeholder: PropTypes.string.isRequired,
        type: PropTypes.string,
        theme: PropTypes.oneOf(Object.keys(themes))
    })
);

export default enhance(BigSearch);
