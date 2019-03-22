// https://gist.github.com/jwo/43b382fc60eb09d3a415c9953f4057f8 

import React from 'react';
import { compose } from "recompose";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import { InfoWindow } from 'react-google-maps';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

const MapWithMarkers = compose(withScriptjs, withGoogleMap)(props => {

    return (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: 39, lng: -74 }}>
            {props.markers.map((marker, index) => {
                const onClick = props.onClick.bind(this, marker)
                return (
                    <Marker
                        key={index}
                        onClick={onClick}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                    >
                        {props.selectedMarker === marker &&
                            <InfoWindow>
                                <div key={marker.id}>
                                    {marker.latitude} and {marker.longitude} on {marker.workout_date_time}
                                </div>
                            </InfoWindow>
                        }
                    </Marker>
                )
            })}
        </GoogleMap>
    )
})

export default MapWithMarkers;
