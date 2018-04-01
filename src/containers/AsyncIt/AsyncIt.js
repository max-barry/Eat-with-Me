import React, { Component } from 'react';

export default function asyncComponent(importPath) {
    class AsyncComponent extends Component {
        state = { component: null };

        async componentDidMount() {
            const { default: component } = await (() => import(importPath))();

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
