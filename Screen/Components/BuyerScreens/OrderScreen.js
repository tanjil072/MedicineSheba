
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import InProgress from './InProgress';
import PastOrders from './PastOrders';
import AcceptedOrders from './Unknown';


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
        inactiveTintColor: 'black',



        style: {
          backgroundColor: '#8CCEEB',
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
        children={() => <InProgress data={val}/>}
        options={{
          tabBarLabel: 'In Progress',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="download" size={25} />
          )
        }} />

        <Tab.Screen
        name="AcceptedOrders"
        component={AcceptedOrders}
        options={{
          tabBarLabel: 'Accepted',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="checkmark-circle" size={25} />
          )

        }} />

      <Tab.Screen
        name="PastOrders"
        component={PastOrders}
        options={{
          tabBarLabel: 'Past Orders',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="timer" size={25} />
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
          headerStyle: { backgroundColor: '#633689' },
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