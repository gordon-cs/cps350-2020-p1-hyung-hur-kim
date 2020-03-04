import React, {PureComponent} from 'react';
import {StyleSheet, Image, ImageBackground, Dimensions} from 'react-native';
// Gets the full height of the screen
const screenHeight = Math.floor(Dimensions.get('window').height);

export default class SplashScreen extends PureComponent {
  render() {
    return (
      <ImageBackground
        resizeMode={'cover'}
        source={require('./Images/splashscreen.png')}
        style={styles.intro}>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    justifyContent: 'center',
  },
});