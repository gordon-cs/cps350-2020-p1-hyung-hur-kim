

/*This is an Example of Calendar With Events*/
import React from 'react';
import { Text, View, Button, Alert, Image, FlatList, StyleSheet} from "react-native";

import CalendarView from './src/CalendarView';
import WeatherNow from './src/WeatherNow';
import Event from './src/Event';
import EventPicker from './src/EventPicker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    currentDate = new Date();
  
    return (
      <View style={{ flex: 1}}>
        <WeatherNow></WeatherNow>
        <CalendarView currentDate={currentDate}/>
        <EventPicker currentDate = {currentDate}></EventPicker>
      </View>

    );
  }
}