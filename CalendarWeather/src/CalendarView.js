import React, { Component } from 'react';
import { Text, View, Button, Alert, Image, FlatList, StyleSheet} from "react-native";
import CalendarStrip from 'react-native-calendar-strip';

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
		let image1 = require('./cloud.png');
		let image2 = require('./cloud.png');
		let image3 = require('./cloud.png');
		let image4 = require('./cloud.png');
		let image5 = require('./cloud.png');
		let image6 = require('./cloud.png');
		let image7 = require('./cloud.png');
		let images = [{"source": image1}, image2, image3, image4, image5, image6, image7];
      return (
        <View>
          <CalendarStrip
				      calendarAnimation={{ type: 'sequence', duration: 30 }}
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
              startingDate = {this.props.currentDate}
			    />
        </View>
      )
  }
}