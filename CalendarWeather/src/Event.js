
/*This is an Example of Calendar With Events*/
import React from 'react';
//import react in our project
import { Dimensions, View } from 'react-native';
//import basic react native components
import EventCalendar from 'react-native-events-calendar';
//import EventCalendar component
let { width } = Dimensions.get('window');
//get the size of device

export default class Event extends React.Component {
	constructor(props) {
		super(props);
		//Dummy event data to list in calendar 
		//You can also get the data array from the API call
		this.state = {
		  events: [
			{
			  start: '2020-02-04 00:00:00',
			  end: '2020-02-04 02:00:00',
			  title: 'Working on Project',
			  summary: 'xyz Location',
			}
		  ],
		  location: this.props.location,
		};
	  }
	  eventClicked(event) {
		//On Click oC a event showing alert from here
		alert(JSON.stringify(event));
	  }
	 
	  render() {
		return (
			<EventCalendar
			  eventTapped={this.eventClicked.bind(this)}
			  //Function on event press
			  events={this.state.events}
			  //passing the Array of event
			  width={width}
			  //Container width
			  size={60}
			  //number of date will render before and after initDate 
			  //(default is 30 will render 30 day before initDate and 29 day after initDate)
			  initDate={this.state.location}
			  //show initial date (default is today)
			  scrollToFirst
			  //scroll to first event of the day (default true)
			  
			/>
		);
	  }
	}