import React, { Component } from 'react';
import { compose, setPropTypes, renderNothing } from 'recompose';
import PropTypes from 'prop-types';
import { Modal } from '../../hocs/Modal/Modal';
import { FiltersModalStyles } from './Filters.styles';
// import { filterComponents } from './FilterContent';

class FiltersCanvas extends Component {
    render() {
        const {
            isOpen,
            contentLabel,
            style,
            content: Content,
            ...props
        } = this.props;

        const modalSettings = {
            isOpen,
            contentLabel,
            onRequestClose: props.onRequestClose,
            style: FiltersModalStyles(style)
        };

        return Content ? (
            <Modal {...modalSettings}>
                <Content {...props} />
            </Modal>
        ) : null;
    }
}

const enhance = compose(
    setPropTypes({
        isOpen: PropTypes.bool.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        style: PropTypes.object.isRequired,
        contentLabel: PropTypes.string,
        onMount: PropTypes.func,
        contentKey: PropTypes.string
    })
);

export default enhance(FiltersCanvas);
