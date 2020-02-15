
import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Marker } from 'react-native-maps'
import MapView from 'react-native-maps'

export default class GoogleMapDemo extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <MapView 
        style={styles.mapStyle}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
            latitude: 28.579660,   
            longitude: 77.321110,  
            latitudeDelta: 0.0922,  
            longitudeDelta: 0.0421, 
        }}>
          <Marker 
          coordinate={{ latitude:28.579660, longitude: 77.321110 }}
          title={"hi"}
          description={"hi institue"}
          />
        </MapView>

      </View>
    )

  }
}
const styles = StyleSheet.create({
  container: {

    flex: 1, 
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  mapStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
  }

});

