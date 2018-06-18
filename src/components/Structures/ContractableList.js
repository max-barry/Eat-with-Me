import React from 'react';
import PropTypes from 'prop-types';
import {
    ContractableListContainer as Container,
    ContractableListUl as Ul,
    ContractableListLi as Li,
    ContractableListArea as Area
} from './ContractableList.styles';

const ContractableList = ({ items, columns, children, ...props }) => (
    <Container {...props}>
        <Ul style={{ gridColumn: `span ${columns}` }}>
            {items.map(({ component: Component, props }, i) => (
                <Li key={`contract_${i}`}>
                    <Component {...props} />
                </Li>
            ))}
        </Ul>
        <Area style={{ gridColumn: `span ${3 - columns}` }}>{children}</Area>
    </Container>
);

ContractableList.defaultProps = {
    columns: 3
};

ContractableList.propTypes = {
    columns: PropTypes.number,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
                .isRequired,
            props: PropTypes.object
        })
    ).isRequired
};

export default ContractableList;
