
import 'react-native-gesture-handler';

import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import PendingOrder from './PendingOrder';
import DeliveredOrder from './DeliveredOrder';
import AcceptedOrder from './AcceptedOrder'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
var val;
function TabStack() {
    return (
        <Tab.Navigator
            initialRouteName="PendingOrder"
            tabBarOptions={{
                showIcon: true,
                activeTintColor: 'white',
                inactiveTintColor: 'grey',

                tabBarOptions: {
                    activeTintColor: 'red',
                  },

                style: {
                    backgroundColor: '#2B2D2F',
                },
                labelStyle: {
                    textAlign: 'center',
                    fontSize: 12
                },
                indicatorStyle: {
                    borderBottomColor: 'rgb(0,0,255)',
                    borderBottomWidth: 4,
                },
            }}>

            <Tab.Screen
                name="PendingOrder"
                children={() => <PendingOrder data={val} />}
                options={{
                    tabBarLabel: 'Pending',
                    tabBarIcon: ({ tintColor }) => (
                        <View>
                        <Icon style={[{ color: 'grey' }]} size={25} name={'download'} />
                      </View>
                    )
                }} />

            <Tab.Screen
                name="AcceptedOrder"
                component={AcceptedOrder}
                options={{
                    tabBarLabel: 'Accepted',
                    tabBarIcon: ({ tintColor }) => (
                        <View>
            <Icon style={[{ color: 'grey' }]} size={25} name={'checkmark-circle'} />
          </View>
                    )

                }} />

                <Tab.Screen
                name="DeliveredOrder"
                component={DeliveredOrder}
                options={{
                    tabBarLabel: 'Delivered',
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
    // val = navigation.getParam('data');
    // val=message;
    //console.log(message)


    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="PendingOrder"
                screenOptions={{
                    headerStyle: { backgroundColor: 'rgb(0,0,0)' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold' },

                }}>
                <Stack.Screen name="TabStack" component={TabStack} options={{ title: "Orders" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;