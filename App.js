
import React from 'react';

//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import all the screens needed
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';

import RegisterScreen from './Screen/BuyerRegistration';
import BottomNav from './Screen/Components/BuyerScreens/BuyerNav';
import SellerNav from './Screen/Components/Seller/SellerNav';
import RegisterAs from './Screen/RegisterAs'
import SellerRegistration from './Screen/SellerRegistration'
import EditMedi from './Screen/Components/Seller/EditMedi'

const Auth = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

  EditMedi: {
    screen: EditMedi,
    navigationOptions: {
      headerShown: false,
    },
  },

  SignScreen: {
    screen: BottomNav,
    navigationOptions: {
      headerShown: false,
    },
  },
  BuyerRegistration: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
      title: 'Register',
      headerStyle: {
        backgroundColor: '#307ecc',
      },
      headerTintColor: '#fff',
    },
  },

  SellerRegistration: {
    screen: SellerRegistration,
    navigationOptions: {
      headerShown: false,
    },
  },

  RegisterAs: {
    screen: RegisterAs,
    navigationOptions: {
      headerShown: false,
    },
  },
});

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = createSwitchNavigator({ 
  SplashScreen: {
    /* SplashScreen which will come once for 5 Seconds */
    screen: SplashScreen,
    navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
      
    },
  },
  Auth: {
    /* Auth Navigator which includer Login Signup will come once */
    screen: Auth,
  },
  NavToSeller: {
    screen: SellerNav,
    navigationOptions: {
      
      headerShown: false,
    },
  },
  NavToBottom: {
    /* Navigation Drawer as a landing page */
    screen: BottomNav,
    navigationOptions: {
      /* Hiding header for Navigation Drawer as we will use our custom header */
      headerShown: false,
    },
  },
});

export default createAppContainer(App);