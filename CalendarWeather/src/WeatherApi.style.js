import { StyleSheet } from 'react-native';

const height = '20%';
const width = '100%';

 export default StyleSheet.create({
	screen: {
		width,
		height,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'lightgrey',
		},
	box1: {
		width: '51%',
		height: '90%',
		flexDirection: 'column',
		//alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
		},
	box2: {
		width: '46%',
		height: '90%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		//backgroundColor: 'white',
		},
	box2_1: {
		width: '100%',
		height: '48%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white',
		},
	box2_2: {
		width: '100%',
		height: '48%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: 'white',
		},
	geoLoc: {
		alignItems: 'center',
		fontSize: 18,
		},
	curTemp: {
		fontSize: 50,
		//fontWeight: 'bold',
		alignSelf: 'center',
		},
	summary: {
		fontSize: 20,
		alignSelf: 'center',
	},
	tempHighLow: {
		fontSize: 30,
	},
	feelsLike: {
		alignSelf: 'center',
	}
});