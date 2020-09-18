import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default class EditMedi extends Component {

    constructor() {
        super();
        this.state = {
            medicineName: '',
            strength: '',
            unit: '',
            genericName: '',
            manufacturer: '',
            price: '',
            successText: '',
        }
    }


    Add = () => {

        // if (!userName) {
        //   alert('Please fill Name');
        //   return;
        // }
        // if (!userEmail) {
        //   alert('Please fill Email');
        //   return;
        // }
        // if (!Phone) {
        //   alert('Please fill Phone');
        //   return;
        // }
        // if (!Password) {
        //   alert('Please fill Password');
        //   return;
        // }

        // setLoading(true);


        fetch("https://medicine-sheba-server.herokuapp.com/admin/add-medicine", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                medicineName: this.state.medicineName,
                strength: this.state.strength,
                unit: this.state.unit,
                genericName: this.state.genericName,
                manufacturer: this.state.manufacturer,
                price: this.state.price,
            })
        })

            .then((response) => response.json())
            .then((responseJson) => {

                //setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status == 'success') {
                    console.log('Medicine Added');
                    this.setState({ successText: "Medicine Added successfully" })

                }
            })

            .done();
    }


    cancel = () => {

		this.props.navigation.navigate('NavToSeller');
		//alert("Hi")
		
	}


    render() {


        return (
            <KeyboardAvoidingView enabled>
                <View style={styles.container}>
                <View>
                <Text style={{fontSize:30,fontWeight:'bold',textDecorationLine: 'underline'}}>Add Medicine to the List</Text>
                </View>
                    <TextInput style={styles.inputBox}
                        onChangeText={(medicineName) => this.setState({ medicineName: medicineName })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="medicineName"
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()} />

                    <TextInput style={styles.inputBox}
                        onChangeText={(strength) => this.setState({ strength: strength })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="strength"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(unit) => this.setState({ unit: unit })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="unit"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(genericName) => this.setState({ genericName: genericName })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="genericName"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(manufacturer) => this.setState({ manufacturer: manufacturer })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="manufacturer"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(price) => this.setState({ price: price })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="price"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.Add()} >ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.cancel()} >Cancel</Text>
                    </TouchableOpacity>

                    {this.state.successText != '' ? (
                        <Text style={styles.successTextStyle}> {this.state.successText} </Text>
                    ) : null}
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    successTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});