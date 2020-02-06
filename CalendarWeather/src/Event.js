import RNCalendarEvents from "react-native-calendar-events";

import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";

export default class Event extends Component {
  _getCalendarStatus = async () => {
    try {
      let calendarAuthStatus = await RNCalendarEvents.authorizationStatus();
      Alert.alert("Calendar Status", calendarAuthStatus, ["OK"]);
    } catch (error) {
      Alert.alert("Failed to get Calendar Status");
    }
  };

  _requestCalendarPermissions = async () => {
    try {
      let requestCalendarPermission = await RNCalendarEvents.authorizeEventStore();
      Alert.alert("Calendar Permission", requestCalendarPermission, ["OK"]);
    } catch (error) {
      Alert.alert("Failed to ask permission");
    }
  };

  _getCalendars = async () => {
    try {
      let availableCalendars = await RNCalendarEvents.findCalendars();
      Alert.alert("Available Calendars", JSON.stringify(availableCalendars), [
        "OK"
      ]);
    } catch (error) {
      Alert.alert("Failed to ask permission");
    }
  };

  _fetchAllEvents = async () => {
    try {
      let allEvents = await RNCalendarEvents.fetchAllEvents(
        "2019-01-19T19:26:00.000Z",
        "2019-02-19T19:26:00.000Z"
      );
      console.log(allEvents);
      Alert.alert("Available Events", JSON.stringify(allEvents));
    } catch (error) {
      Alert.alert("Failed to get events");
    }
  };

  render() {
    return (
      <View>
        <Button
          title={"Get Calendar Status"}
          onPress={this._getCalendarStatus}
        />
        <Button
          title={"Request Calendar Permission"}
          onPress={this._requestCalendarPermissions}
        />
        <Button
          title={"Get Available Calendars"}
          onPress={this._getCalendars}
        />
        <Button title={"Fetch All Events"} onPress={this._fetchAllEvents} />
      </View>
    );
  }
}