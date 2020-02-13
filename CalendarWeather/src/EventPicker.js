//This is an example code for FlatList// 
import React from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert, Dimensions} from 'react-native';
//import all the components we are going to use. 
import RNCalendarEvents from "react-native-calendar-events";
import EventCalendar from 'react-native-events-calendar';
import moment from "moment";

let { width } = Dimensions.get('window');
var date = new Date();
var offsetInHours = date.getTimezoneOffset() / 60;

let calendars = [];
RNCalendarEvents.authorizationStatus().then(response => {
  if(response !== "authorized")
  {
    RNCalendarEvents.authorizeEventStore();
    calendars = RNCalendarEvents.findCalendars();
  }
});
  
 
export default class EventPicker extends React.Component {

  
  constructor(props) {
    super(props);
    
    this.state = {
      FlatListItems: [
         { id: '0', value: "All Day", event: ""}, {id: '1', value: '6 AM', event: "" },
         { id: '2', value: '7 AM', event: ""},{ id: '3', value: '8 AM', event: ""},
         { id: '4', value: '9 AM', event: ""  },{ id: '5', value: '10 AM' , event: "" },
         { id: '6', value: '11 AM' , event: "" },{ id: '7', value: '12 PM' , event: "" },
         { id: '8', value: '1 PM' , event: "" },{ id: '9', value: '2 PM', event: ""  },
         { id: '10', value: '3 PM' , event: "" },{ id: '11', value: '4 PM' , event: "" },
         { id: '12', value: '5 PM' , event: "" },{ id: '13', value: '6 PM' , event: "" },
         { id: '14', value: '7 PM' , event: "" },{ id: '15', value: '8 PM' , event: "" },
         { id: '16', value: '9 PM' , event: "" },{ id: '17', value: '10 PM' , event: "" },
         { id: '18', value: '11 PM' , event: "" },{ id: '19', value: '12 AM' , event: "" },
         { id: '20', value: '1 AM' , event: "" },{ id: '21', value: '2 AM' , event: "" },
         { id: '22', value: '3 AM' , event: "" },{ id: '23', value: '4 AM' , event: "" },
         { id: '24', value: '5 AM' , event: "" },],
      allCalendars: [],
      currentDate: '2/12/2020',
      allEvents: [],
      events: [
        {
          start: '2020-02-14 01:30:00',
          
          title: 'Mine',
          end: '2020-02-14 02:30:00',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: 'green',
        },
        {
          start: '2020-02-14 22:30:00',
          end: '2020-02-14 23:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
      ],
      allCalendars: calendars,

    };
  }

  _eventTapped(event) {
    alert(JSON.stringify(event));
  }


componentDidMount() {
    this.getCalendars();
    this.fetchAllEvents();
    
  }
  getCalendars = async () => {
    try {
      let availableCalendars = await RNCalendarEvents.findCalendars();
      this.setState({allCalendars: availableCalendars});
    } catch (error) {
      Alert.alert("Failed to ask permission");
    }
  };
  

  fetchAllEvents = async () => {
    let allEvents = {};
    try {
      allEvents = await RNCalendarEvents.fetchAllEvents(
        "2020-02-11T00:00:00.000Z",
        "2020-02-15T00:00:00.000Z",
      );
    } catch (error) {
      Alert.alert("Failed to get events");
    }
    let sortedEvents = [allEvents.length];

      for(let i=0; i< allEvents.length; i++)
      {
        const startDate = moment(allEvents[i].startDate, ["YYYY-MM-DD[T]HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(allEvents[i].endDate, ["YYYY-MM-DD[T]HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss");
        //console.log((allEvents[i].startDate.replace('T', " ").split("."))[0]);
        //console.log((allEvents[i].endDate.replace('T', " ").split("."))[0]);c
        console.log(allEvents[i].title);
        console.log(startDate);
        sortedEvents[i] ={'start': startDate, 
                          'end': endDate, 
                          'title': allEvents[i].title, 'summary': allEvents[i].location,
                          'color': allEvents[i].color};
        
      }
        this.setState({allEvents: sortedEvents});
  };

  render() 
  
  {
    return (
      <View style={{ flex: 1 }}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.allEvents}
          width={width}
          initDate={'2020-02-12'}
          scrollToFirst
          upperCaseHeader
          scrollToFirst={true}
          styles= {{
            header: {
              
            },
            line: {
              backgroundColor: 'grey',
              opacity: 0.3
            },
        }}
          
        />
      </View>
    );
  }
}
