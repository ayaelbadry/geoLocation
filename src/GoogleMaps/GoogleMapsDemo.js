
import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground , Platform, Alert, Dimensions } from 'react-native';
import { Marker, PROVIDER_GOOGLE, Callout, Circle, Overlay, Polygon } from 'react-native-maps'
import MapView from 'react-native-maps'
import Carousel from 'react-native-snap-carousel';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS} from 'react-native-permissions'

export default class GoogleMapDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      coordinates: [

        { name: "محشي", latitude: 30.715314, longitude: 31.270238, image: require('./imgs/m74y.jpg')  },
        { name: "كفته", latitude: 30.722089, longitude: 31.251623, image: require('./imgs/kofta.jpg') },
        { name: "شوربه", latitude: 30.691832, longitude: 31.270850, image: require('./imgs/soup.jpg') },

        { name: "رقاق", latitude: 30.695227, longitude: 31.276343, image: require('./imgs/roqaq.jpg') },

      ]
    }
  }
  componentDidMount(){
    this.requestPermissionsLoction()
  }
  requestPermissionsLoction = async () => {
    if (Platform === 'ios'){
     var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
     console.log('iPhone' + response)
     if(response === 'granted'){
       this.locateCurrentPosition()
     }

    } else{
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      console.log('Android' + response)
      if(response === 'granted'){
        this.locateCurrentPosition()
      }

    }

  }
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition( position => {
      console.log(JSON.stringify(position))
      let initialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

      }
      this.setState({initialPosition})
    },
    error => Alert.alert(error.message),
    {enableHighAccuracy: true}
    )
  }
  renderCarouselItem =({item}) => 
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{item.name}</Text>
      <Image style={styles.cardImage} source={item.image} />
    </View>

  
  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index]
    this._map.animateToRegion({
      latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    this.state.markers[index].showCallout()
  }
  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    this._carousel.snapToItem(index)
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          ref={map => this._map = map}
          style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion = {this.state.initialPosition}
         >
          {/* <Circle
            center={{ latitude: 30.713261, longitude: 31.259550 }}
            radius={1000}

          /> */}

          <Polygon
            coordinates={this.state.coordinates}
            strokeWidth={2}
            strokeColor={'blue'}
            fillColor={'#E2ECF0'}
            tappable={true}
            onPress={() => console.log('Hello')}
          />
          <Marker
            coordinate={{ latitude: 30.713261, longitude: 31.259550 }}
           
          >
            <Callout >

              <Text><Image source={require('./imgs/hi.jpg')} style={{ width: 100, height: 100 }} resizeMode='cover' /></Text>

            </Callout>
          </Marker>
          {
            this.state.coordinates.map((item, index) => (
              <Marker
                key={item.name}
                ref={ref => this.state.markers[index] = ref}
                onPress={() => this.onMarkerPressed(item, index)}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                title={item.name}
              />)

            )
          }

        </MapView>
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.coordinates}
              containerCustomStyle={styles.carousel}
              renderItem={this.renderCarouselItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
              removeClippedSubviews={false}
              onSnapToItem={(index) => this.onCarouselItemChange(index)}
            />

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
  },
  carousel: {
    bottom: 0,
    marginBottom: 48,
    position: 'absolute'
  },
  cardContainer: {
    width: 300,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 24,
    borderRadius: 20

  },
  cardText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'white'

  },
  cardImage: {
  //  borderRadius: 10,
    bottom: 0,
    width: 300,
    height: 120,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24

  }

});

