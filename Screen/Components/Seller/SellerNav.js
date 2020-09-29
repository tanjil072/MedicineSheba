import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import Icons from 'react-native-vector-icons/SimpleLineIcons';  
import PendingOrder from './PendingOrder';

import Inventory from './Inventory';
import AdminProfile from './AdminProfile';
import OrderList from './OrderList';

//import Inventory from './Inventory'



 
const TabForAdmin = createMaterialBottomTabNavigator(  
    {  

        Inventory: {
            screen: Inventory,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icons style={[{ color: tintColor }]} size={25} name={"magnifier"} />
                    </View>),

                    activeColor: 'white',  
                    inactiveColor: 'grey', 
                    barStyle: { backgroundColor: '#2B2D2F' }, 

            }
        },





        OrderList: {
            screen: OrderList,
            navigationOptions: {
                tabBarLabel: 'Orders',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icons style={[{ color: tintColor }]} size={25} name="list" />
                    </View>),
                    activeColor: 'white',  
                    inactiveColor: 'grey', 
                    barStyle: { backgroundColor: '#2B2D2F' }, 
               
            }
        },


        AdminProfile: {
             screen: AdminProfile,  
            navigationOptions:{  
                tabBarLabel:'Profile',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icons style={[{ color: tintColor }]} size={25} name={"user"}/> 
                    </View>),  
                    activeColor: 'white',  
                    inactiveColor: 'grey', 
                    barStyle: { backgroundColor: '#2B2D2F' }, 
                
            }  
        },  

      
    }, 
    
    
    {  
      initialRouteName: "Inventory",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  
  
export default createAppContainer(TabForAdmin); 