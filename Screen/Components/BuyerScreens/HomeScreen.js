import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
//import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Cart extends React.Component {

	constructor(props) {
		super(props);
		this.arrayholder=[];
		this.state = {
			selectAll: false,
			cartItemsIsLoading: false,
			isLoading: true, 
			text: '',
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
			return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.salePrice : 0), 0);
		}
		return 0;
	}

	getData() {
		setTimeout(() => {


			fetch('http://10.0.2.2:3000/results')
				.then(response => response.json())
				.then(responseJson => {
					this.setState(
						{
							isLoading: false,
							datasource:responseJson,
							cartItems: responseJson
						},
						
						
					);
				})
				.catch(error => {
					console.error(error);
				});
			//console.log('Our data is fetched');
			// let cartItems = [...this.state.cartItems];

			// cartItems.push({ itemId: "6", name: "Apple AirPods with Charging", thumbnailImage: "https://images-na.ssl-images-amazon.com/images/I/71NTi82uBEL._AC_SL1500_.jpg", color: "Midnight black", qty: 1, salePrice: "599", checked: 0 });

			// this.setState({ cartItems });

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
		  const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
		  const textData = text.toUpperCase();
		  //console.log()
		  return itemData.indexOf(textData) > -1;
		  
		});
		//console.log(newData)
		this.setState({
		  //setting the filtered newData on datasource
		  //After setting the data it will automatically re-render the view
		  
		  cartItems: newData,
		  text: text,
		});
	  }

	  test = () => {
		setTimeout(() => {


			fetch('http://10.0.2.2:3000/results')
				.then(response => response.json())
				.then(responseJson => {
					this.setState(
						{
							isLoading: false,
							cartItems: responseJson
						},
						
						
					);
				})
				.catch(error => {
					console.error(error);
				});
		
		}, 0)

	}






	render() {

		const { cartItems, cartItemsIsLoading, selectAll } = this.state;

	
   
	
		const styles = StyleSheet.create({
			centerElement: { justifyContent: 'center', alignItems: 'center' },
		});


		return (
			<View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
				<View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10 }}>
					<TextInput
						style={styles.textInputStyle}
						onChangeText={text => this.SearchFilterFunction(text)}
						value={this.state.text}
						underlineColorAndroid="transparent"
						placeholder="Search Here"
					/>
				</View>
				<View>
				<Icon style={[{ color: "black" }]} size={35} name={'cart'} onPress={() => this.test()} />

				</View>

				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, { height: 300 }]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (


						<ScrollView>
							{cartItems && cartItems.map((item, i) => (
								<View key={i} style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120 }}>
									<View style={[styles.centerElement, { width: 60 }]}>
										<TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => this.selectHandler(i, item.checked)}>
											<Icon name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
										</TouchableOpacity>
									</View>
									<View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
										<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/ }} style={{ paddingRight: 10 }}>
											<Image source={{ uri: item.thumbnailImage }} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eeeeee' }]} />
										</TouchableOpacity>
										<View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
											<Text numberOfLines={1} style={{ fontSize: 15 }}>{item.name}</Text>
											<Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{item.color ? 'Variation: ' + item.color : ''}</Text>
											<Text numberOfLines={1} style={{ color: '#333333', marginBottom: 10 }}>${item.qty * item.salePrice}</Text>
											<View style={{ flexDirection: 'row' }}>
												<TouchableOpacity onPress={() => this.quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
													<Icon name="remove" size={22} color="#cccccc" />
												</TouchableOpacity>
												<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.qty}</Text>
												<TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
													<Icon name="add" size={22} color="#cccccc" />
												</TouchableOpacity>
											</View>
										</View>

									</View>
									<View style={[styles.centerElement, { width: 60 }]}>
										<TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => this.deleteHandler(i)}>
											<Icon name="md-trash" size={25} color="#ee4d2d" />
										</TouchableOpacity>
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



		);
	}
}