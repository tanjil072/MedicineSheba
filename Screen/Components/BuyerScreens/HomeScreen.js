import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
//import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

		let currentQty = newItems[index]['qty'];

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
					//console.log(responseJson.message)
					this.setState(
						{

							//cartItems: responseJson.message,
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






	//   test = () => {
	// 	setTimeout(() => {


	// 		fetch('http://10.0.2.2:3000/results')
	// 			.then(response => response.json())
	// 			.then(responseJson => {
	// 				this.setState(
	// 					{
	// 						isLoading: false,
	// 						cartItems: responseJson
	// 					},


	// 				);
	// 			})
	// 			.catch(error => {
	// 				console.error(error);
	// 			});

	// 	}, 0)

	// }




	// 	<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/ }} style={{ paddingRight: 10 }}>
	// 	<Image source={{ uri: item.thumbnailImage }} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eeeeee' }]} />
	// </TouchableOpacity>




	render() {

		const { cartItemsIsLoading, selectAll } = this.state;




		const styles = StyleSheet.create({
			centerElement: { justifyContent: 'center', alignItems: 'center' },
		});


		return (
			<View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
				<View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10 }}>
					<View style={[styles.centerElement, { width: 50, height: 50 }]}>
						<Icon style={[{ color: "black" }]} size={25} name="search" />
					</View>

					<View style={[styles.centerElement, { height: 40, marginTop: 5 }]}>
						<TextInput onChangeText={text => this.SearchFilterFunction(text)}
							value={this.state.text} style={{ borderWidth: 2, width: 320, borderRadius: 8, paddingLeft: 10 }} placeholder={'Search'}></TextInput>

					</View>

				</View>


				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, { height: 300 }]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (


						<ScrollView>
							{this.state.dataSource && this.state.dataSource.map((item, i) => (
								<View key={i} style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 140 }}>
									<View style={[styles.centerElement, { width: 100 }]}>
										<TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => this.selectHandler(i, item.checked)}>
											<Icon name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
										</TouchableOpacity>
									</View>
									<View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>



										<View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
											<TouchableOpacity onPress={() => alert("Name: " + item.medicineName + "\n" + item.strength + " " + item.unit + "\n" + "Generic: " + item.genericName + "\n" + "Company: " + item.manufacturer + "\n" + "Price: " + item.price + "tk.")}>
												<Text numberOfLines={1} style={{ fontSize: 20 }}>{item.medicineName}</Text>
												<Text numberOfLines={1} style={{ color: '#8f8f8f',fontSize:15 }}>{item.strength ? item.strength + " " + item.unit : ''}</Text>
												<Text numberOfLines={1} style={{ fontSize: 15, color: '#8f8f8f'}}>manufacturer: {item.manufacturer}</Text>
												<Text numberOfLines={1} style={{ color: '#333333', marginBottom:2,fontSize:18 }}>Price: {this.state.qty * item.price} tk.</Text>

											</TouchableOpacity>

											<View style={{ flexDirection: 'row' }}>
												<TouchableOpacity onPress={() => this.quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
													<Icon name="remove" size={22} color="#cccccc" />
												</TouchableOpacity>
												<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{this.state.qty}</Text>
												<TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
													<Icon name="add" size={22} color="#cccccc" />
												</TouchableOpacity>
											</View>
										</View>

									</View>
								
								</View>
							))}
						</ScrollView>
					)}


				<View style={{ backgroundColor: '#616771' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={[styles.centerElement, { width: 60 }]}>
							<TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => this.selectHandlerAll(selectAll)}>
								<Icon style={{ marginTop: 20 }} name={selectAll == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
							</TouchableOpacity>
						</View>

						<View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center' }}>
							<Text style={{ paddingTop: 20, color: 'white' }}>Select All</Text>
							<View style={{ flexDirection: 'row', paddingRight: 20, marginTop: -8, alignItems: 'center' }}>
								<Text style={{ color: 'white' }}>SubTotal: </Text>
								<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0faf9a' }}>${this.subtotalPrice().toFixed(2)}</Text>
							</View>
						</View>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center' }}>
						<TouchableOpacity style={[styles.centerElement, { backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5 }]} onPress={() => this.itemname()}>
							<Text style={{ color: '#ffffff' }}>Procced</Text>
						</TouchableOpacity>
					</View>
					
				</View>

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


