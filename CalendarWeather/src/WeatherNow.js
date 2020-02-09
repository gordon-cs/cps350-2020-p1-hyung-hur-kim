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
    }
    // Set up methods by binding this for them
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /* Get real API data when component is first loaded.
   * (Later, might want to refresh this periodically)
   * Caution: repo must stay private since it contains secret API key.
   * Todo: move API key to a file not in repo.
   */
  componentDidMount() {
    this.getWeatherApi();
  }

  /* Get weather data from API and put it in state.weatherData.
   * Update state.isLoading.
   */
  async getWeatherApi() {

    const darkskyURL = "https://api.darksky.net/forecast";
    const ApiKey = "7711c2819f294564cb912e166a5bb983";
    const latLon = "42.589611,-70.819806";

    try {
      let response = await fetch(darkskyURL + "/" + ApiKey + "/" + latLon);
      let responseJson = await response.json();
      let tempScale = "C";
      if (responseJson.flags.units == "us") {
        tempScale = "F";
      }
      this.setState({
        isLoading: false,
        weatherData: responseJson,
        tempScale: tempScale,
      });
    } catch (error) {
      console.error(error);
    }
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
		  <WeatherApi weatherData={this.state.weatherData}> </WeatherApi>
      );
    }
  }
}

export default WeatherData;
