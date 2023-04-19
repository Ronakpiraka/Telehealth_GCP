import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));

class MapComponent extends Component {
  render() {
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <Map
          lat={37.7749}
          lng={-122.4194}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

export default MapComponent;
