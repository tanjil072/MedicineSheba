
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class UserProfileView extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <Text style={styles.name}>John Doe </Text>
                <Text style={styles.userInfo}>jhonnydoe@mail.com </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              {/* <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://image.flaticon.com/icons/svg/846/846551.svg'}}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Home</Text>
              </View> */}
              <Text style={styles.info}>Username</Text>

            </View>

            <View style={styles.item}>
             
              <Text style={styles.info}>Email</Text>

            </View>

            <View style={styles.item}>
             
              <Text style={styles.info}>Password</Text>

            </View>

            <View style={styles.item}>
             
              <Text style={styles.info}>Phone Number</Text>

            </View>

            <View style={styles.item}>
             
              <Text style={[styles.info,{color:'red'}]}>Sign Out</Text>

            </View>
            
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:10,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    
  },
  item:{
    flexDirection : 'row',
    marginTop:20
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    paddingRight:1,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "white",
    marginLeft:20
  }
});
 