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
      allCalendars: [],
      currentDate: moment(this.props.currentDate).format("YYYY-MM-DD"),
      allEvents: [],
      allCalendars: calendars,

    };
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.currentDate !== this.props.currentDate) {
      this.setState({
        currentDate: moment(nextProps.currentDate).format("YYYY-MM-DD")
      });
    }
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
        moment().format("YYYY-MM-DD[T]00:00:00.000[Z]"),
        moment().add(7, 'day').format("YYYY-MM-DD[T]00:00:00.000[Z]"),
      );
    } catch (error) {
      Alert.alert("Failed to get events");
    }
    let sortedEvents = [allEvents.length];
      for(let i=0; i< allEvents.length; i++)
      {
        const startDate = moment(allEvents[i].startDate).format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(allEvents[i].endDate).format("YYYY-MM-DD HH:mm:ss");

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
          renderEvent={(event)=> <View><Text>{event.summary}</Text></View>}
          events={this.state.allEvents}
          width={width}
          initDate={this.state.currentDate}
          dateChanged={()=>this.state.currentDate}
          scrollToFirst
          format24h={false}
          upperCaseHeader
          scrollToFirst={true}
          renderEvent={(event) => 
            <Text>{event.title}</Text>}
          styles= {{
            header: {
              opacity: 0,
              height: 0,
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
