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
      };
  }

  async componentDidMount() {
    let weatherData = await getWeatherApi("F");
    this.setState({
        weatherData: weatherData,
      });
    this.setIconsPerDay();
  }

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
    justifyContent: 'space-evenly',
},

  item: {
    marginHorizontal: 8,
    width: 40,
    height: 40,
  },
});