import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import getWeatherApi from './WeatherApiFunction';

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

export default class WeatherIconUnderDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WeatherIcons: [
        {image:""},
        {image:""},
        {image:""},
        {image:""},
        {image:""},
        {image:""},
        {image:""},],
        selectedDate: this.props.currentSelectedDate,
      };
  }

  async componentDidMount() {
    let weatherData = await getWeatherApi("F");
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
        let useIcon = clearDay;

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
        arrayOfIcons[i].image = useIcon;
    }
    this.setState({WeatherIcons: arrayOfIcons});
  }

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
    marginBottom: 5,
    marginTop: 1,
    justifyContent: 'space-evenly'
},

  item: {
    marginHorizontal: 8,
    width: 40,
    height: 40,
  },
});