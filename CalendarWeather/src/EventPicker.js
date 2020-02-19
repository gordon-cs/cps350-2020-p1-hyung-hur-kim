//This is an example code for FlatList// 
import React from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
//import all the components we are going to use. 
import RNCalendarEvents from "react-native-calendar-events";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from "moment";

let { width } = Dimensions.get('window');
RNCalendarEvents.authorizationStatus().then(response => {
  if(response !== "authorized")
  {
    RNCalendarEvents.authorizeEventStore();
    calendars = RNCalendarEvents.findCalendars();
  }
});

let sunny = require('./clear-day.png');
let rainy = require('./rain.png');
let cloudy = require('./cloudy.png');
let partlyCloudyDay = require('./partly-cloudy-day.png');
let snow = require('./snow.png');
let clearNight = require('./clear-night.png');
let partlyCloudyNight = require('./partly-cloudy-night.png');


let calendars = [];
  
export default class EventPicker extends React.Component {  
  constructor(props) {
    super(props);
    
    this.fetchAllEvents = this.fetchAllEvents.bind(this);
    this.addEvent = this.addEvent.bind(this)

    this.state = {
      FlatListItems: [{ id: '0', value: "All Day", event:[], icon: ""}, 
      {id: '1', value: '6 AM', event: [], icon: ""},
      { id: '2', value: '7 AM', event: [], icon: ""},{ id: '3', value: '8 AM', event: [], icon: ""},
      { id: '4', value: '9 AM', event: [] , icon: "" },{ id: '5', value: '10 AM' , event: [], icon: "" },
      { id: '6', value: '11 AM' , event: [] , icon: ""},{ id: '7', value: '12 PM' , event: [] , icon: ""},
      { id: '8', value: '1 PM' , event: [] , icon: ""},{ id: '9', value: '2 PM', event: [] , icon: "" },
      { id: '10', value: '3 PM' , event: [] , icon: ""},{ id: '11', value: '4 PM' , event: [] , icon: ""},
      { id: '12', value: '5 PM' , event: [] , icon: ""},{ id: '13', value: '6 PM' , event: [] , icon: ""},
      { id: '14', value: '7 PM' , event: [] , icon: ""},{ id: '15', value: '8 PM' , event: [] , icon: ""},
      { id: '16', value: '9 PM' , event: [] , icon: ""},{ id: '17', value: '10 PM' , event: [] , icon: ""},
      { id: '18', value: '11 PM' , event: [] , icon: ""},{ id: '19', value: '12 AM' , event: [] , icon: ""},
      { id: '20', value: '1 AM' , event: [] , icon: ""},{ id: '21', value: '2 AM' , event: [] , icon: ""},
      { id: '22', value: '3 AM' , event: [] , icon: ""},{ id: '23', value: '4 AM' , event: [] , icon: ""},
      { id: '24', value: '5 AM' , event: [] , icon: ""},],
      allCalendars: [],
      currentSelectedDate: this.props.currentDate,
      allEvents: [{

      }],
      allCalendars: calendars,
      futureWeatherData: {"hourly": {
        "summary": "",
        "icon": "",
        "data": [{
            "icon": "",}]}},
      tempScale: "F"

    };
  }

  async getWeatherApi() {

    const darkskyURL = "https://api.darksky.net/forecast";
    const ApiKey = "7711c2819f294564cb912e166a5bb983";
    const latLon = "42.589611,-70.819806";

    try {
      let date = moment(this.state.currentSelectedDate).format("YYYY-MM-DD[T]00:00:00");
      let futureResponse = await fetch(darkskyURL + "/" + ApiKey + "/" + latLon  + "," + date+"?exclude=currently");
      let futureResponseJson = await futureResponse.json();
      let tempScale = "C";
      if (futureResponseJson.flags.units == "us") {
        tempScale = "F";
      } 
      this.setState({
        futureWeatherData: futureResponseJson,
        tempScale: tempScale,
      });

    
      let list = this.state.FlatListItems;

      for(let hour=0; hour<24; hour++)
      {
        let icon = this.state.futureWeatherData.hourly.data[hour].icon;
        let useIcon = sunny;

        if(icon == "rain")
        {
          useIcon = rainy;
        }
        else if (icon == "partly-cloudy-day")
        {
          useIcon = partlyCloudyDay;
        }
        else if (icon == 'snow')
        {
          useIcon = snow;
        }
        else if (icon == 'clear-night')
        {
          useIcon = clearNight;
        }
        else if (icon == 'partly-cloudy-night')
        {
          useIcon = partlyCloudyNight;
        }
        else if (icon == 'cloudy')
        {
          useIcon = cloudy;
        }
  
        if(hour >=0 && hour <=5)
        {
          list[hour+19].icon = useIcon;
        }
        else
        {
          list[hour-5].icon = useIcon;
        }
      }

      this.setState({FlatListItems: list});
      
    } catch (error) {
      console.error(error);
    }
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
    if (nextProps.currentDate !== this.props.currentDate)
      this.setState({
        currentSelectedDate: nextProps.currentDate,
      }, () => {this.fetchAllEvents()});
      
    }
  
componentDidMount() {
    
    this.getCalendars();
    this.fetchAllEvents();
    this.getWeatherApi();
  }

  resetFlatList()
  {
    let newFlatList = 
      [{ id: '0', value: "All Day", event:[], icon: ""}, 
      {id: '1', value: '6 AM', event: [], icon: ""},
      { id: '2', value: '7 AM', event: [], icon: ""},{ id: '3', value: '8 AM', event: [], icon: ""},
      { id: '4', value: '9 AM', event: [] , icon: "" },{ id: '5', value: '10 AM' , event: [], icon: "" },
      { id: '6', value: '11 AM' , event: [] , icon: ""},{ id: '7', value: '12 PM' , event: [] , icon: ""},
      { id: '8', value: '1 PM' , event: [] , icon: ""},{ id: '9', value: '2 PM', event: [] , icon: "" },
      { id: '10', value: '3 PM' , event: [] , icon: ""},{ id: '11', value: '4 PM' , event: [] , icon: ""},
      { id: '12', value: '5 PM' , event: [] , icon: ""},{ id: '13', value: '6 PM' , event: [] , icon: ""},
      { id: '14', value: '7 PM' , event: [] , icon: ""},{ id: '15', value: '8 PM' , event: [] , icon: ""},
      { id: '16', value: '9 PM' , event: [] , icon: ""},{ id: '17', value: '10 PM' , event: [] , icon: ""},
      { id: '18', value: '11 PM' , event: [] , icon: ""},{ id: '19', value: '12 AM' , event: [] , icon: ""},
      { id: '20', value: '1 AM' , event: [] , icon: ""},{ id: '21', value: '2 AM' , event: [] , icon: ""},
      { id: '22', value: '3 AM' , event: [] , icon: ""},{ id: '23', value: '4 AM' , event: [] , icon: ""},
      { id: '24', value: '5 AM' , event: [] , icon: ""},];
    this.setState({FlatListItems: newFlatList});
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
    this.resetFlatList();
    let allEvents = {};
    try {
      allEvents = await RNCalendarEvents.fetchAllEvents(
        (moment(this.state.currentSelectedDate)).format("YYYY-MM-DD[T]00:00:00.000[Z]"),
        (moment(this.state.currentSelectedDate)).add(1, 'day').format("YYYY-MM-DD[T]00:00:00.000[Z]"),
      );
      console.log(allEvents);
    } catch (error) {
      Alert.alert("Failed to get events");
    }
    let list = this.state.FlatListItems;
    
      for(let i=0; i< allEvents.length; i++)
      {

        
        let startDate = moment(allEvents[i].startDate);
        let hour = new Date(startDate).getHours();
        let endDate = moment(allEvents[i].endDate);
        
        if(allEvents[i].allDay)
        {
          
          list[0].event = [allEvents[i].startDate, allEvents[i].endDate, allEvents[i].title, allEvents[i].location];
        }
        else if(hour >= 6 && hour <=23)
        {
          
          list[hour-5].event = [allEvents[i].startDate, allEvents[i].endDate, allEvents[i].title, allEvents[i].location]
        }
        else
        {
          list[hour-19].event = [allEvents[i].startDate, allEvents[i].endDate, allEvents[i].title, allEvents[i].location]
        }
      }
      this.setState({FlatListItems: list});
      this.getWeatherApi();
  };

  FlatListItemSeparator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

  addEvent() {
    const eventConfig = {
      title: "",
      // and other options
    };
    AddCalendarEvent.presentEventCreatingDialog(eventConfig).then((eventInfo) => {
    if(eventInfo.action === "SAVED")
    {
      this.fetchAllEvents();
    }
    else
    {
      console.warn(JSON.stringify(eventInfo));
    }
  })
  .catch((error) => {
    // handle error such as when user rejected permissions
    console.warn(error);
  });
  }
    
  render() 
  {
    return (
      <FlatList
        data={this.state.FlatListItems}
        //data defined in constructor
        ItemSeparatorComponent={this.FlatListItemSeparator}
        //Item Separator View
        renderItem={({ item}) => (          
          <View style = {styles.container}>
            <TouchableOpacity style = {styles.list} onPress={()=>this.addEvent()}>
              <View>
                <Text
                  style={styles.item}>
                  {item.value}
                </Text>
              </View>
              <View>
                <Image source={item.icon} style={{height: 50, width: 50}} />
              </View>
              <TouchableOpacity>
                <View  style={{backgroundColor:'lightgrey'}}>
                  <Text>{item.event}</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
            
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



  }});