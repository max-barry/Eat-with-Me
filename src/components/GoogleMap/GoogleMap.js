import React, { Fragment } from 'react';
import { compose, withProps, withStateHandlers, defaultProps } from 'recompose';
import PropTypes from 'prop-types';
import { assoc, dissoc } from 'ramda';
import { cx } from 'react-emotion';
import {
    GoogleMap,
    InfoWindow,
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import {
    googleMapContainerClass as containerClass,
    googleMapWrapClass as wrapClass,
    googleMapMarkerClass as markerClass,
    googleMapDotClass as dotClass,
    googleMapDotActiveClass as dotClassActive,
    GoogleMapMarkerArrow as MarkerArrow,
    GoogleMapMarkerText as MarkerText,
    MARKER_WIDTH,
    MARKER_HEIGHT,
    DOT_WIDTH,
    DOT_HEIGHT
} from './GoogleMap.styles';
import { GOOGLE_MAPS_SCRIPT_URL } from '../../settings/apis';

export const MARKER_STYLES = {
    dot: 'dot',
    dotActive: 'dot-active',
    label: 'label'
};

const mapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoom: 11,
    center: {
        lat: 51.508039,
        lng: -0.128069
    }
};

// TODO : Make accessible or aria-hidden show-map controls
const Dot = ({ marker, toggleOpen, active }) => (
    <MarkerWithLabel
        opacity={0}
        position={marker.coordinates}
        labelClass={cx(dotClass, { [dotClassActive]: active })}
        labelAnchor={new google.maps.Point(DOT_WIDTH / 2, DOT_HEIGHT)}
        onClick={toggleOpen}
    >
        <Fragment />
    </MarkerWithLabel>
);

Dot.defaultProps = { active: false };
Dot.propTypes = {
    marker: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    active: PropTypes.bool
};

const Label = ({ marker, toggleOpen }) => (
    <MarkerWithLabel
        opacity={0}
        position={marker.coordinates}
        labelClass={markerClass}
        labelAnchor={new google.maps.Point(MARKER_WIDTH / 2, MARKER_HEIGHT)}
        onClick={toggleOpen}
    >
        <Fragment>
            <MarkerArrow role="presentation" />
            <MarkerText>Hello There!</MarkerText>
        </Fragment>
    </MarkerWithLabel>
);

const LabelExpanded = ({ marker, toggleOpen, ExpandedElement }) => (
    <InfoWindow position={marker.coordinates} onCloseClick={toggleOpen}>
        <ExpandedElement {...marker.expandedProps} />
    </InfoWindow>
);

const GoogleMapLoading = props => <div>Google Maps is loading</div>;

const GoogleMapComponent = ({
    markers,
    open,
    toggleOpen,
    width,
    height,
    expandedElement: ExpandedElement
}) => (
    <GoogleMap options={mapOptions}>
        {markers.map((marker, i) => {
            const openFn = () => toggleOpen(marker.id);
            const markerProps = { marker: marker, toggleOpen: openFn };
            const isOpen = !!open[marker.id];
            const style = marker.labelStyle;
            return (
                <Fragment key={marker.id}>
                    {style === MARKER_STYLES.dot &&
                        !isOpen && <Dot {...markerProps} />}

                    {style === MARKER_STYLES.dotActive &&
                        !isOpen && <Dot {...markerProps} active={true} />}

                    {style === MARKER_STYLES.label &&
                        !isOpen && <Label {...markerProps} />}

                    {isOpen && (
                        <LabelExpanded
                            marker={marker}
                            ExpandedElement={ExpandedElement}
                            toggleOpen={openFn}
                        />
                    )}
                </Fragment>
            );
        })}
    </GoogleMap>
);

GoogleMapComponent.propTypes = {
    expandedElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            expandedProps: PropTypes.object,
            labelStyle: PropTypes.oneOf(Object.values(MARKER_STYLES)),
            coordinates: PropTypes.shape({
                lat: PropTypes.number,
                lng: PropTypes.number
            }).isRequired
        })
    )
};

const enhance = compose(
    defaultProps({
        width: '80vh',
        height: '80vh'
    }),
    withProps(({ width, height }) => ({
        googleMapURL: GOOGLE_MAPS_SCRIPT_URL,
        loadingElement: <GoogleMapLoading />,
        containerElement: <div className={containerClass(width, height)} />,
        mapElement: <div className={wrapClass} />
    })),
    withStateHandlers(
        { open: {} },
        {
            toggleOpen: ({ open }) => id => ({
                open: open[id] ? dissoc(id, open) : assoc(id, true, open)
            })
        }
    ),
    withScriptjs,
    withGoogleMap
);

export default enhance(GoogleMapComponent);
