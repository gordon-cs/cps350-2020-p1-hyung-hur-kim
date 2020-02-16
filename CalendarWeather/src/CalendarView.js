import React, { Component } from 'react';
import { Text, View, Button, Alert, Image, FlatList, StyleSheet} from "react-native";
import CalendarStrip from 'react-native-calendar-strip';
import EventPicker from './EventPicker'
import WeatherIconUnderDates from './WeatherIconUnderDates'

/* WeatherNow component gives an overall summary of today's weather
 * at a given location, with a small preview of the next day. All its
 * data comes from props.
 */

 
export default class CalendarView extends Component {
    constructor(props)
    {
	  super(props);
	  this.state = {
		  currentSelectedDate: new Date(this.props.currentDate),
		  currentDate: this.props.currentDate
	  }
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		// Any time props.email changes, update state.
		if (nextProps.currentDate !== this.props.currentDate)
		  this.setState({
			currentDate: new Date(nextProps.currentDate)
		  });
		}

  	render() {
      return (
        <View style={{ flex: 1}}>
          <CalendarStrip
				      daySelectionAnimation={{
			        		type: 'border',
			        		duration: 200,
			        		borderWidth: 1,
			        		borderHighlightColor: 'black',
				      }}
				      style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
				      calendarHeaderStyle={{ color: 'black' }}
				      calendarColor={'white'}
				      dateNumberStyle={{ color: 'black' }}
				      dateNameStyle={{ color: 'black' }}
				      highlightDateNumberStyle={{ color: 'red' }}
				      highlightDateNameStyle={{ color: 'red' }}
              iconContainer={{ flex: 0.1 }}
              useIsoWeekday = {false}
			  startingDate = {this.state.currentDate}
			  onDateSelected = {(newDate) => this.setState({currentSelectedDate: new Date(newDate)})}
			    />
				<WeatherIconUnderDates></WeatherIconUnderDates>
			<EventPicker currentDate = {this.state.currentSelectedDate}></EventPicker>
        </View>
      )
  }
}