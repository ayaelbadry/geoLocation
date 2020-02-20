import React from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
export default class PlacesAutocomplete extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <GooglePlacesAutocomplete 
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
          
                getDefaultValue={() => ''}
          
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyCuLXoL7Ri2uY3mhGAMeTBGJV1xWq_gYBQ',
                  language: 'en', // language of the results
                  types: '(cities)' // default: 'geocode'
                }}
          
                styles={{
                  textInputContainer: {
                    width: '100%'
                  },
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  }
                }}
          
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                
              />

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    }

})