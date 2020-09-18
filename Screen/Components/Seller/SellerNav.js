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
                tabBarLabel: '      ',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icons style={[{ color: tintColor }]} size={25} name={"magnifier"} />
                    </View>),

                activeColor: 'rgb(108, 52, 131)',
                inactiveColor: 'rgb(240, 243, 244)',
              
                barStyle: { backgroundColor: 'rgb(241, 148, 138)' },

            }
        },





        OrderList: {
            screen: OrderList,
            navigationOptions: {
                tabBarLabel: '   ',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icons style={[{ color: tintColor }]} size={25} name="list" />
                    </View>),
                activeColor: 'rgb(29, 131, 72)',
                inactiveColor: 'rgb(240, 243, 244)',
               
                barStyle: { backgroundColor: 'rgb(133, 193, 233)'}, 
               
            }
        },


        AdminProfile: {
             screen: AdminProfile,  
            navigationOptions:{  
                tabBarLabel:'   ',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icons style={[{ color: tintColor }]} size={25} name={"user"}/> 
                    </View>),  
                activeColor: 'rgb(245, 0, 0)',  
                inactiveColor: 'rgb(240, 243, 244)',
                barStyle: { backgroundColor: 'rgb(245, 203, 167)' },  
                
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