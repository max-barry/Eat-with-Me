import React, { Component } from 'react';
import Modal from 'react-modal';
import { compose } from 'recompose';
import urls from '../../settings/urls';

const withModal = ({
    onClose,
    isOpen = true,
    contentLabel = 'Modal'
}) => BaseComponent => {
    return class extends Component {
        isOpenState = typeof isOpen === 'function'
            ? isOpen(this.props)
            : isOpen;

        onCloseAction = onClose(this.props);

        render() {
            return (
                <Modal
                    isOpen={this.isOpenState}
                    contentLabel={contentLabel}
                    onRequestClose={this.onCloseAction}
                >
                    <button onClick={this.onCloseAction}>Close</button>
                    <BaseComponent {...this.props} />
                </Modal>
            );
        }
    };
};

// const enhance = compose(withRouter);

export default withModal;
