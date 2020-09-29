import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
//import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import Dialog from "react-native-dialog";


var text = ""; //Dialogue Title setter


export default class Pending extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectAll: false,
			cartItemsIsLoading: false,
			dialogVisible: false,
			id: '',
			cartItems: [

			]
		}
	}


	componentDidMount() {
		this.getData();

		//console.log("Pending")
	}

	componentDidUpdate() {

		this.getData();
		//console.log("Accepted Update")

	}




	getData() {


		fetch('https://medicine-sheba-server.herokuapp.com/orders/pending',
			{
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + global.token,
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
			.then(response => response.json())
			.then(responseJson => {
				//console.log("Pending" + responseJson)
				if(responseJson.status=='success'){
					//console.log("Pending" + responseJson)
				this.setState(
					{
						dataSource: responseJson.message
					},
					function () {
						this.state.cartItems = responseJson.message;
					  }

				);
			}else if(responseJson.status=='error'){
				console.log(responseJson.message)
			}
			})
			.catch(error => {
				console.error(error);
			});


	}

	orderDetails = (order) => {
		fetch('https://medicine-sheba-server.herokuapp.com/orders/' + order, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + global.token,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
			.then(response => response.json())
			.then(responseJson => {
				//console.log(responseJson)

				if(responseJson.status=='success'){
					//console.log("Pending" + responseJson)
				alert("OrderNo."+responseJson.message.orderNo+"\n"+"Address:"+responseJson.message.address+"\n"+"Total: "+responseJson.message.subTotal+"tk"+"\n"+"Date:"+responseJson.message.dateTime)
			}else if(responseJson.status=='error'){
				console.log(responseJson.message)
			}
			})
			.catch(error => {
				console.error(error);
			});
	}




	render() {


		const { cartItems, cartItemsIsLoading, selectAll } = this.state;


		return (
			<View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>


				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, { height: 300 }]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (


						<ScrollView>
							{this.state.cartItems && this.state.cartItems.map((item, i) => (
								<View key={i} style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120 }}>
									<View style={[styles.centerElement, { width: 60 }]}>
										<TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => alert("")}>
											<Text style={{ fontSize: 20 }}>{item.orderNo}.</Text>
										</TouchableOpacity>
									</View>
									<View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
										<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/ }} style={{ paddingRight: 10 }}>

										</TouchableOpacity>
										<View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>

											<TouchableOpacity onPress={() => this.orderDetails(item.orderNo)}>
												
												<Text numberOfLines={1} style={{ color: '#8f8f8f',fontSize:20 }}>Total: {item.subTotal} tk.</Text>


											</TouchableOpacity>

										</View>

									</View>



								</View>

							))}
						</ScrollView>
					)}


			</View>




		);
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
