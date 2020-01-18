import React from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';



export default class GeoLocationDemo extends React.Component {
    constructor(){
        super();
        this.state = {
            ready: false,
            where: {lang: null, late: null},
            err: null
        }
    }
    componentDidMount(){
        let geoOpetions = {
            enableHighAccuracy: false,
            timeOut: 1000
        }
        this.setState({
            ready: false,
            error: null
        })
        Geolocation.getCurrentPosition(this.geoSuccess,this.geoFalier,geoOpetions)
    }
    geoFalier = (err) => {
        this.setState({err: err.message})

    }
    geoSuccess = (position) => {
        console.log(position.coords.longitude)
        this.setState({ready: true, where: {lang: position.coords.longitude, late: position.coords.latitude}})

    }
  render(){
    return (
      <View style={styles.contanier}>
          {!this.state.ready && (<Text style={styles.textStyle}>GeoLocation Demo </Text>)}
          {this.state.err && (<Text style={styles.textStyle}>Error: {this.state.err} </Text>)}
          {this.state.ready && (<Text style={styles.textStyle}>
              langitude: {this.state.where.lang} 
              latitude: {this.state.where.late} 
             </Text>)}
          

      </View>
    
      )

  }
  
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    textStyle: {
        fontSize: 28
    }
})

