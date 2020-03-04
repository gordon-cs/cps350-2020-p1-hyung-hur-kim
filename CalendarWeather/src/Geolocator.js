/*
* Geolocation handler
* Asks location access permission
* Returns latitude and longtitude of the device
*/

import React from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default async function getDeviceLocation(callback) {
    if (
      !PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
    ) {
      await requestLocationPermission();
    }
    Geolocation.getCurrentPosition(
        (position) => {
          let latLong = position.coords.latitude + ',' + position.coords.longitude;
          callback(latLong);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }

    async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Weatherly App Location Permission',
              message:
                'Weatherly App needs access to your location ' +
                'to provide an accurate local weather information.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location access granted');
          } else {
            console.log('Location access denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }