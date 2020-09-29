import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import Home from './HomeScreen'
import Profile from './ProfileScreen'
import Orders from './OrderScreen'
import Notifications from './NotificationScreen'
import InProgress from './InProgress'


 
const TabNavigator = createMaterialBottomTabNavigator(  
    {  

        
        Home: { screen: Home,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-search'}/>  
                    </View>),  
                    activeColor: 'white',  
                    inactiveColor: 'grey',   
                barStyle: { backgroundColor: '#2B2D2F' },
            }  
        },  

        // Cart: {  
        //     screen: Notifications,  
        //     navigationOptions:{  
        //         tabBarLabel:'Home',  
        //         tabBarIcon: ({ tintColor }) => (  
        //             <View>  
        //                 <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
        //             </View>),  
        //     }  
        // },
        
        Orders: { screen: Orders,  
            navigationOptions:{  
                tabBarLabel:'Orders',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'}/>  
                    </View>),  
                    activeColor: 'white',  
                    inactiveColor: 'grey', 
                    barStyle: { backgroundColor: '#2B2D2F' },  
            }  
        },  
        Profile: { screen: Profile,  
            navigationOptions:{  
                tabBarLabel:'Profile',  
                
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/> 
                    </View>),  
                activeColor: 'white',  
                inactiveColor: 'grey',  
                barStyle: { backgroundColor: '#2B2D2F' },  
            }  
        }, 
        
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  
  
export default createAppContainer(TabNavigator); 