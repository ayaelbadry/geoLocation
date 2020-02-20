import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

export default class GooglePlacesDemo extends React.Component{
    constructor(){
        super();
        this.state = {
            latitude: 28.579660,   
            longitude: 77.321110,
            name: 'any place'
        }
    }
    openSearchModel = () => {
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            console.log("places", place)
            this.setState({
                latitude: place.location.latitude,
                longitude: place.location.longitude,
                name: place.name
            })
           
        })
        .catch((error) => {console.log(error.message)})
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={{backgroundColor:'red', width: 80, height: 50}} onPress={() => this.openSearchModel()}>
                    <Text>pick a place</Text>
                </TouchableOpacity>
               
               

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
  
      flex: 1, 
      
    },
     mapStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }

  
  });
  
  