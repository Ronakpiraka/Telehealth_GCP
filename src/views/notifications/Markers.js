import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from 'react-google-maps';
import {
  Modal,
  CCard,
  CCardBody,
  CCardGroup,
  CWidgetDropdown,
  CCol,
  CRow,
  CWidgetProgressIcon,
  CCardText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const API_KEY = process.env.REACT_APP_MAP_API_KEY;

const Map = withScriptjs(withGoogleMap(props => {
  const [selectedMarker, setSelectedMarker] = useState(null)
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 42.407211, lng: -71.382439 }}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.Provider_lat, lng: marker.Provider_long }}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}
       {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.Provider_lat, lng: selectedMarker.Provider_long }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <CCardGroup
                style={{
                  className:"mb-4",
                  cursor: "pointer"
                }}
                onClick={(e) => {
                  localStorage.setItem("practitioner_id", selectedMarker.Practitioner_id);
                  localStorage.setItem("practitioner_name", selectedMarker.Practitioner_name);
                  localStorage.setItem("practitioner_speciality", selectedMarker.Practitioner_Speciality);
                  localStorage.setItem("practitioner_email", selectedMarker.practitioner_email);
                  localStorage.setItem("prac_slab", selectedMarker.Practitioner_Slot);
                  localStorage.setItem("provider_id", selectedMarker.Provider_id);
                  localStorage.setItem("provider_name", selectedMarker.Provider_name);
                  localStorage.setItem("provider_lat", selectedMarker.Provider_lat);
                  localStorage.setItem("provider_long", selectedMarker.Provider_long);
                  localStorage.setItem("provider_contact", selectedMarker.Provider_contact_number);
                }}
              >
                <CWidgetProgressIcon
                  color="gradient-info"
                  inverse
                  style={{ color: "black" }}
                >
                  <CIcon
                    name="cil-userFollow"
                    style={{float:'left'}}
                    height="24"
                  />
                  <h4 style={{color: "black", float:"left", marginLeft: "25px", textAlign: "left", color:'white'}} > Practitioner: {selectedMarker.Practitioner_name} </h4><br/>
                  <h5 style={{ fontSize: "16px", textAlign: "left"}} > Provider Name: {selectedMarker.Provider_name} </h5>
                  <h5 style={{ fontSize: "16px", textAlign: "left"}} > Address: {selectedMarker.Provider_address} </h5>
                  <h5 sx={{ minWidth: "10 rem", display: "flex", justifyContent: "space-between", marginLeft: "25px" }}  style={{ fontSize: "16px", textAlign: "left" }}>
                    <button type="button" className="btn btn-secondary btn-sm" style={{ cursor: "pointer", padding: "1%", fontWeight: "bolder", float: "right", }}>Select</button>
                    Email: {selectedMarker.practitioner_email}
                  </h5>
                </CWidgetProgressIcon>
              </CCardGroup>
            {/* <div>
              <h3>{selectedMarker.name}</h3>
              <p>{selectedMarker.description}</p>
              <ul>
                <li>Practitioner Name: {selectedMarker.Practitioner_name}</li>
                <li>Address: {selectedMarker.Provider_address}</li>
                <li>Provider Name: {selectedMarker.Provider_name}</li>
              </ul>
            </div> */}
          </InfoWindow>
        )}
    </GoogleMap>
  );
}));

const MapComponent = (props) => {
  const data = props.markers;
  console.log(data);
  return (
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '500px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      markers={data}
    />
  );
};

export default MapComponent;
