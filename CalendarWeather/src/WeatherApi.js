import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

/* WeatherNow component gives an overall summary of today's weather
 * at a given location, with a small preview of the next day. All its
 * data comes from props.
 */
export default class WeatherNow extends Component {

  	render() {
		let temp = this.props.weatherData.currently.temperature + " \u2109";
		let todayRange = this.props.weatherData.daily.data[0].temperatureLow + " \u2109" + " - " 
				+ this.props.weatherData.daily.data[0].temperatureHigh + " \u2109";
		const dateString = Date(this.props.weatherData.currently.time).toString();
    	return (
			<View>
					<Text>
						Wenham, MA
					</Text>
					<Text>{dateString}</Text>
					<Text>
						{this.props.weatherData.currently.summary}
					</Text>
					<Text>
						{temp}
					</Text>
						<Text>
							Today
						</Text>
						<Text>{todayRange}</Text>
					</View>
    	);
  }
}