import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class CalendarWeather extends Component {
  render() {
    return (
      <Calendar/>
    )
  }
}