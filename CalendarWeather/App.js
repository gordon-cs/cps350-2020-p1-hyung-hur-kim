

/*This is an Example of Calendar With Events*/
import React from 'react';
import { Text, View, Button, Alert, Image, FlatList, StyleSheet} from "react-native";

import WeatherNow from './src/WeatherNow';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  currentSelectedDate: new Date(),
		  currentDate: new Date()
	  }
  }
  render() {
  
    return (
      <View style={{ flex: 1}}>
        <WeatherNow currentSelectedDate = {this.state.currentSelectedDate}></WeatherNow>
      </View>

    );
  }
}