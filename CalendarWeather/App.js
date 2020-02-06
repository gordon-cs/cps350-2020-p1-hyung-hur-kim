

/*This is an Example of Calendar With Events*/
import React from 'react';
//import react in our project
import {View } from 'react-native';

import CalendarView from './src/CalendarView';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    currentDate = new Date();

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <CalendarView currentDate={currentDate}/>
      </View>
    );
  }
}