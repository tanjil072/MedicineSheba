import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
//import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import Dialog from "react-native-dialog";


var text = ""; //Dialogue Title setter


export default class Cart extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectAll: false,
			cartItemsIsLoading: false,
			dialogVisible: false,
			cartItems: [

				{ itemId: "1", name: "Napa", generic: "R", qty: 1, salePrice: "105", company: "A", checked: 0 },
				{ itemId: "2", name: "Vitamin", qty: 1, generic: "B", salePrice: "199", company: "A", checked: 0 },
				{ itemId: "3", name: "Vitamin D", qty: 1, generic: "C", salePrice: "27.99", company: "A", checked: 0 },
				{ itemId: "4", name: "Glucose", qty: 1, generic: "C", salePrice: "129.99", company: "A", checked: 0 },
				{ itemId: "5", name: "Vitamin B", qty: 1, generic: "Black", salePrice: "269", company: "A", checked: 0 }
			]
		}
	}



	showDialog = (value) => {
		this.text = value + 1;
		this.setState({ dialogVisible: true });


	};

	deleteHandler = (index) => {
		Alert.alert(
			'Are you sure you want to delete this item from your order list?',
			'',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{
					text: 'Delete', onPress: () => {
						let updatedCart = this.state.cartItems; /* Clone it first */
						updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
						this.state.cartItems = updatedCart;
						this.setState(updatedCart); /* Update the state */
					}
				},
			],
			{ cancelable: false }
		);
	}

	handleCancel = () => {
		this.setState({ dialogVisible: false });
	};

	handleSubmit = () => {
		//alert(this.Text2)
		this.setState({ dialogVisible: false });
	};


	handleText = (textinp, store) => {

		if (store == "name") {
			this.setState({ name: textinp });
		}
	}


	// };


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

	itemname = () => {

		alert(this.subtotalPrice().toFixed(2));
	}

	test = (itemName) => {

		this.props.navigation.navigate('EditMedi',{text: itemName });
		 
	}



	render() {
		const styles = StyleSheet.create({
			centerElement: { justifyContent: 'center', alignItems: 'center' },
		});

		const { cartItems, cartItemsIsLoading, selectAll } = this.state;


		return (
			<View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
				<View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10 }}>
					<View style={[styles.centerElement, { width: 50, height: 50 }]}>
						<Icon style={[{ color: "black" }]} size={25} name="search" />
					</View>

					<View style={[styles.centerElement, { height: 50 }]}>
						<TextInput style={{ borderWidth: 0, borderRadius: 8, paddingLeft: 10, borderLength: 50 }} placeholder={'Search'}></TextInput>


					</View>



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
											<Icon name={item.checked == 1 ? "checkbox" : "checkbox-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
										</TouchableOpacity>
									</View>
									<View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
										<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/ }} style={{ paddingRight: 10 }}>

										</TouchableOpacity>
										<View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
											<Text numberOfLines={1} style={{ fontSize: 15 }}>{item.name}</Text>
											<Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{item.generic ? 'Generic: ' + item.generic : ''}</Text>
											<Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{item.salePrice ? 'Price: ' + item.salePrice : ''}$</Text>
											<Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{item.qty ? 'Qty: ' + item.qty : ''}pcs</Text>
											<Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{item.company ? 'Company: ' + item.company : ''}</Text>


											<View style={{ flexDirection: 'row' }}>

											</View>
										</View>


										<View style={styles.box2}>

										</View>

									</View>

									<View >

										<Icons onPress={() =>this.test(item.name)} name="pencil" size={25} style={{ marginTop: 50 }} />


									</View>


									<View style={[styles.centerElement, { width: 60 }]}>
										<TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => this.deleteHandler(i)}>
											<Icon name="md-trash" size={25} color="rgb(129,122,126)" />
										</TouchableOpacity>
									</View>

									



								</View>

							))}
						</ScrollView>
					)}

				<View style={{ flexDirection: 'row' }}>
					<View style={[styles.centerElement, { width: 60 }]}>
						<TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => this.selectHandlerAll(selectAll)}>
							<Icon style={{ marginTop: 20 }} name={selectAll == true ? "checkbox" : "checkbox-outline"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
						</TouchableOpacity>
					</View>

					<View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center' }}>
						<Text style={{ paddingTop: 20 }}>Select All</Text>

					</View>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center' }}>
					<TouchableOpacity style={[styles.centerElement, { backgroundColor: '#0faf9a', width: 40, height: 40, marginBottom: 40, borderRadius: 20 }]} onPress={() => this.itemname()}>
						<Text style={{ color: '#ffffff' }}>+</Text>
					</TouchableOpacity>
				</View>

			</View>




		);
	}
}



const styles = StyleSheet.create({


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


