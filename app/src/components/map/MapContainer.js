// import React, { Component } from 'react';

// import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%',
//   marginLeft: 'auto',
//   marginRight: 'auto'
// };

// export class MapContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showingInfoWindow: false,
//       activeMarker: {},
//       selectedPlace: {}
//     }
   
//   }
  

//   render() {
//     const style = {
//       width: '100%',
//       height: '100%',
      
//     }

//     return (
//       <div style={mapStyles}>
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//          lat: 39.648209,
//          lng: -75.711185
//         }}
//       />
//       </div>);


    
//   }
// }

// // To Do: Change API KEY
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A'
// })(MapContainer);


import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        {/* TODO: GET NEW API KEY */}
        {/* TODO: Set initial coords */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
