// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';  
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

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
          fontSize:12
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 3,
          
        },
      }}>
      <Tab.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          tabBarLabel: 'In Progress',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="download" size={25}/>
          )
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}  />
      <Tab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          tabBarLabel: 'Past Orders',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="timer" size={25}/>
          )
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: '#633689' },
          headerTintColor: '#fff',
          headerTitleAlign:'center',
          headerTitleStyle: { fontWeight: 'bold' },
          
        }}>
        <Stack.Screen name="TabStack" component={TabStack} options={{ title: 'My Orders' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;