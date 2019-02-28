/* eslint-disable no-undef */

import React, { Component } from "react";

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  BicyclingLayer,
  DirectionsRenderer
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAuCpniQCybHIf3FmvZpgsEojtniTNJoPI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin:  new google.maps.LatLng(40.76058578491211,-74.45610809326172),
        destination: new google.maps.LatLng(40.67646026611328,-74.49562072753906),
        travelMode: google.maps.TravelMode.BICYCLING,
        optimizeWaypoints:true,
        waypoints: [
            {
               location: new google.maps.LatLng(40.74322509765625,-74.45587921142578)
            },
            {
               location: new google.maps.LatLng(40.742431640625,-74.48239135742188)
            }
       ]
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={ new google.maps.LatLng(40.76058578491211,-74.45610809326172)}
    
  >
  
  <BicyclingLayer autoUpdate/>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

export default MapWithADirectionsRenderer;