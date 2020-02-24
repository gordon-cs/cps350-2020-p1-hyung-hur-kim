/**
 * Simple React Native App to demonstrate using Dark Sky weather API.
 *
 */

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { format } from "date-fns"; // Changes date format

import styles from './WeatherApi.style'
import moment from "moment";
import getWeatherApi from './WeatherApiFunction';

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
    let tempScale = "C";
      if (weatherData.flags.units == "us") {
        tempScale = "F";
      }
      this.setState({
        isLoading: false,
        weatherData: weatherData,
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
		let sunrise;
		let sunset;
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
			sunrise = format(new Date(this.state.weatherData.daily.data[0].sunriseTime*1000), "h:mm a");
			sunset = format(new Date(this.state.weatherData.daily.data[0].sunsetTime*1000), "h:mm a");
		}
		else
		{
			averageTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh + this.state.weatherData.daily.data[index].temperatureMin)/2).toFixed() + " \u00B0" + this.state.tempScale;
			lowTemp = Number((this.state.weatherData.daily.data[index].temperatureMin).toFixed());
			highTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh).toFixed());
			feelsLike = Number((this.state.weatherData.daily.data[index].apparentTemperatureHigh + this.state.weatherData.daily.data[index].apparentTemperatureMin)/2).toFixed() + " \u00B0" + this.state.tempScale;
			range = lowTemp + " \u00B0" +this.state.tempScale + " / " + highTemp + " \u00B0" + this.state.tempScale;
			dateString = Date(this.state.weatherData.daily.data[index].time);
			date = new Date(this.state.weatherData.daily.data[index].time*1000);
			time = format(date, "EEE, MMM do, yyyy h:mm a");
			summary = this.state.weatherData.daily.data[index].summary;
			sunrise = format(new Date(this.state.weatherData.daily.data[index].sunriseTime*1000), "h:mm a");
			sunset = format(new Date(this.state.weatherData.daily.data[index].sunsetTime*1000), "h:mm a");
		}
		
		// Formats date and time appropriately
		//var formattedSunrise = format(sunrise, "EEE, MMM do, yyyy h:mm a");
		//var formattedSunset = format(sunset, "h:mm a");
    
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
						Feels like {feelsLike}
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
						<View style={{flexDirection: "column", marginRight: "15%"}}>
							<Text style={{fontSize: 20}}>Sunrise</Text>
							<Text>{sunrise}</Text>
						</View>
						<View style={{flexDirection: "column",}}>
							<Text style={{fontSize: 20}}>Sunset</Text>
							<Text>{sunset}</Text>
						</View>
					</View>
				</View>
			</View>
      );
    }
  }
}

export default WeatherData;