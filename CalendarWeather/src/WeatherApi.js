import React, { Component } from 'react';
import { format } from "date-fns"; // Changes date format
import styles from './WeatherApi.style'
import {
  Text,
  View,
} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

/* WeatherNow component gives an overall summary of today's weather
 * at a given location, with a small preview of the next day. All its
 * data comes from props.
 */

export default class WeatherNow extends Component {

  	render() {
		// Parse temperature data: Current Temperature
		let temp = Number((this.props.weatherData.currently.temperature).toFixed()) + " \u2109";
		let todayLow = Number((this.props.weatherData.daily.data[0].temperatureMin).toFixed());
		let todayHigh = Number((this.props.weatherData.daily.data[0].temperatureHigh).toFixed());
		let feelsLike = Number((this.props.weatherData.currently.apparentTemperature).toFixed());
		let todayRange = todayLow + " \u2109" + " / " + todayHigh + " \u2109";
		//const sunriseString = Date(this.props.weatherData.daily.data[0].sunriseTime).toString();
		//const sunsetString = Date(this.props.weatherData.daily.data[0].sunsetTime).toString();
		const dateString = Date(this.props.weatherData.currently.time).toString();
		var date = new Date(dateString);
		//var sunrise = new Date(this.props.weatherData.daily.data[0].sunriseTime);
		//var sunset = new Date(this.props.weatherData.daily.data[0].sunsetTime);
		
		// Formats date and time appropriately
		var formattedCurrentDate = format(date, "EEE, MMM do, yyyy H:mm a");
		//var formattedSunrise = format(sunrise, "EEE, MMM do, yyyy H:mm a");
		//var formattedSunset = format(sunset, "H:mm a");

    	return (
			<View style={styles.screen}>
				<View style={styles.box1} >
					<Text style={styles.geoLoc}>
						Wenham, MA
					</Text>
					<Text>{formattedCurrentDate}</Text>
					<Text style={styles.curTemp}>
						{temp}
					</Text>
					<Text style={styles.feelsLike}>
						Feels like {feelsLike + " \u2109"}
					</Text>
					<Text style={styles.summary}>
						{this.props.weatherData.currently.summary}
					</Text>
				</View>
				<View style={styles.box2} >
					<View style={styles.box2_1}>
						<Text>
							Today
						</Text>
						<Text style={styles.tempHighLow}>{todayRange}</Text>
					</View>
					<View style={styles.box2_2}>
						<Text>Sunrise            Sunset</Text>
					</View>
				</View>
			</View>
    	);
  }
}