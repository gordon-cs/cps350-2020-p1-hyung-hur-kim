//This is an example code for FlatList// 
import React from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert } from 'react-native';
//import all the components we are going to use. 
 
export default class DisplayWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [
         { id: '1', value: '6 AM' },{ id: '2', value: '7 AM' },{ id: '3', value: '8 AM' },
         { id: '4', value: '9 AM' },{ id: '5', value: '10 AM' },{ id: '6', value: '11 AM' },
         { id: '7', value: '12 PM' },{ id: '8', value: '1 PM' },{ id: '9', value: '2 PM' },
         { id: '10', value: '3 PM' },{ id: '11', value: '4 PM' },{ id: '12', value: '5 PM' },
         { id: '13', value: '6 PM' },{ id: '14', value: '7 PM' },{ id: '15', value: '8 PM' },
         { id: '16', value: '9 PM' },{ id: '17', value: '10 PM' },{ id: '18', value: '11 PM' },
         { id: '19', value: '12 AM' },{ id: '20', value: '1 AM' },{ id: '21', value: '2 AM' },
         { id: '22', value: '3 AM' },{ id: '23', value: '4 AM' },{ id: '24', value: '5 AM' },],
    };
  }
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
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
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <View>
              <Text
                style={styles.item}
                onPress={this.GetItem.bind(this, 'Id : '+item.id+' Value : '+item.value)}>
                {item.value}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },
 
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});