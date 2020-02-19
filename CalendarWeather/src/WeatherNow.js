/**
 * Simple React Native App to demonstrate using Dark Sky weather API.
 *
 */

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import WeatherApi from './WeatherApi'
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
      // Show data from API
      return (
		  <WeatherApi weatherData={this.state.weatherData} selectedDate = {this.state.selectedDate}> </WeatherApi>
      );
    }
  }
}

export default WeatherData;