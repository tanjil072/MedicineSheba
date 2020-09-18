
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './loader';
import BottomNav from './Components/BuyerScreens/BuyerNav'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  const [value, setValue] = React.useState('first');
  const[data,setData]=useState([])

  let [val, setVal] = useState('');




  const handleSignIn = () => {

     setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);


    if (value == 'customer') {
      apifetch();
     //props.navigation.navigate('NavToBottom');
      // console.log(val)

    }
    if (value == 'seller') {
      props.navigation.navigate('NavToSeller');
      apifetch();


    }



    // fetch('https://aboutreact.herokuapp.com/login.php', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // }).then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status == 1) {
    //       AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
    //       console.log(responseJson.data[0].user_id);
    //       props.navigation.navigate('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext('Please check your email id or password');
    //       console.log('Please check your email id or password');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  const apifetch = () => {
    fetch("https://medicine-sheba-server.herokuapp.com/users/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail ,
        password: userPassword,
      })
    })

      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        if(responseJson.status=='success'){
         
          var mail=responseJson.message.user.email;
          var name=responseJson.message.user.userName;
          var phone=responseJson.message.user.phone;
          props.navigation.navigate('Profile',{email:mail,phone:phone,name:name});
          
          //console.log(responseJson.message.user.email)
                
              } else {
                setErrortext('Please check your email id or password');
               
              }
        
        
       
      })
      .catch(error => {
        //     //Hide Loader
            setLoading(false);
            console.error(error);
          });
  }

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 90 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Image/aboutreact.png')}
                style={{
                  width: '80%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                // underlineColorAndroid="#FFFFFF"
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#08070D"
                autoCapitalize="none"
                keyboardType="email-address"
                // ref={ref => {
                //   this._emailinput = ref;
                // }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}

              />
              <Icon name="person" color='#2B2D2F' size={25} style={{ marginLeft: -30, marginTop: 7 }} />

            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                // underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor="#08070D"
                keyboardType="default"
               
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
              <Icon name="key" color='#2B2D2F' size={25} style={{ marginLeft: -30, marginTop: 8 }} />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}


            <RadioButton.Group onValueChange={value => setValue(value)} value={value} >
              <View style={styles.radioButtonStyle}>
                <View style={{ marginLeft: 20 }}>
                  <Text>Customer</Text>
                  <RadioButton value="customer" color='black' />
                </View>
                <View style={{ marginLeft: '20%' }}>
                  <Text>Admin</Text>
                  <RadioButton value="seller" color='black' />
                </View>
              </View>
            </RadioButton.Group>


            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSignIn}>
              <Text style={styles.buttonTextStyle}>Sign In</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('BuyerRegistration')}>
              <Text style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Don't have any account?</Text>  Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#B2BEB5',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
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
  radioButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
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
  registerTextStyle: {
    color: '#08070D',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 20,
    marginTop: 50
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});