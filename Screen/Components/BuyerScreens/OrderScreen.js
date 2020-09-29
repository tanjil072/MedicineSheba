
import 'react-native-gesture-handler';

import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import InProgress from './InProgress';
import PastOrders from './PastOrders';
import AcceptedOrders from './AcceptedOrders';


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
var val;
function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="InProgress"
      tabBarOptions={{
        showIcon: true,
        activeTintColor: 'white',
        inactiveTintColor: 'grey',
        

        style: {
          backgroundColor: '#2B2D2F',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 12
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 3,

        },
      }}>

      <Tab.Screen
        name="InProgress"
        children={() => <InProgress data={val} />}
        options={{
          tabBarLabel: 'Pending',
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{ color: 'grey' }]} size={25} name={'download'} />
            </View>
          ),
         
        }} />

      <Tab.Screen
        name="AcceptedOrders"
        component={AcceptedOrders}
        options={{
          tabBarLabel: 'Accepted',
          tabBarIcon: ({ tintColor }) => (
            
            <View>
            <Icon style={[{ color: 'grey' }]} size={25} name={'checkmark-circle'} />
          </View>
          )

        }} />

      <Tab.Screen
        name="PastOrders"
        component={PastOrders}
        options={{
          tabBarLabel: 'Past Orders',
          tabBarIcon: ({ tintColor }) => (
            <View>
            <Icon style={[{ color: 'grey' }]} size={25} name={'timer'} />
          </View>
          )

        }} />
    </Tab.Navigator>
  );
}

const App = ({ navigation }) => {
  val = navigation.getParam('data');
  // val=message;
  //console.log(message)


  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },

        }}>
        <Stack.Screen name="TabStack" component={TabStack} options={{ title: "My Orders" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;