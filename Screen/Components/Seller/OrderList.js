
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import PendingOrder from './PendingOrder';
import DeliveredOrder from './DeliveredOrder';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
var val;
function TabStack() {
    return (
        <Tab.Navigator
            initialRouteName="PendingOrder"
            tabBarOptions={{
                showIcon: true,
                activeTintColor: 'black',
                inactiveTintColor: 'black',



                style: {
                    backgroundColor: 'rgb(86, 255, 214)',
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
                        <Icon name="download" size={25} />
                    )
                }} />

            <Tab.Screen
                name="DeliveredOrder"
                component={DeliveredOrder}
                options={{
                    tabBarLabel: 'Delivered',
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="timer" size={25} />
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
                initialRouteName="Settings"
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