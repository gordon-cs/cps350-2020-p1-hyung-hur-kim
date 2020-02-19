import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import getWeatherApi from './WeatherApiFunction';

let sunny = require('./clear-day.png');
let rainy = require('./rain.png');
let cloudy = require('./cloudy.png');
let partlyCloudyDay = require('./partly-cloudy-day.png');
let snow = require('./snow.png');
let clearNight = require('./clear-night.png');
let partlyCloudyNight = require('./partly-cloudy-night.png');

export default class WeatherIconUnderDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WeatherIcons: [
        {image:""},
        {image: ""},
        {image:""},
        {image:""},
        {image:""},
        {image:""},
        {image:""},],
        currentDate: this.props.currentDate,
      };
  }

  async componentDidMount() {
    let weatherData = await getWeatherApi();
    this.setState({
        weatherData: weatherData,
      });
    this.setIconsPerDay();
  }

  setIconsPerDay() {
    let arrayOfIcons = this.state.WeatherIcons;
    for(let i=0; i< 7; i++)
    {
        let icon = this.state.weatherData.daily.data[i].icon;
        let useIcon = sunny;

        if(icon == "rain")
        {
          useIcon = rainy;
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
        arrayOfIcons[i].image = useIcon;
    }
    this.setState({WeatherIcons: arrayOfIcons});
  }

 // Weather icon "sunny.png", "rainy.png" and "cloudy.png" by Sihan Liu
 // is licensed under CC BY 3.0 https://www.iconfinder.com/iconsets/weather-color-2

  render() {
    return (
      <SafeAreaView style={styles.MainContainer}>
        <FlatList
          horizontal={true}
          data={this.state.WeatherIcons}
          renderItem={({ item }) => (
            <View>
              <Image style={styles.item}                                                        
                source={item.image}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}  

const styles = StyleSheet.create({
  MainContainer: {
    paddingLeft: 36,
    marginBottom: 5,
    marginTop: 1,
},

  item: {
    //justifyContent: 'space-evenly',
    marginRight: 6.8,
    width: 40,
    height: 40,
  },
});