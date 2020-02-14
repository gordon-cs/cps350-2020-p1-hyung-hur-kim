//This is an example code for FlatList// 
import React from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert, Dimensions, ScrollView} from 'react-native';
//import all the components we are going to use. 
import RNCalendarEvents from "react-native-calendar-events";
import EventCalendar from 'react-native-events-calendar';
import moment from "moment";

let { width } = Dimensions.get('window');

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
        { id: '1', value: 'A' },
        { id: '2', value: 'B' },
        { id: '3', value: 'C' },
        { id: '4', value: 'D' },
        { id: '5', value: 'E' },
        { id: '6', value: 'F' },
        { id: '7', value: 'G' },
        { id: '8', value: 'H' },
        { id: '9', value: 'I' },
        { id: '10', value: 'J' },
        { id: '11', value: 'K' },
        { id: '12', value: 'L' },
        { id: '13', value: 'M' },
        { id: '14', value: 'N' },
        { id: '15', value: 'O' },
        { id: '16', value: 'P' },
        { id: '17', value: 'Q' },
        { id: '18', value: 'R' },
        { id: '19', value: 'S' },
        { id: '20', value: 'T' },
        { id: '21', value: 'U' },
        { id: '22', value: 'V' },
        { id: '23', value: 'W' },
        { id: '24', value: 'X' },
        { id: '25', value: 'Y' },
        { id: '26', value: 'Z' },
      ],
      allCalendars: [],
      currentDate: moment(this.props.currentDate).format("YYYY-MM-DD"),
      allEvents: [],
      allCalendars: calendars,

    };
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
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
      

      <View style={{ flex: 1, flexDirection: "row"}}>
        <FlatList contentContainerStyle= {{justifyContent: 'flex-start', marginLeft: 10, marginRight: 30, marginBottom: 10, marginTop: 30,}}
          data={this.state.FlatListItems}
          //data defined in constructor
          ItemSeparatorComponent={this.FlatListItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <View style={{height: 85, marginTop: 50, marginBottom: 50, padding: 10,}}>
              <Text>
                {item.value}
              </Text>
            </View>
          )}
        />
        <EventCalendar
          
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
            container: {
              flex: 30
            }
        }}
          
        />
      </View>
    );
  }
}
