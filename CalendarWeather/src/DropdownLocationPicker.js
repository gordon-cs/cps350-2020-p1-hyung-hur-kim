import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
  } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'; // Creates dropdown menus

class LocationPicker extends Component {
    render () {
        return (
        <ModalDropdown options={['Wenham, MA', 'Boston, MA', 'Los Angeles, CA', 'City, CT', 'Sample, SM']}
                    defaultIndex={1}
                    defaultValue="Wenham, MA"
                    textStyle={styles.geoLocPicker}
                    dropdownTextStyle={styles.dropdown}
                    //onSelect {(value) => this.setState}
                    />
        )
    }
}

export default LocationPicker;

const styles = StyleSheet.create({
    geoLocPicker: {
		fontSize: 20,
	},
})