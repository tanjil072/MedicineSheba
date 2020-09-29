
import React, { useState } from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './loader';

const RegisterScreen = props => {

  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [Phone, setUserPhone] = useState('');
  let [Password, setUserPassword] = useState('');
  let [RePassword, setUserRePassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = () => {
    //setErrortext('');
   
    if(Phone.length<11)
    {
      alert("Phone Minimum Length is 11")
      return
    }

    if(Password.length<8)
    {
      alert("Password Minimum Length is 8")
      return
    }
    if(Password!=RePassword){
      alert("Password not Matched")
      return
    }

    if(true)
    {
       setLoading(true);


    fetch("https://medicine-sheba-server.herokuapp.com/signup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: userAddress,
        userName: userName,
        phone: 88+Phone,
        email: userEmail,
        password: Password,
      })
    })

      .then((response) => response.json())
      .then((responseJson) => {

        setLoading(false);

        if (responseJson.status == 'success') {
          setIsRegistraionSuccess(true);
        } else {
          setErrortext('Registration Unsuccessful');
          alert(responseJson.message)
        }
      })
      
      .done();
    }

   
  }


  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (

    <View style={{ flex: 1, backgroundColor: '#B2BEB5' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Image/a.png')}
            style={{
              width: '100%',
              height: 80,
              resizeMode: 'contain',
              marginTop: 40,
              marginBottom: 40,
            }}
          />
        </View>


        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Name"
              placeholderTextColor="#08070D"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={Phone => setUserPhone(Phone)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Phone"
              placeholderTextColor="#08070D"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>


          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Email"
              placeholderTextColor="#08070D"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserAddress => setUserAddress(UserAddress)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Address"
              placeholderTextColor="#08070D"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <TextInput
          style={styles.inputStyle}
          onChangeText={Passwword => setUserPassword(Passwword)}
          underlineColorAndroid="#F6F6F7"
          placeholder="Passowrd"
          placeholderTextColor="#08070D"
          keyboardType="default"
          secureTextEntry={true}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
        />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={ConfirmRePasswword => setUserRePassword(ConfirmRePasswword)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Confirm Passowrd"
              placeholderTextColor="#08070D"
              keyboardType="default"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>



          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>

          <Text
            style={styles.registerTextStyle}
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <Text style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Already have an account?</Text>  Sign In
            </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  registerTextStyle: {
    color: '#08070D',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 20
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    maxWidth: '90%',
    marginLeft: '5%',
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'grey',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});