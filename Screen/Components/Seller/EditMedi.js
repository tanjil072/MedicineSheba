import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,Picker } from 'react-native';

export default class EditMedi extends Component {

    constructor() {
        super();
        this.state = {
            id:'',
            medicineName: '',
            strength: '',
            unit: 'mg',
            genericName: '',
            manufacturer: '',
            price: '',
            successText: '',
        }
    }


    Add = () => {


        fetch("https://medicine-sheba-server.herokuapp.com/admin/update-medicine", {
            method: 'POST',
            headers: {
                'Authorization':'Bearer '+global.adminToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id:this.state.id,
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
                    console.log('Medicine Updated Successfully');
                    this.setState({ successText: "Medicine updated successfully" })

                }
            })

            .done();
    }


    cancel = () => {

		this.props.navigation.navigate('NavToSeller');
		//alert("Hi")
		
	}


    render() {

       const name =  this.props.navigation.getParam('name', 'name retriving error')
       const id =  this.props.navigation.getParam('id', 'id retriving error')
       this.state.id=id;
       console.log(name)


        return (
            <KeyboardAvoidingView enabled>
                <View style={styles.container}>
                <View>
                <Text style={{fontSize:30,fontWeight:'bold',textDecorationLine: 'underline',marginBottom:25}}>Edit {name}</Text>
                </View>
                    <TextInput style={styles.inputBox}
                        onChangeText={(medicineName) => this.setState({ medicineName: medicineName })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Medicine Name"
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()} />

                    <TextInput style={styles.inputBox}
                        onChangeText={(strength) => this.setState({ strength: strength })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Strength"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <View style={styles.inputBox}>
                        <Picker
                            selectedValue={this.state.unit}
                            style={{ height: 50, width: 280, color: '#002f6c' }}
                            onValueChange={(unit) => this.setState({ unit: unit })}
                        >
                            <Picker.Item label="mg" value="mg" />
                            <Picker.Item label="ml" value="ml" />
                        </Picker>
                    </View>

                    <TextInput style={styles.inputBox}
                        onChangeText={(genericName) => this.setState({ genericName: genericName })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Generic Name"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(manufacturer) => this.setState({ manufacturer: manufacturer })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Manufacturer"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(price) => this.setState({ price: price })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Price"

                        placeholderTextColor="#002f6c"
                        ref={(input) => this.password = input}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.Add()} >Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.cancel()} >Go to List</Text>
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