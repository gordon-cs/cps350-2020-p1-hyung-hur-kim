import React, { Component } from 'react';
//import { format } from "date-fns";
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

/* WeatherNow component gives an overall summary of today's weather
 * at a given location, with a small preview of the next day. All its
 * data comes from props.
 */

const height = '20%';
const width = '100%';
export default class WeatherNow extends Component {

  	render() {
		let temp = this.props.weatherData.currently.temperature + " \u2109";
		let todayRange = this.props.weatherData.daily.data[0].temperatureLow + " \u2109" + " - " 
				+ this.props.weatherData.daily.data[0].temperatureHigh + " \u2109";
		const dateString = Date(this.props.weatherData.currently.time).toString();
    	return (
			<View style={styles.screen}>
				<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}} >
					<Text>
						Wenham, MA
					</Text>
					<Text>{dateString}</Text>
					<Text>
						{this.props.weatherData.currently.summary}
					</Text>
				</View>
				<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}} >
					<Text>
						{temp}
					</Text>
					<Text>
						Today
					</Text>
					<Text>{todayRange}</Text>
				</View>
			</View>
    	);
  }
}

const styles = StyleSheet.create({
	screen: {
		width,
		height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightgrey',
		},
	text: {
		fontSize: 18,
		},
});
//format(dateString)