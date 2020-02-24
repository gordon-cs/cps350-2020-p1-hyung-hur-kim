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
		// unit: "us", Troubleshooting: remove later
		}
		// Set up methods by binding this for them
		this.componentDidMount = this.componentDidMount.bind(this);
		this.changeScaleToC = this.changeScaleToC.bind(this);
		this.changeScaleToF = this.changeScaleToF.bind(this);
	}

	/* Get real API data when component is first loaded.
	* (Later, might want to refresh this periodically)
	* Caution: repo must stay private since it contains secret API key.
	* Todo: move API key to a file not in repo.
	*/
	async componentDidMount() {
		let tempScale = "C";
		let weatherData = await getWeatherApi(tempScale);
		let weatherTimeMachine = await getWeatherApiTMR();
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
		console.log("receiving");
		// Any time props.email changes, update state.
		if (nextProps.currentDate !== this.props.currentDate)
		this.setState({
			selectedDate: nextProps.currentDate,
		});
	}
	
	async changeScaleToF(){
		this.setState({
			tempScale: "F"
			}, async() => { this.setState({ weatherData: await getWeatherApi(this.state.tempScale) })});

	}

	async changeScaleToC() {
		this.setState({
			tempScale: "C"
			}, async() => { this.setState({ weatherData: await getWeatherApi(this.state.tempScale) })});
	}
  	render() {

    if (this.state.isLoading) {
      // No data, show something in the meantime
      return (
        <Text>Waiting for data ...
        </Text>
      );
    } else {
      
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
    let date = currentDate;
    if(index === 0)
		{
			averageTemp = Number((this.state.weatherData.currently.temperature).toFixed()) + " \u00B0" + this.state.tempScale;
			lowTemp = Number((this.state.weatherData.daily.data[0].temperatureMin).toFixed());
			highTemp = Number((this.state.weatherData.daily.data[0].temperatureHigh).toFixed());
			feelsLike = Number((this.state.weatherData.currently.apparentTemperature).toFixed()) + " \u00B0" + this.state.tempScale;
			range = lowTemp + " \u00B0" + this.state.tempScale + " / " + highTemp + " \u00B0" + this.state.tempScale;
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
						<TouchableOpacity onPress={()=>this.changeScaleToC()}>
							<Text style={{fontSize: 20}}>C</Text>
    					</TouchableOpacity>
						<TouchableOpacity onPress={()=>this.changeScaleToF()}>
							<Text style={{fontSize: 20}}>F</Text>
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