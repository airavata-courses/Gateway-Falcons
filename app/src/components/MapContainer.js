import React, { Component } from 'react';

import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '40%',
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
    const { lat } = this.props;
    const { lng } = this.props;
    const latlng = { lat: Number(lat), lng: Number(lng) }

    return (

      <Map google={this.props.google}
        style={mapStyles}
        initialCenter={latlng}
        zoom={14}>
        <Marker
          position={latlng} />
      </Map>


    );



  }
}

// TODO: Change API KEY
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A'
})(MapContainer);
