import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    List,
    // AutoSizer,
    InfiniteLoader,
    WindowScroller,
    CellMeasurerCache,
    CellMeasurer
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
    ExpandingThirdsContainer as Container,
    // ExpandingThirdsRow as Row,
    ExpandingThirdsSection as Section
} from './ExpandingThirds.styles';
import { dimensions } from '../../settings/styles';

const TOTAL_COLUMNS = 3;

class ExpandingThirds extends Component {
    render() {
        const { columns, sticky, primary, secondary, ...props } = this.props;

        return (
            <Container {...props}>
                <Section
                    style={{
                        gridColumn: `span ${columns}`
                    }}
                >
                    {primary}
                </Section>
                <Section
                    sticky={sticky}
                    style={{
                        gridColumn: `span ${TOTAL_COLUMNS - columns}`,
                        display: TOTAL_COLUMNS - columns > 0 ? 'block' : 'none'
                    }}
                >
                    {secondary}
                </Section>
            </Container>
        );
    }
}

ExpandingThirds.defaultProps = {
    columns: 3,
    sticky: false
};

ExpandingThirds.propTypes = {
    primary: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
    secondary: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
    columns: PropTypes.number,
    sticky: PropTypes.bool
};

export default ExpandingThirds;
