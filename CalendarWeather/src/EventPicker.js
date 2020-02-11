//This is an example code for FlatList// 
import React from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert, Button} from 'react-native';
//import all the components we are going to use. 
import RNCalendarEvents from "react-native-calendar-events";

RNCalendarEvents.authorizationStatus().then(response => {
  if(response !== "authorized")
  {
    RNCalendarEvents.authorizeEventStore();
  }
});
  
 
export default class DisplayWeather extends React.Component {

  
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
      currentDate: this.props.currentDate,
      allEvents: [],
    };
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
    try {
      let sortedEvents = [];
      let allEvents = await RNCalendarEvents.fetchAllEvents(
        "2019-01-19T19:26:00.000Z",
        "2019-02-19T19:26:00.000Z"
      );
      Alert.alert("Available Events", JSON.stringify(allEvents));
      for(let i=0; i< allEvents.length; i++)
      {
        sortedEvents[i] = {'startDate': allEvents[i].startDate, 'endDate': allEvents[i].endDate, 
                          'title': allEvents[i].title, 'color': allEvents[i].color,
                          'location': allEvents[i].location, 'allDay': allEvents[i].allDay
        };
      }
      this.setState({allEvents: JSON.stringify(sortedEvents)});
    } catch (error) {
      Alert.alert("Failed to get events");
    }
  };

  setEvent() {
    let allEvents = this.state.allEvents;
    let tempList = this.state.FlatListItems;
    for(let i=0; i<allEvents.length; i++)
    {
      if(allEvents[i].allDay)
      {
        
      }
    }
  }

  
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 1, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };
  GetItem(item) {
    //Function for click on an item
    Alert.alert(item);
  }

  render() {
    return (
      <FlatList
          data={this.state.FlatListItems}
          //data defined in constructor
          ItemSeparatorComponent={this.FlatListItemSeparator}
          //Item Separator View
          renderItem={({ item}) => 
          (
            // Single Comes here which will be repeatative for the FlatListItems
            <View style = {styles.container}>
              <View style = {styles.list}>
                <Text
                  style={styles.item}
                  onPress={this.GetItem.bind(this, 'Id : '+item.id+' Value : '+item.value)}>
                  {item.value}
                </Text>
                <Text style={styles.event}>
                  {item.event}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },


  list: {
    flexDirection: 'row',
    
  },
 
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  event: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginLeft: 'auto'
    
    

  }
});