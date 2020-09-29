import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,Picker } from 'react-native';

var id='';
global.update=0;
export default class EditMedi extends Component {

    constructor() {
        super();
        this.state = {
            EditText: '',
            ToChange:'',
            successText: '',
            ChangeText:''
        }
    }


    Update = (text) => {

       

        if(text=='Username')
        {
           
            fetch("https://medicine-sheba-server.herokuapp.com/users/update-profile", {
            method: 'PATCH',
            headers: {
                'Authorization':'Bearer '+global.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName:this.state.EditText,
            })
        })

            .then((response) => response.json())
            .then((responseJson) => {

              //console.log(responseJson.message.userName)
                if (responseJson.status == 'success') {
                    alert("Update Successfull")
                   // global.update=1;
                    this.setState({ChangeText:responseJson.message.userName})
                    //console.log(this.state.ChangeText)
                    this.setState({ successText: "Update successfull" })

                }
            })

            .done();



        }else if(text=='Phone')
        {
            
            fetch("https://medicine-sheba-server.herokuapp.com/users/update-profile", {
            method: 'PATCH',
            headers: {
                'Authorization':'Bearer '+global.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone:this.state.EditText,
            })
        })

            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == 'success') {
                    alert("Update Successfull")
                    this.setState({ successText: "Update successfull" })

                }
            })

            .done();


        }else if(text=='Password')
        {
          
            fetch("https://medicine-sheba-server.herokuapp.com/users/update-profile", {
            method: 'PATCH',
            headers: {
                'Authorization':'Bearer '+global.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                password:this.state.EditText,
            })
        })

            .then((response) => response.json())
            .then((responseJson) => {

               
                if (responseJson.status == 'success') {
              
                    this.setState({ successText: "Update successfull" })
                    alert("Update Successfull")

                }
            })

            .done();
        }


       
    }

    


    BackToProfile = () => {

		this.props.navigation.navigate('Profile',{text:this.state.ChangeText});
        
		
	}


    render() {

       const text =  this.props.navigation.getParam('editText', 'Text retriving error')
       id =  this.props.navigation.getParam('id', 'Text retriving error')
       

        return (
            <KeyboardAvoidingView enabled>
                <View style={styles.container}>
                <View style={{marginTop:30}}>
                <Text style={{fontSize:30,fontWeight:'bold',textDecorationLine: 'underline',marginBottom:25}}>Edit {text}</Text>
                </View>
                    <TextInput style={styles.inputBox}
                        onChangeText={(text) => this.setState({ EditText: text })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder={text}
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()} />
               

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.Update(text)} >Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.BackToProfile()} >Back To Profile</Text>
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
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        maxWidth: '70%',
        marginLeft: '17%',
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'grey',
      },
    button: {
        width: '40%',
        backgroundColor: '#2B2D2F',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },

    buttonStyle: {
        backgroundColor: '#2B2D2F',
        borderWidth: 0,
        color: '#FFFFFF',
        height: 40,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: '40%',
        marginTop: 20,
        marginBottom: 20,
      },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});