/**
 * Simple React Native App to demonstrate using Dark Sky weather API.
 *
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image
} from 'react-native';
import { format } from "date-fns"; // Changes date format

import moment from "moment";
import getWeatherApi from './WeatherApiFunction';
import LocationPicker from './DropdownLocationPicker';
import CalendarStrip from 'react-native-calendar-strip';
import EventPicker from './EventPicker'
import WeatherIconUnderDates from './WeatherIconUnderDates'


/* WeatherData gets weather data and renders a view of the weather.
 * (Currently it "gets" static data: a fake temperature.)
 * It will eventually use data from the Dark Sky API (http://darksky.net).
 */

let clearDay = require('./weather-icons_clear-day-2.png');
let clearNight = require('./weather-icons_clear-night-2.png');
let cloudy = require('./weather-icons_cloudy-2.png');
let fog = require('./weather-icons_fog-2.png');
let partlyCloudyDay = require('./weather-icons_partly-cloudy-day-2.png');
let partlyCloudyNight = require('./weather-icons_partly-cloudy-night-2.png');
let rain = require('./weather-icons_rain-2.png');
let sleet = require('./weather-icons_sleet-2.png');
let snow = require('./weather-icons_snow-2.png');
let thunderstorm = require('./weather-icons_thunderstorm-2.png');
let wind = require('./weather-icons_wind-2.png');

class WeatherData extends Component {
	constructor(props) {
		super(props);        // Always do this first, to make props valid
		this.state = {       // Initialize state (don't call setState in ctor)
		isLoading: true,
		tempScale : "F",
		selectedDate : this.props.currentSelectedDate,
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
		//let weatherDataSI = await getWeatherApiSI();
		
		if (weatherData.flags.units == "us") {
			tempScale = "F";
		}
		
		this.setState({
			weatherData: weatherData,
			tempScale: tempScale,
			isLoading: false,
		});
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// Any time props.email changes, update state.
		if (nextProps.currentSelectedDate !== this.props.currentSelectedDate)
		this.setState({
			selectedDate: nextProps.currentSelectedDate,
		});
	}
	
	async changeScaleToF()
	{
		let temp = "F";
		let tempWeatherDate = await getWeatherApi(temp);
		this.setState({
			weatherData: tempWeatherDate,
			tempScale: temp
		});
	}

	async changeScaleToC() {
		let temp = "C";
		let tempWeatherDate = await getWeatherApi(temp);
		this.setState({
			weatherData: tempWeatherDate,
			tempScale: temp
		});
	}

	findTodayIcon(icon)
	{
		let useIcon;

		if(icon == "clear-day")
		{
			icon = clearDay;
		}
		if(icon == "sleet")
		{
			icon = sleet;
		}
		if(icon == "thunderstorm")
		{
			icon = thunderstorm;
		}
		else if(icon == "fog")
		{
			icon = fog;
		}
		else if(icon == "wind")
		{
			icon = wind;
		}
		else if(icon == "rain")
        {
          useIcon = rain;
        }
        else if (icon == "partly-cloudy-day")
        {
          useIcon = partlyCloudyDay;
        }
        else if (icon == 'snow')
        {
          useIcon = snow;
        }
        else if (icon == 'clear-night')
        {
          useIcon = clearNight;
        }
        else if (icon == 'partly-cloudy-night')
        {
          useIcon = partlyCloudyNight;
        }
        else if (icon == 'cloudy')
        {
          useIcon = cloudy;
		}
		return useIcon;
	}

	changeBackground() {
		return ({
			backgroundColor: "white"
		});
	}

  	render() {

    if (this.state.isLoading) {
      // No data, show something in the meantime
      return (
        <Text style={{color: "#C9C9C9", fontStyle: "Quicksand"}}>Waiting for data ...
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
		let currentSelectedDate = new Date(moment()).getDate();
		let index = selectedDate - currentSelectedDate;
		let date = currentSelectedDate;
		let sunrise;
		let sunset;
		let icon;
    if(index === 0)
		{
			icon = this.findTodayIcon(this.state.weatherData.currently.icon);
			averageTemp = Number((this.state.weatherData.currently.temperature).toFixed()) + " \u00B0" + this.state.tempScale;
			lowTemp = Number((this.state.weatherData.daily.data[0].temperatureMin).toFixed());
			highTemp = Number((this.state.weatherData.daily.data[0].temperatureHigh).toFixed()) + " \u00B0" + this.state.tempScale;
			feelsLike = Number((this.state.weatherData.currently.apparentTemperature).toFixed()) + " \u00B0" + this.state.tempScale;
			range = lowTemp + " \u00B0" + this.state.tempScale + " / " + highTemp + " \u00B0" + this.state.tempScale;
			dateString = Date(this.state.weatherData.currently.time).toString();
			date = new Date(dateString);
			time = format(date, "MMM do, yyyy");
			summary = this.state.weatherData.currently.summary;
			sunrise = format(new Date(this.state.weatherData.daily.data[0].sunriseTime*1000), "h:mm a");
			sunset = format(new Date(this.state.weatherData.daily.data[0].sunsetTime*1000), "h:mm a");
		}

		else
		{
			icon = this.findTodayIcon(this.state.weatherData.daily.data[index].icon);
			averageTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh + this.state.weatherData.daily.data[index].temperatureMin)/2).toFixed() + " \u00B0" + this.state.tempScale;
			lowTemp = Number((this.state.weatherData.daily.data[index].temperatureMin).toFixed());
			highTemp = Number((this.state.weatherData.daily.data[index].temperatureHigh).toFixed()) + " \u00B0" + this.state.tempScale;
			feelsLike = Number((this.state.weatherData.daily.data[index].apparentTemperatureHigh + this.state.weatherData.daily.data[index].apparentTemperatureMin)/2).toFixed() + " \u00B0" + this.state.tempScale;
			range = lowTemp + " \u00B0" +this.state.tempScale + " / " + highTemp + " \u00B0" + this.state.tempScale;
			dateString = Date(this.state.weatherData.daily.data[index].time);
			date = new Date(this.state.weatherData.daily.data[index].time*1000);
			time = format(date, "MMM do, yyyy");
			summary = this.state.weatherData.daily.data[index].summary;
			sunrise = format(new Date(this.state.weatherData.daily.data[index].sunriseTime*1000), "h:mm a");
			sunset = format(new Date(this.state.weatherData.daily.data[index].sunsetTime*1000), "h:mm a");
		}
		
		// Formats date and time appropriately
		//var formattedSunrise = format(sunrise, "EEE, MMM do, yyyy h:mm a");
		//var formattedSunset = format(sunset, "h:mm a");
    
      	return (
		<View style={{flex: 1, backgroundColor: '#101432', }}>
			<View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 10}}>
				<TouchableOpacity onPress={()=> this.changeScaleToC()}>
					<Text style={{color: "#C9C9C9", fontSize: 20, mmarginLeft: 10, marginRight: 10}}>C{" \u00B0"}</Text>
				</TouchableOpacity>
				<Text style={{color: "#C9C9C9", fontSize: 20}}>/</Text>
				<TouchableOpacity onPress={()=> this.changeScaleToF()}>
					<Text style={{color: "#C9C9C9", fontSize: 20, marginLeft: 10, marginRight: 10} }>F{" \u00B0"}</Text>
				</TouchableOpacity>
			</View>
			
			<View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: "column"}}>
				<Image source={icon} style={{ height: "30%", width: "30%"}}/>
		  		<Text style = {{fontSize: 50, color: "#C9C9C9"}}>{averageTemp}</Text>
				<Text style={{color: "#C9C9C9"}}>{time}</Text>
		  		<Text style = {{color: "#C9C9C9"}}>{lowTemp} / {highTemp}</Text>
			</View>
			<View style={{flex: 2}}>
        	<CalendarStrip
				style={{ height: 100, paddingTop: 20, paddingBottom: 10}}
				calendarHeaderStyle={{ color: '#C9C9C9' }}
				calendarColor={"#101432"}
				dateNumberStyle={{ color: "#606060" }}
				dateNameStyle={{ color: "#606060"}}
				highlightDateNumberStyle={{ color: "#C9C9C9" }}
				highlightDateNameStyle={{ color: "#C9C9C9"}}
				iconContainer={{ flex: 0.1 }}
				useIsoWeekday = {false}
				startingDate = {new Date()}
				onDateSelected = {(newDate) => this.setState({selectedDate: new Date(newDate)})}
				leftSelector = {[]}
				rightSelector = {[]}




			/>
			<WeatherIconUnderDates currentSelectedDate = {this.state.selectedDate}></WeatherIconUnderDates>
			<EventPicker currentSelectedDate = {this.state.selectedDate} tempScale = {this.state.tempScale}></EventPicker>
			</View>
		</View>
        );
    }
}
}




export default WeatherData;