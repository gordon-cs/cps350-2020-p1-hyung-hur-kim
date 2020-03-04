import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import getWeatherApi from './WeatherApiFunction';
import getImageIcon from './ImageIconFunction';

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
        latLon: "0.0",
        isLoading: true,
      };
      
  }

  async componentDidMount() {
    latLon = getDeviceLocation(this.updateLocation);
    let weatherData = await getWeatherApi("F", latLon);
    this.setState({
        weatherData: weatherData,
      });
    this.setIconsPerDay();
  }

  updateLocation = latLon => {
		this.setState({latLon});
		this.setState({
		  isLoading: false,
		});
	  };

  async setIconsPerDay() {

    let arrayOfIcons = this.state.WeatherIcons;
    for(let i=0; i< 7; i++)
    {
        let icon = this.state.weatherData.daily.data[i].icon;
        arrayOfIcons[i].image = await getImageIcon(icon);
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
    alignItems: 'center',
},

  item: {
    marginHorizontal: 5.5,
    width: 40,
    height: 40,
    alignContent: 'space-around'
  },
});