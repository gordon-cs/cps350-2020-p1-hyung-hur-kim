

/*This is an Example of Calendar With Events*/
import React from 'react';
import { Text, View, Button, Alert, Image, FlatList, StyleSheet, PickerIOSComponent, StatusBar, SafeAreaView} from "react-native";

import WeatherNow from './src/WeatherNow';
import SplashScreen from './src/SplashScreen';


export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <WeatherNow></WeatherNow>
        </View>
    );
  }
}