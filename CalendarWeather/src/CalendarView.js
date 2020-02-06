import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

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
      let icons = [icon, icon, icon];
      let markedDates = [
        {
            date: new Date(),
            dots: [
                {
                  key: 1,
                  color: 'black',
                  selectedDotColor: 'black',
                },
            ],
        },
      ];
      
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
              markedDates = {markedDates}
			    />
          
        </View>
      )
  }
}