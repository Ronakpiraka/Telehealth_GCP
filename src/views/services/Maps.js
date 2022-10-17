import React, { } from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import ttConfig from '../../config.js'
import Polyline from './Map/Polyline';

class TraceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      showingInfoWindow: false,
      showingPolyine: false,
      activeMarker: {},
      activeMarker1: {},
      latts: '',
      lanss: '',
      lattss: '',
      lansss: '',
      markerAddress: '',
      mapsLoaded: false,
      map: null,
      maps: null,
      geoData: ''
    };
    this.onMarkerClick1 = this.onMarkerClick1.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.location = this.location.bind(this);
    this.toggless = this.toggless.bind(this);
  }
  path = [
    { lat: ttConfig.roleassign.mcoordinates.lat, lng: ttConfig.roleassign.mcoordinates.lng },
    { lat: ttConfig.roleassign.dcoordinates.lat, lng: ttConfig.roleassign.dcoordinates.lng },
    { lat: ttConfig.roleassign.scoordinates.lat, lng: ttConfig.roleassign.scoordinates.lng }
  ];

  componentDidMount() {
      console.log('-------------------------------store--------------------------------------------')
      let storeGeoData = this.getMapGeoLocation('San Francisco, CA, USA');
      console.log('-------------------------------distributor--------------------------------------------')

      this.setState({ storeGeoData: storeGeoData });

      if(storeGeoData) {
            let  newMarkers =  [
              {lat: storeGeoData.lat, lng: storeGeoData.lng},
            ];
            // this.props.markers = newMarkers;
            this.setState({ geoData: newMarkers })
          }
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  onMarkerClick1 = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker1: marker,
      showingInfoWindow: true,
    });
  }
  onMarkerClick2 = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker1: marker,
      showingInfoWindow: true,
    });
  }
  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  toggle = () => {
    this.setState((prevState) => {
      return { dropdownOpen: !prevState.dropdownOpen };
    });
  }

  location = (lat, lng) => {
    this.setState({ latts: lat, lanss: lng })
  }
  toggless() {
    this.setState((prevState) => {
      return { isOpen: !this.state.isOpen };
    });
  }
   onMapLoaded (map, maps) {
    this.fitBounds(map, maps)

    this.setState({
      ...this.state,
      mapsLoaded: true,
      map: map,
      maps: maps
    })
  }

  fitBounds (map, maps) {
    var bounds = new maps.LatLngBounds()

    var latLang = (this.state.geoData) ? this.state.geoData : this.props.markers;

    for (let marker of latLang) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  afterMapLoadChanges () {
    console.log('---------------------- GEO DATA -----------------------')
    console.log(this.state.geoData)
    console.log('---------------------- GEO DATA -----------------------')

    return (
      <div style={{display: 'none'}}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          markers={(this.state.geoData) ? this.state.geoData :  this.props.markers} />
      </div>
    )
  }

  getMapGeoLocation(address) {
    let url = ttConfig.secretkey.mapQuestGeoCodeUrl + '&location=' + address
    let latlang = {};
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((geoData) => {
        let latlang = geoData.results[0]
        if(latlang.locations[0].latLng) {
          console.log(latlang);
          latlang = latlang.locations[0].latLng;
        }
    });
    return latlang;
  }

 
  render() {
    const { posts } = this.state;
    console.log(this.state.orderDetails)

    let storeAddress = ttConfig.location.store;
    let distAddress = ttConfig.location.distributor;
    let manufacturerAddress = ttConfig.location.manufacturer;

    let mapUrl = ttConfig.secretkey.mapQuestStaticMapUrl + manufacturerAddress + '|marker-sm-F8E71C-417505-A||' + distAddress + '|marker-sm-F8E71C-000000-B||' + storeAddress + '|marker-sm-F8E71C-c20000-C&shape=' + manufacturerAddress + '|' + distAddress + '|' + storeAddress + '&type=map&size=900,200@2x';
    console.log(mapUrl);
    return (
      <div >
              <img src={mapUrl} alt="Trace Map" style={{width: '100%', height: '350px'}} />
      </div>
    );
  }
}

TraceOrder.defaultProps = {
  markers: [
    {lat: 37.773972, lng: -122.431297}
  ],
  center: [42.3418054, -71.0763656],
  zoom: 4
}

export default GoogleApiWrapper({
  apiKey: ttConfig.secretkey.mapkey
})(TraceOrder);

