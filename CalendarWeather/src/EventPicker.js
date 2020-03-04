//This is an example code for FlatList// 
import React from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
//import all the components we are going to use. 
import RNCalendarEvents from "react-native-calendar-events";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from "moment";
import { format } from "date-fns";

RNCalendarEvents.authorizationStatus().then(response => {
  if(response === "authorized")
  {
    RNCalendarEvents.authorizeEventStore();
    calendars = RNCalendarEvents.findCalendars();
  }
});

let clearDay = require('./Images/weather-icons_clear-day-2.png');
let clearNight = require('./Images/weather-icons_clear-night-2.png');
let cloudy = require('./Images/weather-icons_cloudy-2.png');
let fog = require('./Images/weather-icons_fog-2.png');
let partlyCloudyDay = require('./Images/weather-icons_partly-cloudy-day-2.png');
let partlyCloudyNight = require('./Images/weather-icons_partly-cloudy-night-2.png');
let rain = require('./Images/weather-icons_rain-2.png');
let sleet = require('./Images/weather-icons_sleet-2.png');
let snow = require('./Images/weather-icons_snow-2.png');
let thunderstorm = require('./Images/weather-icons_thunderstorm-2.png');
let wind = require('./Images/weather-icons_wind-2.png');

let calendars = [];
  
export default class EventPicker extends React.Component {  
  constructor(props) {
    super(props);
    
    this.fetchAllEvents = this.fetchAllEvents.bind(this);
    this.state = {
      FlatListItems: [{ id: '0', value: "12 AM", event:[], icon: "", temp: "", eventID: ""}, 
      {id: '1', value: '1 AM', event: [], icon: "", temp: "", eventID: ""},
      { id: '2', value: '2 AM', event: [], icon: "", temp: "", eventID: ""},{ id: '3', value: '3 AM', event: [], icon: "", temp: "", eventID: ""},
      { id: '4', value: '4 AM', event: [] , icon: "" , temp: "", eventID: ""},{ id: '5', value: '5 AM' , event: [], icon: "" , temp: "", eventID: ""},
      { id: '6', value: '6 AM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '7', value: '7 AM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '8', value: '8 AM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '9', value: '9 AM', event: [] , icon: "" , temp: "", eventID: ""},
      { id: '10', value: '10 AM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '11', value: '11 AM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '12', value: '12 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '13', value: '1 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '14', value: '2 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '15', value: '3 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '16', value: '4 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '17', value: '5 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '18', value: '6 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '19', value: '7 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '20', value: '8 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '21', value: '9 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '22', value: '10 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '23', value: '11 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '24', value: 'All day' , event: [] , icon: "", temp: "", eventID: ""}, { id: '25', value: 'Powered by Dark Sky' , event: [] , icon: "", temp: "", eventID: ""}],
      allCalendars: [],
      currentSelectedDate: this.props.currentSelectedDate,
      allEvents: [{

      }],
      allCalendars: calendars,
      futureWeatherData: {"hourly": {
        "summary": "",
        "icon": "",
        "data": [{
            "icon": "",}]}},
      tempScale: this.props.tempScale,

    };
  }

  async getWeatherApi() {

    const darkskyURL = "https://api.darksky.net/forecast";
    const ApiKey = "7711c2819f294564cb912e166a5bb983";
    const latLon = "42.589611,-70.819806";
      let date = moment(this.state.currentSelectedDate).format("YYYY-MM-DD[T]00:00:00");

      let response, responseJson;
      if (this.state.tempScale == "F") {
        try {
          response = await fetch(darkskyURL + "/" + ApiKey + "/" + latLon + "," + date+ "?exclude=currently");
          responseJson = await response.json();
        } catch (error) {
            return error; }
      } else {
        try {
          response = await fetch(darkskyURL + "/" + ApiKey + "/" + latLon + "," + date+ "?units=si");
	        responseJson = await response.json();
        } catch (error) {
          return error; }
      }

      this.setState({futureWeatherData: responseJson});
      let list = this.state.FlatListItems;

      for(let hour=0; hour<24; hour++)
      {
        let icon = this.state.futureWeatherData.hourly.data[hour].icon;
        let temperature = Math.round(responseJson.hourly.data[hour].temperature) + " \u00B0" + this.state.tempScale;
        let useIcon = clearDay;

		    if(icon == "sleet")
		    {
		    	useIcon = sleet;
		    }
		    if(icon == "thunderstorm")
		    {
		    	useIcon = thunderstorm;
		    }
		    else if(icon == "fog")
		    {
		    	useIcon = fog;
		    }
		    else if(icon == "wind")
		    {
		    	useIcon = wind;
		    }
		    else if(icon == "rain")
        {
          useIcon = rain;
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
          list[hour].icon = useIcon;
          list[hour].temp = temperature;
        }
        else
        {
          list[hour].icon = useIcon;
          list[hour].temp = temperature;
        }
      }

      this.setState({FlatListItems: list});
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0, width: '50%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.currentSelectedDate !== this.props.currentSelectedDate)
      this.setState({
        currentSelectedDate: nextProps.currentSelectedDate,
      }, () => {this.fetchAllEvents()});
    if(nextProps.tempScale !== this.props.tempScale)
      this.setState({
        tempScale: nextProps.tempScale
      }, () => {this.getWeatherApi()});
      
    }
  
componentDidMount() {
    
    this.getCalendars();
    this.fetchAllEvents();
    this.getWeatherApi();
  }

  resetFlatList()
  {
    let newFlatList = 
      [{ id: '0', value: "12 AM", event:[], icon: "", temp: "", eventID: ""}, 
      {id: '1', value: '1 AM', event: [], icon: "", temp: "", eventID: ""},
      { id: '2', value: '2 AM', event: [], icon: "", temp: "", eventID: ""},{ id: '3', value: '3 AM', event: [], icon: "", temp: "", eventID: ""},
      { id: '4', value: '4 AM', event: [] , icon: "" , temp: "", eventID: ""},{ id: '5', value: '5 AM' , event: [], icon: "" , temp: "", eventID: ""},
      { id: '6', value: '6 AM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '7', value: '7 AM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '8', value: '8 AM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '9', value: '9 AM', event: [] , icon: "" , temp: "", eventID: ""},
      { id: '10', value: '10 AM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '11', value: '11 AM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '12', value: '12 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '13', value: '1 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '14', value: '2 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '15', value: '3 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '16', value: '4 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '17', value: '5 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '18', value: '6 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '19', value: '7 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '20', value: '8 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '21', value: '9 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '22', value: '10 PM' , event: [] , icon: "", temp: "", eventID: ""},{ id: '23', value: '11 PM' , event: [] , icon: "", temp: "", eventID: ""},
      { id: '24', value: 'All day' , event: [] , icon: "", temp: "", eventID: ""},  { id: '25', value: 'Powered by Dark Sky' , event: [] , icon: "", temp: "", eventID: ""}];
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
        (new Date(moment(this.state.currentSelectedDate).format('YYYY-MM-DDT00:00:00.000Z'))).toISOString(),
        (new Date(moment(this.state.currentSelectedDate).add(1, 'day').format('YYYY-MM-DDT00:00:00.000Z'))).toISOString()
      );
    } catch (error) {
      Alert.alert("Failed to get events");
    }
    let list = this.state.FlatListItems;
    for(let i=0; i< allEvents.length; i++)
      {
        let startDate = moment(allEvents[i].startDate);
        let hour = new Date(startDate).getHours();
        
        if(allEvents[i].allDay)
        {
          list[24].event = [allEvents[i].startDate, allEvents[i].endDate, allEvents[i].title, allEvents[i].location, allEvents[i].id];          
        }
        else
        {
          list[hour].event = [allEvents[i].startDate, allEvents[i].endDate, allEvents[i].title, allEvents[i].location, allEvents[i].id]
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

  editOrAddEvent(id, time)
  {
    let newTime = (moment(this.state.currentSelectedDate).set('hour', time)).utc().format("YYYY-MM-DDTHH:00:00.000[Z]");

      if(id == undefined)
      {
        const eventConfig = {
          title: "",
          startDate: newTime,
        };
        AddCalendarEvent.presentEventCreatingDialog(eventConfig).then((eventInfo) => {
          this.fetchAllEvents();

      })
      .catch((error) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
      }
      else
      {
        let items = this.state.FlatListItems;
      const eventConfig = {
        eventId: id,
      };
      AddCalendarEvent.presentEventEditingDialog(eventConfig).then((eventInfo) => {
          this.fetchAllEvents();
    })
    .catch((error) => {
      // handle error such as when user rejected permissions
      console.warn(error);
    });
      }
      
  }

  render() 
  {
    return (
      <FlatList
        data={this.state.FlatListItems}
        //data defined in constructor
        ItemSeparatorComponent={this.FlatListItemSeparator}
        //Item Separator View
        renderItem={({ item}) => 
        {

          let styleOfValues;

          if(item.value.length > 4)
          {
            styleOfValues = StyleSheet.create({
              item: {
                padding: 10,
                fontSize: 18,
                height: 44,
                color: "#C9C9C9",
                fontFamily: "Quicksand-Light"
              },
              });
          }
          else
          {
            styleOfValues = StyleSheet.create({
              item: {
                padding: 10,
                fontSize: 18,
                height: 44,
                color: "#C9C9C9",
                marginLeft: 10,
                fontFamily: "Quicksand-Light"
              },
              });
          }
          let view;
          let withoutEventView;

          let title;
          let time;
          let location;
          if(item.value == "Powered by Dark Sky") {
            title = (<Text style = {{ fontSize: 5, fontWeight: 'bold', color: 'white', flexWrap: 'wrap'}}>Powered by Dark Sky</Text>);
          }
          else if(item.event[0] != undefined)
          {
            time = (<Text style = {{marginTop: 3, fontSize: 11, fontWeight: 'bold', color: 'white', flexWrap: 'wrap'}}>
              {format(new Date(item.event[0]), "h:mm a")} to {format(new Date(item.event[1]), "h:mm a")}</Text>);
            if(item.event[2] != undefined)
            {
                title = (<Text style = {{color: "white", fontWeight: '600', minHeight: 15, fontSize: 18}}>{item.event[2]}</Text>);
            }
            if(item.event[3] != "")
            {
              location = (<Text style = {{marginTop: 3, fontSize: 10, fontWeight: 'bold', color: "white", flexWrap: 'wrap'}}>{item.event[3]}</Text>);
            }

            view = (
              <View  style={{justifyContent: "flex-start", backgroundColor:'#313241', border: 0,}}>
                {title}
                {location}
                {time}
              </View>
        );

          }
          else 
          {
            view = (<View  style={{justifyContent: "flex-start", border: 0}}>
              <Text style={{marginLeft: 50, marginTop: 3, fontSize: 30, color: "#C9C9C9"}}>+</Text>
            </View>);
          }


          if (item.value == "Powered by Dark Sky") {
            return ( 
              <View style = {styles.container}>
                <TouchableOpacity style = {styles.list}>
                  <View>
                    <Text style={styleOfValues.item}>{item.value}</Text>
                  </View>
                  <TouchableOpacity style={{flex:1} } onPress={() => Linking.openURL('https://darksky.net/poweredby/')}>
                    {view}
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            );
          }
          else {
          return ( 
          <View style = {styles.container}>
            <TouchableOpacity style = {styles.list}>
              <View>
                <Text
                  style={styleOfValues.item}>
                  {item.value}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: "row"}}>
                  <Image source={item.icon} style={{height: 50, width: 50}} />
                <Text style={{padding: 10,fontSize: 15,height: 44, color: "#C9C9C9"}}>{item.temp}</Text>
              </View>
              <TouchableOpacity style={{flex:1} } onPress={()=>this.editOrAddEvent(item.event[4], item.id)}>
                {view}
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        );}}
      }
    keyExtractor={(item, index) => index.toString()}
  />
);
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313241',
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
    color: "#C9C9C9",
  },

  event: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginLeft: 'auto',

  }});