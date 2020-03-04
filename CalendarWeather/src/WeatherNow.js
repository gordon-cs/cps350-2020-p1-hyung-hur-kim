/**
 * Simple React Native App to demonstrate using Dark Sky weather API.
 *
 */

import React, { PureComponent} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  StatusBar, SafeAreaView
} from 'react-native';
import { format } from "date-fns"; // Changes date format

import moment from "moment";
import getWeatherApi from './WeatherApiFunction';
import CalendarStrip from 'react-native-calendar-strip';
import EventPicker from './EventPicker'
import WeatherIconUnderDates from './WeatherIconUnderDates';
import SplashScreen from './SplashScreen';
import getImageIcon from './ImageIconFunction';


/* WeatherData gets weather data and renders a view of the weather.
 * (Currently it "gets" static data: a fake temperature.)
 * It will eventually use data from the Dark Sky API (http://darksky.net).
 */
let sunriseImg = require('./Images/sunrise.png');
let sunsetImg = require('./Images/sunset.png');
let leftArrow = require('./Images/leftArrow.png');
let rightArrow = require('./Images/rightArrow.png');

class WeatherData extends PureComponent {
	constructor(props) {
		super(props);        // Always do this first, to make props valid
		this.state = {       // Initialize state (don't call setState in ctor)
		tempScale : "F",
		selectedDate : new Date(),
		FColor: "#C9C9C9", 
		CColor: "#606060",
		showSplashScreen: true,
		isMounted: false,
		loading:true,
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
		
		let tempScale = "F";
		let weatherData = await getWeatherApi(tempScale);

		let arrayOfIcons = [7];
		for(let i=0; i< 7; i++)
		{
			if(i==0)
			{
				arrayOfIcons[0] = await getImageIcon(weatherData.currently.icon);
			}
			else
			{
				arrayOfIcons[i] = await getImageIcon(weatherData.daily.data[i].icon);
			}
		}
		  this.setState({
			weatherData: weatherData,
			tempScale: tempScale,
			loading: false,
			icons: arrayOfIcons
		});
		
		this.setState({isMounted: true}, () => {
			this.state.isMounted &&
			  setTimeout(() => {
				this.setState({showSplashScreen: false});
			  }, 3000);
		  });
	}

	componentWillUnmount() {
		this.setState({isMounted: false});
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
			tempScale: temp,
			FColor: "#C9C9C9", 
			CColor: "#606060",
		});
	}

	async changeScaleToC() {
		let temp = "C";
		let tempWeatherDate = await getWeatherApi(temp);
		this.setState({
			weatherData: tempWeatherDate,
			tempScale: temp,
			FColor: "#606060", 
			CColor: "#C9C9C9",
		});
	}

  	render() {
		if(this.state.showSplashScreen && this.state.loading)
		{
			return (
			<>
			  <StatusBar hidden={true} />
			  <SafeAreaView style={{height: '100%'}}>
				<SplashScreen />
			  </SafeAreaView>
			</>
			);
		}
    	else {
      
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
			icon = this.state.icons[0];
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
			icon = this.state.icons[index];
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
			<View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
				<TouchableOpacity onPress={()=> this.changeScaleToC()}>
					<Text style={{color: this.state.CColor, fontSize: 20, marginLeft: 10, marginRight: 10, fontFamily: "Quicksand-Light"}}>C{" \u00B0"}</Text>
				</TouchableOpacity>
				<Text style={{color: "#606060", fontSize: 20, fontFamily: "Quicksand-Light"}}>/</Text>
				<TouchableOpacity onPress={()=> this.changeScaleToF()}>
					<Text style={{color: this.state.FColor, fontSize: 20, marginLeft: 10, marginRight: 10, fontFamily: "Quicksand-Light"} }>F{" \u00B0"}</Text>
				</TouchableOpacity>
			</View>
			
			<View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: "column", paddingBottom: 10,}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Image style={{height: 70, width: 70, marginRight: 20}} source={leftArrow}></Image>
					<Image source={icon} style={{ height: 100, width: 100, paddingBottom: 0}}/>
					<Image style={{height: 70, width: 70, marginLe: 20}} source={rightArrow}></Image>
				</View>
					
					<Text style = {{fontSize: 33, color: "#C9C9C9", paddingTop: 0}}>{averageTemp}</Text>
				
		  		
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
					<View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
						<Image source={sunriseImg} style={{ height: 80, width: 80, marginRight: 70}}/>
		  				<Text style={{fontSize: 10, color: "#C9C9C9", marginLeft: 20}}>{sunrise}</Text>
					</View>
					<View style={{flexDirection: 'column', alignItems: 'center'}}>
						<Text style={{color: "#C9C9C9", fontFamily: "Quicksand-Light"}}>{time}</Text>
						<Text style = {{color: "#C9C9C9", marginTop: 5, fontFamily: "Quicksand-Light"}}>{lowTemp} / {highTemp}</Text>
					</View>
					<View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
						<Image source={sunsetImg} style={{ height: 80, width: 80, marginLeft: 70}}/>
		  				<Text style={{fontSize: 10, color: "#C9C9C9", marginLeft: 90, fontFamily: "Quicksand-Light"}}>{sunset}</Text>
					</View>
				</View>
			</View>
			<View style={{flex: 2.5}}>
        	<CalendarStrip
				style={{ height: 100, paddingBottom: 10, fontFamily: "Quicksand-Light"}}
				calendarHeaderStyle={{ color: '#C9C9C9' , marginBottom: 10, fontFamily: "Quicksand-Light"}}
				calendarColor={"#101432"}
				dateNumberStyle={{ color: "#606060", fontFamily: "Quicksand-Light"}}
				dateNameStyle={{ color: "#606060", fontFamily: "Quicksand-Light"}}
				highlightDateNumberStyle={{ color: "#C9C9C9", fontFamily: "Quicksand-Light"}}
				highlightDateNameStyle={{ color: "#C9C9C9", fontFamily: "Quicksand-Light"}}
				iconContainer={{ justifyContent: 'space-between'}}
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