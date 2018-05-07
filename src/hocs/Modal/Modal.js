import React, { Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const withModal = ({
    onRequestClose = () => {},
    isOpen = true,
    contentLabel = 'Modal',
    style,
    ...opts
}) => BaseComponent => {
    return class extends Component {
        populateIf = prop =>
            typeof prop === 'function' ? prop(this.props) : prop;

        isOpenState = () => this.populateIf(isOpen);
        computedStyles = () => this.populateIf(style);
        onRequestCloseAction = () => this.populateIf(onRequestClose);

        render() {
            return (
                <Modal
                    isOpen={this.isOpenState()}
                    contentLabel={contentLabel}
                    onRequestClose={this.onRequestCloseAction}
                    style={this.computedStyles()}
                    {...opts}
                >
                    <BaseComponent {...this.props} />
                </Modal>
            );
        }
    };
};

// const enhance = compose(withRouter);

export default withModal;
