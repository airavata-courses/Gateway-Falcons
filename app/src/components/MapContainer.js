import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100px',
  height: '100px'
};

export class MapContainer extends Component {
  render() {
    return (
      <div style={mapStyles}>
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A'
})(MapContainer);
