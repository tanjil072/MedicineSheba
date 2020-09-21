import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
//import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomComp from './CustomComp';
import PlaceOrder from './PlaceOrder'

export default class Cart extends React.Component {

	constructor(props) {
		super(props);
		this.arrayholder = [];
		this.state = {
			selectAll: false,
			cartItemsIsLoading: false,
			isLoading: true,
			text: '',
			qty: 1,
			cartItems: [

			]
		}
	}

	selectHandler = (index, value) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 


		this.setState({ cartItems: newItems }); // set new state
	}



	selectHandlerAll = (value) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		newItems.map((item, index) => {
			newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
		});
		this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
	}



	deleteHandler = (index) => {
		Alert.alert(
			'Are you sure you want to delete this item from your cart?',
			'',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{
					text: 'Delete', onPress: () => {
						let updatedCart = this.state.cartItems; /* Clone it first */
						updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
						this.setState(updatedCart); /* Update the state */
					}
				},
			],
			{ cancelable: false }
		);
	}

	quantityHandler = (action, index) => {

	
		
		const newItems = [...this.state.cartItems]; // clone the array 

		let currentQty = newItems[index][this.state.qty];

		if (action == 'more') {
			newItems[index]['qty'] = currentQty + 1;
		} else if (action == 'less') {
			newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;
		}

		this.setState({ cartItems: newItems }); // set new state
	}

	subtotalPrice = () => {
		const { cartItems } = this.state;
		if (cartItems) {
			return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.price : 0), 0);
		}
		return 0;
	}

	getData() {
		setTimeout(() => {


			fetch('https://medicine-sheba-server.herokuapp.com/medicines')
				.then(response => response.json())
				.then(responseJson => {
					this.setState(
						{
							dataSource: responseJson.message
						},
						function () {
							this.state.cartItems = responseJson.message;
						}

					);
				})
				.catch(error => {
					console.error(error);
				});

		}, 0)
	}


	componentDidMount() {
		this.getData();
	}


	itemname = () => {
		this.props.navigation.navigate('Orders', { data: this.subtotalPrice().toFixed(2) })

		//alert(this.subtotalPrice().toFixed(2));

	}



	SearchFilterFunction(text) {
		//passing the inserted text in textinput
		const newData = this.state.cartItems.filter(function (item) {
			//applying filter for the inserted text in search bar
			const itemData = item.medicineName ? item.medicineName.toUpperCase() : ''.toUpperCase();
			const textData = text.toUpperCase();
			//console.log()
			return itemData.indexOf(textData) > -1;

		});
		//console.log(newData)
		this.setState({
			//setting the filtered newData on datasource
			//After setting the data it will automatically re-render the view

			dataSource: newData,
			text: text,
		});
	}



	render() {

		return (
			<View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
				<PlaceOrder/>
			</View>



		)
	}
}

const styles = StyleSheet.create({

	centerElement: { 
	justifyContent: 'center',
	 alignItems: 'center' 
	},

	box1: {
		flex: 1,

	},
	container: {
		height: '100%'
	},

	box2: {
		flex: 1,
		alignItems: 'flex-end'
	},
	detailBox: {
		flexDirection: 'row',
		margin: 10
	},
	header: {
		backgroundColor: "rgb(171, 235, 198)",
	},
	headerContent: {
		padding: 10,
		alignItems: 'center',
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "pink",
		marginBottom: 10,
	},
	name: {
		fontSize: 22,
		color: "#000000",
		fontWeight: '600',
	},
	buttonStyle: {
		backgroundColor: 'rgb(230, 45, 82)',
		borderWidth: 0,
		color: '#FFFFFF',
		height: 45,
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		marginLeft: '38%',
		marginTop: 85,

	},
	buttonTextStyle: {
		color: 'rgb(255,255, 255)',
		paddingVertical: 10,
		fontSize: 16,
	},
	userInfo: {
		fontSize: 16,
		color: "#778899",

	},
	body: {
		backgroundColor: "rgb(255,255,255)",
		height: '68%',

	},
	item: {
		flexDirection: 'row',
		marginTop: 20,

	},
	infoContent: {
		flex: 1,
		alignItems: 'flex-start',
		paddingLeft: 5
	},
	iconContent: {
		flex: 1,
		paddingRight: 1,
	},
	icon: {
		width: 30,
		height: 30,
		marginTop: 20,
	},
	info: {
		fontSize: 18,
		marginTop: 10,
		color: "white",
		marginLeft: 20
	}

});


