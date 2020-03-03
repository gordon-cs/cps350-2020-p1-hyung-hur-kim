

/*This is an Example of Calendar With Events*/
import React from 'react';
import { Text, View, Button, Alert, Image, FlatList, StyleSheet} from "react-native";

import WeatherNow from './src/WeatherNow';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1}}>
        <WeatherNow></WeatherNow>
      </View>
    );
  }
}