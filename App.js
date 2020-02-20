import React from 'react';
import { View, Text} from 'react-native';
import GeoLocationDemo from './src/geoLocation/geoLocation'
import GoogleMapDemo from './src/GoogleMaps/GoogleMapsDemo'
import GooglePlacesDemo from './src/GoogleMaps/GooglePlacesDemo'
import PlacesAutocomplete from './src/GoogleMaps/googlePlacesAutocomplete'
export default class App extends React.Component {
  render(){
    return (
     // <GeoLocationDemo />
       <GoogleMapDemo />
      // <GooglePlacesDemo />
     // <PlacesAutocomplete />
    
      )

  }
  
};

