import React, { Component } from 'react';
import { default as ReactModal } from 'react-modal';
import PropTypes from 'prop-types';
import { setPropTypes, compose, mapProps } from 'recompose';

ReactModal.setAppElement('#root');

class ModalComponent extends Component {
    componentDidMount() {
        if (this.props.onMount) this.props.onMount(this);
    }

    render() {
        return <ReactModal {...this.props}>{this.props.children}</ReactModal>;
    }
}

const enhance = compose(
    // mapProps(props =>
    //     Object.entries(props).reduce((previous, [name, prop]) => {
    //         previous[name] = typeof prop === 'function' ? prop(props) : prop;
    //         return previous;
    //     }, {})
    // ),
    setPropTypes({
        onRequestClose: PropTypes.func.isRequired,
        isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
            .isRequired,
        contentLabel: PropTypes.string,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        onMount: PropTypes.func
    })
);

export const Modal = enhance(ModalComponent);

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
