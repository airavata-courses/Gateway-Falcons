// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// // import Marker from './Marker';
// import { Panel, PanelBody } from 'react-gentelella';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };

//   render() {
//     return (
//       <Panel>
//         <PanelBody>
//           <div style={{ height: '50vh', width: '100%' }}>
//             {/* TODO: GET NEW API KEY */}
//             {/* TODO: Set initial coords */}
//             <GoogleMapReact
//               bootstrapURLKeys={{ key: 'AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A' }}
//               defaultCenter={this.props.center}
//               defaultZoom={this.props.zoom}
//             >
//               <AnyReactComponent
//                 lat={59.955413}
//                 lng={30.337844}
//                 text="My Marker"
//               />
//             </GoogleMapReact>
//           </div>
//         </PanelBody>
//       </Panel>

//     );
//   }
// }

// export default SimpleMap;

import React, { Component } from 'react';
import { compose, withProps, withStateHandlers } from "recompose";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { InfoWindow } from 'react-google-maps';


// const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
// const demoFancyMapStyles = require("./demoFancyMapStyles.json");

const _markers = [
  { id: 1, date: '1/1/1', latitude: 22.6274, longitude: 120.3015 },
  { id: 2, date: '1/2/1', latitude: 22.6277, longitude: 120.3017 },
  { id: 3, date: '1/3/1', latitude: 22.6279, longitude: 120.3020 },
];

// TODO: should this be a class/stateful component for incoming data ...
// class LocationMap extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       markers: props.markers,
//       onClick: props.onClick
//     };
//   }

//   render() {
//     const MyMapComponent = compose(
// withProps({
//   googleMapURL:
//     "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A&v=3.exp&libraries=geometry,drawing,places",
//   loadingElement: <div style={{ height: `100%` }} />,
//   containerElement: <div style={{ height: `400px` }} />,
//   mapElement: <div style={{ height: `100%` }} />
// }),
//       withStateHandlers((props) => ({
//         isOpen: false,
//       }), {
//           onToggleOpen: ({ isOpen }) => () => ({
//             isOpen: !isOpen,
//           })
//         }),
//       withScriptjs,
//       withGoogleMap
//     )(props => (
//       <GoogleMap defaultZoom={8} defaultCenter={{ lat: 22.6274, lng: 120.3015 }}>
//         {/* props.markers && */}
//         {
//           _markers.map(marker => {
//             const onClick = this.state.onClick.bind(this, marker)
//             return (
//               <Marker
//                 key={marker.id}
//                 position={{ lat: marker.latitude, lng: marker.longitude }}
//                 onClick={onClick}
//               >
//                 {props.selectedMarker === marker && <InfoWindow
//                   onCloseClick={() => props.onMarkerClose}
//                   options={{ closeBoxURL: ``, enableEventPropagation: true }}
//                 >
//                   <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
//                     <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
//                       {marker.latitude} and {marker.longitude}
//                     </div>
//                   </div>
//                 </InfoWindow>}
//               </Marker>
//             )
//           })
//         }
//       </GoogleMap>
//     ));

//     return (
//       <div>
//         <MyMapComponent />
//       </div>
//     );
//   }
// }
// // const ReactGoogleMaps = (props) => (
// //   <MyMapComponent key="map" props={props} />
// // );

// export default LocationMap;


const MapWithMarkers = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 29.5, lng: -95 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.latitude} and {marker.longitude} on {marker.date}
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default MapWithMarkers;

// export default class LocationMap extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       markers: props.markers,
//       selectedMarker: false
//     }
//     console.log(this.state.markers)
//   }

//   componentDidMount() {
//     fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
//       .then(r => r.json())
//       .then(data => {
//         this.setState({ markers: data.shelters })
//       })
//   }
//   handleClick = (marker, event) => {
//     // console.log({ marker })
//     this.setState({ selectedMarker: marker })
//   }

//   render() {
//     return (
//       <MapWithMarkers
//         selectedMarker={this.state.selectedMarker}
//         markers={this.state.markers}
//         onClick={this.handleClick}
//         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A&v=3.exp&libraries=geometry,drawing,places"
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `400px` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     )
//   }
// }
