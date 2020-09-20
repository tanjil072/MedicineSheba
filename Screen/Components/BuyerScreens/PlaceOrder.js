import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

global.var = '1'


function Comp() {

    let [value, setValue] = useState('1');

    const quantityHandler = (action) => {
        console.log(value)

        if (action == 'more') {
            setValue(++value)
            global.var = value



        } else if (action == 'less') {
            if (value > 1) {
                setValue(--value)
                global.var = value
            }

        }

    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => quantityHandler('less')} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                <Icon name="remove" size={22} color="#cccccc" />
            </TouchableOpacity>
            <Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>
                {global.var}</Text>
            <TouchableOpacity onPress={() => quantityHandler('more')} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                <Icon name="add" size={22} color="#cccccc" />
            </TouchableOpacity>
        </View>
    )
}

export default class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.arrayholder = [];
        this.temp=[

        ],
        this.state = {
            selectAll: false,
            ID: '',
            cartItemsIsLoading: false,
            isLoading: true,
            text: '',
            checkedId:'',
            qty: 1,
            
            cartItems: [

            ]
        }
    }

    selectHandler = (index, value,id) => {
        const newItems = [...this.state.cartItems]; // clone the array 
        newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 

        if(newItems[index]['checked']==1)
        {
            
            this.temp.push({"medicineId": id,"quantity":global.var});
            //console.log(this.temp)
        }
        else if(newItems[index]['checked']==0)
        {
            
            this.temp.pop({"medicineId": id,"quantity":global.var});
            //console.log(this.temp)
        }
        

        this.setState({ cartItems: newItems }); // set new state
    }

    qtHandler = (index, value) => {
        const newItems = [...this.state.cartItems]; // clone the array 
        newItems[index]['qty'] = value == 1 ? 0 : 1; // set the new value 


        this.setState({ cartItems: newItems }); // set new state
    }



    selectHandlerAll = (value) => {
        const newItems = [...this.state.cartItems]; // clone the array 
        newItems.map((item, index) => {
            newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
        });
        this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
    }




    subtotalPrice = () => {


        const { cartItems } = this.state;
        if (cartItems) {
            return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? global.var * item.price : 0), 0);
        }

        return 0;
    }

    getData() {
        setTimeout(() => {


            fetch('https://medicine-sheba-server.herokuapp.com/medicines')
                .then(response => response.json())
                .then(responseJson => {
                    // console.log(responseJson.message)
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


    Procced = () => {



      // console.log(this.temp)
            

        //
       
            fetch("https://medicine-sheba-server.herokuapp.com/order", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderDetails:this.temp,

                    subTotal: this.subtotalPrice().toFixed(2),
                    owner: '5f64bdbe0c90c30017e9f92f'
                })
            })

                    .then((response) => response.json())
                    .then((responseJson) => {
                        //setLoading(false);

                        console.log(responseJson)

                        if (responseJson.status == 'success') {

                            alert("Order Placed Successfully")

                        } else {
                            alert("Error Placing Order")

                        }



                    })
                    .catch(error => {
                        setLoading(false);
                        console.error(error);
                    });

            //this.props.navigation.navigate('Orders', { data: this.subtotalPrice().toFixed(2) })

            // alert(this.subtotalPrice().toFixed(2));

        }



        SearchFilterFunction(text) {
            const newData = this.state.cartItems.filter(function (item) {

                const itemData = item.medicineName ? item.medicineName.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;

            });

            this.setState({
                dataSource: newData,
                text: text,
            });
        }




        render() {

            const { cartItemsIsLoading, selectAll } = this.state;
            const qty = '1';



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
                                            <TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => this.selectHandler(i, item.checked,item._id)}>
                                                <Icon name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
                                              
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>



                                            <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                                                <TouchableOpacity onPress={() => alert("Name: " + item.medicineName + "\n" + item.strength + " " + item.unit + "\n" + "Generic: " + item.genericName + "\n" + "Company: " + item.manufacturer + "\n" + "Price: " + item.price + "tk.")}>
                                                    <Text numberOfLines={1} style={{ fontSize: 20 }}>{item.medicineName}</Text>
                                                    <Text numberOfLines={1} style={{ color: '#8f8f8f', fontSize: 15 }}>{item.strength ? item.strength + " " + item.unit : ''}</Text>
                                                    <Text numberOfLines={1} style={{ fontSize: 15, color: '#8f8f8f' }}>manufacturer: {item.manufacturer}</Text>
                                                    <Text numberOfLines={1} style={{ color: '#333333', marginBottom: 2, fontSize: 18 }}>Price: {global.var * item.price} tk.</Text>

                                                </TouchableOpacity>

                                                <Comp />
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
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0faf9a' }}>{this.subtotalPrice().toFixed(2)} tk.</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.centerElement, { backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5 }]} onPress={() => this.Procced()}>
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


