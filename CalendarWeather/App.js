

/*This is an Example of Calendar With Events*/
import React from 'react';
//import react in our project
import {View } from 'react-native';

import CalendarView from './src/CalendarView';
import Event from './src/Event';
import WeatherData from './src/WeatherApi';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    currentDate = new Date();

    return (
      <View>
        <WeatherData></WeatherData>
        <CalendarView currentDate={currentDate}/>
        <Event currentDate = {currentDate}/>
      </View>

    );
  }
}