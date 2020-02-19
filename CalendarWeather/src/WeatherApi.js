import React, { Component } from 'react';
import { format } from "date-fns"; // Changes date format
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import moment from "moment";
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

/* WeatherNow component gives an overall summary of today's weather
 * at a given location, with a small preview of the next day. All its
 * data comes from props.
 */

const height = '20%';
const width = '100%';
export default class WeatherNow extends Component {
	constructor(props) {
		super(props);        // Always do this first, to make props valid
		this.state = {       // Initialize state (don't call setState in ctor)
		  weatherData: this.props.weatherData,
		  selectedDate: this.props.selectedDate,
		}
	  }

	  UNSAFE_componentWillReceiveProps(nextProps) {
		// Any time props.email changes, update state.
		if (nextProps.selectedDate !== this.props.selectedDate)
		  this.setState({
			selectedDate: nextProps.selectedDate,
		  });
		  
		}
  	render() {
		let averageTemp;
		let lowTemp;
		let highTemp;
		let feelsLike;
		let range;
		let time;
		let summary;
		let dateString;
		let selectedDate = new Date(this.state.selectedDate).getDate();
		let currentDate = new Date(moment()).getDate();
		let index = selectedDate - currentDate;
		console.log(index);

		if(index === 0)
		{
			averageTemp = Number((this.state.weatherData.currently.temperature).toFixed()) + " \u2109";
			lowTemp = Number((this.state.weatherData.daily.data[0].temperatureMin).toFixed());
			highTemp = Number((this.state.weatherData.daily.data[0].temperatureHigh).toFixed());
			feelsLike = Number((this.state.weatherData.currently.apparentTemperature).toFixed());
			range = lowTemp + " \u2109" + " / " + highTemp + " \u2109";
			dateString = Date(this.state.weatherData.currently.time).toString();
			let date = new Date(dateString);
			time = format(date, "EEE, MMM do, yyyy H:mm a");
			summary = this.state.weatherData.currently.summary;
		}
		else
		{
			averageTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh + this.state.weatherData.daily.data[index].temperatureMin)/2).toFixed() + " \u2109";
			lowTemp = Number((this.state.weatherData.daily.data[index].temperatureMin).toFixed());
			highTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh).toFixed());
			feelsLike = Number((this.state.weatherData.daily.data[index].apparentTemperatureHigh + this.state.weatherData.daily.data[index].apparentTemperatureMin)/2).toFixed();
			range = lowTemp + " \u2109" + " / " + highTemp + " \u2109";
			dateString = Date(this.state.weatherData.daily.data[index].time);
			let date = new Date(this.state.weatherData.daily.data[index].time*1000);
			time = format(date, "EEE, MMM do, yyyy H:mm a");
			summary = this.state.weatherData.daily.data[index].summary;
		}
		

    	return (
			<View style={styles.screen}>
				<View style={styles.box1} >
					<Text style={styles.geoLoc}>
						Wenham, MA
					</Text>
					<Text>{time}</Text>
					<Text style={styles.curTemp}>
						{averageTemp}
					</Text>
					<Text style={styles.feelsLike}>
						Feels like {feelsLike + " \u2109"}
					</Text>
					<Text style={styles.summary}>
						{summary}
					</Text>
				</View>
				<View style={styles.box2} >
					<View style={styles.box2_1}>
						<Text>
							Today
						</Text>
						<Text style={styles.tempHighLow}>{range}</Text>
					</View>
					<View style={styles.box2_2}>
						<Text>Sunrise            Sunset</Text>
					</View>
				</View>
			</View>
    	);
  }
}

const styles = StyleSheet.create({
	screen: {
		width,
		height,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'lightgrey',
		},
	box1: {
		width: '51%',
		height: '90%',
		flexDirection: 'column',
		//alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
		},
	box2: {
		width: '46%',
		height: '90%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		//backgroundColor: 'white',
		},
	box2_1: {
		width: '100%',
		height: '48%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white',
		},
	box2_2: {
		width: '100%',
		height: '48%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: 'white',
		},
	geoLoc: {
		alignItems: 'center',
		fontSize: 18,
		},
	curTemp: {
		fontSize: 55,
		fontWeight: 'bold',
		alignSelf: 'center',
		},
	summary: {
		fontSize: 20,
		alignSelf: 'center',
	},
	tempHighLow: {
		fontSize: 30,
	},
	feelsLike: {
		alignSelf: 'center',
	}
});