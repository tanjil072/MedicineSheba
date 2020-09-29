import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,Picker } from 'react-native';

var id='';
export default class EditMedi extends Component {

    constructor() {
        super();
        this.state = {
            Email: '',
            Password:'',
            successText: '',
        }
    }


    Add = () => {

        //console.log(global.adminToken)

            fetch("https://medicine-sheba-server.herokuapp.com/admin/create-user", {
            method: 'POST',
            headers: {
                'Authorization':'Bearer '+global.adminToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:this.state.Email,
                password:this.state.Password
            })
        })

            .then((response) => response.json())
            .then((responseJson) => {
                
              
                if (responseJson.status == 'success') {
                    alert("Admin Added Successfully")
                    //this.setState({ successText: "Admi successfull" })
                    //console.log("Success")

                }
            })

            .done();

        }

    

    cancel = () => {

		this.props.navigation.navigate('NavToSeller');
        
		
	}


    render() {
        console.log("Cr:"+global.adminToken)

        return (
            <KeyboardAvoidingView enabled>
                <View style={styles.container}>
                <View>
                <Text style={{fontSize:30,fontWeight:'bold',marginTop:20,textDecorationLine: 'underline',marginBottom:25}}>Add New ADMIN</Text>
                </View>
                    <TextInput style={styles.inputBox}
                        onChangeText={(text) => this.setState({ Email: text })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Email"
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()} />

                        <TextInput style={styles.inputBox}
                        onChangeText={(text) => this.setState({ Password: text })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Password"
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()} />
               

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.Add()} >Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.cancel()} >Back</Text>
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
        alignItems: 'center',
        backgroundColor:'#B2BEB5',
        height:'100%'
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
        width: "40%",
        backgroundColor: '#2B2D2F',
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