
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";


//var text = ""; //Dialogue Title setter

var id='';
export default class ProfileScreen extends Component {

  state = {
    Email:"tanjilh84@gmail.com",
    Phone:"+88017********",
    Password:"********",
    text:''
  };

  signout = () => {

    fetch("https://medicine-sheba-server.herokuapp.com/users/logout", {
      method: 'POST',
      headers: {
          'Authorization':'Bearer '+global.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
     
  })

      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
        
          if (responseJson.status == 'success') {
            this.props.navigation.navigate('LoginScreen');
              //this.setState({ successText: "Admi successfull" })
             //console.log("Success")

          }
      })

      .done();
    //this.props.navigation.navigate('LoginScreen');
  }

  signoutAll = () => {

    fetch("https://medicine-sheba-server.herokuapp.com/users/logoutAll", {
      method: 'POST',
      headers: {
          'Authorization':'Bearer '+global.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
     
  })

      .then((response) => response.json())
      .then((responseJson) => {
          
        
          if (responseJson.status == 'success') {
            this.props.navigation.navigate('LoginScreen');
             

          }
      })

      .done();
  }



  EditScreen = (mail) => {
    this.props.navigation.navigate('EditProfile',{editText:mail,id:id});

  };


  render() {
    const mail =  this.props.navigation.getParam('email', 'Email retriving error')
    const phone =  this.props.navigation.getParam('phone', 'Phone retriving error')
    const name =  this.props.navigation.getParam('name', 'Name retriving error')
    const add =  this.props.navigation.getParam('address', 'Address retriving error')
    const username =  this.props.navigation.getParam('text', 'Test retriving error')

    id =  this.props.navigation.getParam('ID', 'Name retriving error')
  
    

    return (


      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }} />

            <Text style={styles.name}>{name}</Text>
            <Text style={styles.userInfo}>{mail}</Text>
          </View>
        </View>

        <View style={styles.body}>

          <View style={styles.detailBox}>
            <View style={styles.box1}>
              <Text style={{ fontSize: 20, color: 'white' }}>Username</Text>
              <Text style={{ fontSize: 20, color: '#BEBEBE' }}>{name}</Text>
            </View>
            <View style={styles.box2}>
              <Icon name="create" size={25} style={{ marginTop: 5 }} onPress={() => { this.EditScreen('Username') }} />
            </View>

          </View>

          <View style={styles.detailBox}>
            <View style={styles.box1}>
              <Text style={{ fontSize: 20, color: 'white' }}>Address</Text>
              <Text style={{ fontSize: 20, color: '#BEBEBE' }}>{add}</Text>
            </View>
            
          </View>

          <View style={styles.detailBox}>
            <View style={styles.box1}>
              <Text style={{ fontSize: 20, color: 'white' }}>Phone</Text>
              <Text style={{ fontSize: 20, color: '#BEBEBE' }}>{phone}</Text>
            </View>
            <View style={styles.box2}>
              <Icon name="create" size={25} style={{ marginTop: 5 }} onPress={() => { this.EditScreen('Phone') }} />
            </View>
          </View>

          <View style={styles.detailBox}>
            <View style={styles.box1}>
              <Text style={{ fontSize: 20, color: 'white' }}>Password</Text>
              <Text style={{ fontSize: 20, color: '#BEBEBE' }}>{this.state.Password}</Text>
            </View>
            <View style={styles.box2}>
              <Icon name="create" size={25} style={{ marginTop: 5 }} onPress={() => { this.EditScreen('Password') }} />
            </View>
          </View>

          <View style={styles.item}>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.signout}
            >

              <Text style={styles.buttonTextStyle}>Sign Out</Text>
            </TouchableOpacity>


          </View>



        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  box1: {
    flex: 1,

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
    backgroundColor: "#DCDCDC",
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
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
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
  userInfo: {
    fontSize: 16,
    color: "#778899",

  },
  body: {
    backgroundColor: "#778899",
    height: '68%',

  },
  item: {
    flexDirection: 'row',
    marginTop: 5,

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
