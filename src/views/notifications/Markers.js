import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import axios from 'axios';
import PractitionerBooking from './Practitionerbooking';

const API_KEY = process.env.REACT_APP_MAP_API_KEY;

const Map = withScriptjs(withGoogleMap(props => {
  const [markers, setMarkers] = useState([]);
 
  // useEffect(() => {
  //   axios.get('https://appointmentbook-sh4iojyb3q-uc.a.run.app/')
  //     .then(response => {
  //       setMarkers(response.data);
  //       // console.log(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  // setMarkers(PractitionerBooking.finalprac)
  // setMarkers( localStorage.getItem('prac_map'));

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 42.407211, lng: -71.382439 }}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.Provider_lat, lng: marker.Provider_long }}
        />
      ))}
    </GoogleMap>
  );
}));

const MapComponent = (props) => {
  const data = props;
  
  return (
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '500px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
};

export default MapComponent;
