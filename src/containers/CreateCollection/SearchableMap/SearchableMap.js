import React, { Fragment, Component } from 'react';
import { Configure } from 'react-instantsearch/dom';
import PropTypes from 'prop-types';
import { applySpec, map, slice, path } from 'ramda';
import { compose } from 'recompose';
import moize from 'moize';
import { MediaElement } from '../../../components/Structures';
import GoogleMap, {
    MARKER_STYLES
} from '../../../components/GoogleMap/GoogleMap';

const shapeForMap = moize.deep(
    compose(
        map(
            applySpec({
                id: path(['props', 'key']),
                // labelStyle: idx <= 5 ? MARKER_STYLES.label : MARKER_STYLES.dot,
                labelStyle: _ => MARKER_STYLES.dot,
                text: path(['props', 'title']),
                coordinates: path(['props', 'coordinates']),
                expandedProps: {
                    title: path(['props', 'title']),
                    src: path(['props', 'src']),
                    strap: path(['props', 'strap']),
                    width: _ => 260,
                    smallFont: _ => true
                }
            })
        ),
        slice(0, 20)
    ),
    { maxSize: 20 }
);

class SearchableMap extends Component {
    state = { center: undefined, initialBoundarySet: false };

    constructor(props) {
        super(props);
        this.setCenter = this.setCenter.bind(this);
    }

    setCenter(map) {
        const center = map.getCenter();
        this.setState({
            initialBoundarySet: true,
            center: [center.lat(), center.lng()].join(',')
        });
    }

    render() {
        // TODO : Add an around radius
        return (
            <Fragment>
                <GoogleMap
                    onIdle={this.setCenter}
                    expandedElement={MediaElement}
                    markers={shapeForMap(this.props.items)}
                />
                <Configure
                    aroundLatLng={this.state.center}
                    aroundRadius={1000}
                />
            </Fragment>
        );
    }
}

SearchableMap.defaultProps = {
    items: []
};

SearchableMap.propTypes = {
    items: PropTypes.array.isRequired
};

export default SearchableMap;
