import React, { Component } from 'react';
import { cx, css } from 'react-emotion';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/lib/md';
import { Spring, config as SpringConfig } from 'react-spring';
import renderToJson from 'react-render-to-json';
import SvgBase from 'react-icon-base';
import svgpath from 'svgpath';

import { IconBaseStyle } from '../Icon.styles.js';

// import {
//     FavouriteContainer,
//     FavouriteIconElement,
//     FavouriteIconInterior
// } from './Favourite.styles';

class ListAdd extends Component {
    state = { from: null, to: null, active: false };

    toggle = () => {
        // console.log('tih');
        this.setState(state => ({ active: !state.active }));
    };

    _toAbs = path =>
        svgpath(path)
            .abs()
            .toString();

    _findPath = currentNode => {
        var i, currentChild, result;

        if ('path' == currentNode.name) {
            return currentNode;
        } else {
            // Use a for loop instead of forEach to avoid nested functions
            // Otherwise "return" will not work properly
            for (i = 0; i < currentNode.children.length; i += 1) {
                currentChild = currentNode.children[i];

                // Search in the current child
                result = this._findPath(currentChild);

                // Return the result if the node has been found
                if (result !== false) {
                    return result;
                }
            }

            // The node has not been found and we have no more options
            return false;
        }
    };

    componentDidMount = () => {
        const fromJson = renderToJson(<MdPlaylistAdd />);
        const toJson = renderToJson(<MdPlaylistAddCheck />);
        console.log(fromJson);
        const fromPath = this._findPath(fromJson).attributes.d;
        const toPath = this._findPath(toJson).attributes.d;
        this.setState(state => ({
            from: this._toAbs(fromPath),
            to: this._toAbs(toPath)
        }));
    };
    // state = { active: false };
    // toggle = () => this.setState(state => ({ active: !state.active }));
    render() {
        const { active, from, to } = this.state;
        console.log(from);
        return from && to ? (
            <div onClick={this.toggle}>
                <Spring
                    to={{
                        path: active ? to : from
                    }}
                    children={({ path }) => (
                        <SvgBase
                            viewBox="0 0 40 40"
                            className={IconBaseStyle}
                            {...this.props}
                        >
                            <g>
                                <path d={path} />
                            </g>
                        </SvgBase>
                    )}
                />
            </div>
        ) : null;
    }
}

export default ListAdd;
