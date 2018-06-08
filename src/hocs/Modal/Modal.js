import React, { Component } from 'react';
import { default as ReactModal } from 'react-modal';
import PropTypes from 'prop-types';
import { setPropTypes, compose, onlyUpdateForKeys, lifecycle } from 'recompose';

ReactModal.setAppElement('#root');

const modal = ({ children, ...props }) => (
    <ReactModal {...props}>{children}</ReactModal>
);

modal.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
    contentLabel: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    onMount: PropTypes.func
};

const enhance = compose(
    onlyUpdateForKeys(['children', 'isOpen']),
    lifecycle({
        componentDidMount() {
            if (this.props.onMount) this.props.onMount(this);
        }
    })
);

export const Modal = enhance(modal);

export const withModal = settings => BaseComponent => {
    return class extends Component {
        render() {
            return (
                <Modal {...settings}>
                    <BaseComponent {...this.props} />
                </Modal>
            );
        }
    };
};
