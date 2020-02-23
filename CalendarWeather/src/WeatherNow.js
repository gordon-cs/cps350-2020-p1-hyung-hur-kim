/**
 * Simple React Native App to demonstrate using Dark Sky weather API.
 *
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch
} from 'react-native';
import { format } from "date-fns"; // Changes date format

import styles from './WeatherApi.style'
import moment from "moment";
import getWeatherApi from './WeatherApiFunction';
import getWeatherApiTMR from './WeatherApiTMR';
import LocationPicker from './DropdownLocationPicker';

/* WeatherData gets weather data and renders a view of the weather.
 * (Currently it "gets" static data: a fake temperature.)
 * It will eventually use data from the Dark Sky API (http://darksky.net).
 */
class WeatherData extends Component {
	constructor(props) {
		super(props);        // Always do this first, to make props valid
		this.state = {       // Initialize state (don't call setState in ctor)
		isLoading: true,
		tempScale : "F",
		selectedDate : this.props.currentDate,
		unit: "us",
		}
		// Set up methods by binding this for them
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	/* Get real API data when component is first loaded.
	* (Later, might want to refresh this periodically)
	* Caution: repo must stay private since it contains secret API key.
	* Todo: move API key to a file not in repo.
	*/
	async componentDidMount() {
		let weatherData = await getWeatherApi();
		let weatherTimeMachine = await getWeatherApiTMR();
		let tempScale = "C";
		//let weatherDataSI = await getWeatherApiSI();
		
		if (weatherData.flags.units == "us") {
			tempScale = "F";
		}
		
		this.setState({
			isLoading: false,
			weatherData: weatherData,
			weatherTimeMachine: weatherTimeMachine,
			tempScale: tempScale,
		});
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// Any time props.email changes, update state.
		if (nextProps.currentDate !== this.props.currentDate)
		this.setState({
			selectedDate: nextProps.currentDate,
		});
		
	}
	
	_changeScale = () => {
		this.setState({
			unit: this.state.unit
			? "si"
			: "us"
            }), () => { this.getWeatherApi(); }
		};


  	render() {

		if (this.state.isLoading) {
		// No data, show something in the meantime
		return (
			<Text>Waiting for data ...
			</Text>
		);
		} else {
		
			let tempScale
		let averageTemp;
			let lowTemp;
			let highTemp;
			let feelsLike;
			let range;
			let time;
			let sunriseUnix;
			let sunriseHumanTime;
			let sunriseFormatted
			let sunsetUnix;
			let sunsetHumanTime;
			let sunsetFormatted;
			var fromUnixTime = require('date-fns/fromUnixTime');
			let summary;
			let dateString;
			let selectedDate = new Date(this.state.selectedDate).getDate();
			let currentDate = new Date(moment()).getDate();
			let index = selectedDate - currentDate;
		let date = currentDate;
		if(index === 0)
			{
				averageTemp = Number((this.state.weatherData.currently.temperature).toFixed()) + " \u00B0" + this.state.tempScale;
				lowTemp = Number((this.state.weatherData.daily.data[0].temperatureMin).toFixed());
				highTemp = Number((this.state.weatherData.daily.data[0].temperatureHigh).toFixed());
				feelsLike = Number((this.state.weatherData.currently.apparentTemperature).toFixed()) + " \u00B0" + this.state.tempScale;
				range = lowTemp + " \u00B0" + this.state.tempScale + " / " + highTemp + " \u00B0" + this.state.tempScale;
				sunriseUnix = Number((this.state.weatherTimeMachine.daily.data[0].sunriseTime)).toString();
					sunriseHumanTime = fromUnixTime(sunriseUnix).toString();
					let sunriseDateTime = new Date(sunriseHumanTime);
					sunriseFormatted = format(sunriseDateTime, "h:mm a");
				sunsetUnix = Number((this.state.weatherTimeMachine.daily.data[0].sunsetTime)).toString();
					sunsetHumanTime = fromUnixTime(sunsetUnix).toString();
					let sunsetDateTime = new Date(sunsetHumanTime);
					sunsetFormatted = format(sunsetDateTime, "h:mm a");
				dateString = Date(this.state.weatherData.currently.time).toString();
				date = new Date(dateString);
				time = format(date, "EEE, MMM do, yyyy h:mm a");
				summary = this.state.weatherData.currently.summary;
			}
		else
			{
				averageTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh
									+ this.state.weatherData.daily.data[index].temperatureMin)/2).toFixed()
									+ " \u00B0" + this.state.tempScale;
				lowTemp = Number((this.state.weatherData.daily.data[index].temperatureMin).toFixed());
				highTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh).toFixed());
				feelsLike = Number((this.state.weatherData.daily.data[index].apparentTemperatureHigh
								+ this.state.weatherData.daily.data[index].apparentTemperatureMin)/2).toFixed()
								+ " \u00B0" + this.state.tempScale;
				range = lowTemp + " \u00B0" +this.state.tempScale + " / " + highTemp + " \u00B0" + this.state.tempScale;
				sunriseUnix = Number((this.state.weatherTimeMachine.daily.data[0].sunriseTime)).toString();
				sunsetUnix = Number((this.state.weatherTimeMachine.daily.data[0].sunsetTime)).toString();
				dateString = Date(this.state.weatherData.daily.data[index].time);
				date = new Date(this.state.weatherData.daily.data[index].time*1000);
				time = format(date, "EEE, MMM do, yyyy h:mm a");
				summary = this.state.weatherData.daily.data[index].summary;
			}
		
		// Formats date and time appropriately
		//var formattedSunrise = format(sunrise, "EEE, MMM do, yyyy h:mm a");
		//var formattedSunset = format(sunset, "h:mm a");
    
      	return (
        	<View style={styles.screen}>
				<View style={styles.box1} >
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<LocationPicker></LocationPicker>
						<TouchableOpacity onPress={this._changeScale}>
							<Text style={{fontSize: 20}}>C/F</Text>
    					</TouchableOpacity>
						
					</View>
					<Text>{time}</Text>
					<Text style={styles.curTemp}>
						{averageTemp}
					</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
						<Text style={styles.summary}>
							{summary}
						</Text>
						<Text style={styles.feelsLike}>
							Feels like {feelsLike}
						</Text>
					</View>
				</View>
				<View style={styles.box2} >
					<View style={styles.box2_1}>
						<Text>
							Today
						</Text>
						<Text style={styles.tempHighLow}>{range}</Text>
					</View>
					<View style={styles.box2_2}>
						<Text>{sunriseFormatted}      {sunsetFormatted}</Text>
						<Text>Sunrise            Sunset</Text>
					</View>
				</View>
			</View>
        );
    }
}
}

export default WeatherData;