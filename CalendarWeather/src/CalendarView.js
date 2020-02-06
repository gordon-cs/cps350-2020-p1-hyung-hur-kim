import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Event from './Event';

/* WeatherNow component gives an overall summary of today's weather
 * at a given location, with a small preview of the next day. All its
 * data comes from props.
 */
export default class CalendarView extends Component {
    constructor(props)
    {
      super(props);
    }

  	render() {
      return (
        <View>
          <Calendar
            current = {this.props.currentDate}
          />
          <Event>
            location = {this.props.currentDate}
          </Event>
        </View>
      )
  }
}