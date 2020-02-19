

/*This is an Example of Calendar With Events*/
import React from 'react';
import { Text, View, Button, Alert, Image, FlatList, StyleSheet} from "react-native";

import CalendarView from './src/CalendarView';
import WeatherNow from './src/WeatherNow';
import Event from './src/Event';
import EventPicker from './src/EventPicker';
import WeatherIconUnderDates from './src/WeatherIconUnderDates';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  
    return (
      <View style={{ flex: 1}}>
        <CalendarView/>
      </View>

    );
  }
}