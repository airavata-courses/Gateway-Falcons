import React, { Component } from 'react';

import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
   
  }
  

  render() {
    const style = {
      width: '100%',
      height: '100%',
      
    }

    return (
      <div style={mapStyles}>
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 39.648209,
         lng: -75.711185
        }}
      />
      </div>);


    
  }
}

// To Do: Change API KEY
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A'
})(MapContainer);
