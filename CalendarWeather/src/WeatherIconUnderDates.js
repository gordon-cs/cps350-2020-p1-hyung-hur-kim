import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';

export default class WeatherIconUnderDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WeatherIcons: [
        {image:require('./sunny.png')},
        {image:require('./cloudy.png')},
        {image:require('./sunny.png')},
        {image:require('./sunny.png')},
        {image:require('./sunny.png')},
        {image:require('./rainy.png')},
        {image:require('./rainy.png')},]
      };
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