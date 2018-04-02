import React, { Component } from 'react';

export default function AsyncWrapper(componentImport) {
    class AsyncComponent extends Component {
        state = { component: null };

        async componentDidMount() {
            const { default: component } = await componentImport();

            this.setState({
                component: component
            });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}
