import {Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import {SwitchNavigator} from 'react-navigation';

import ReportScreen from '../screens/ReportScreen';
import ChartScreen from '../screens/ChartScreen';
import LoginScreen from '../screens/LoginScreen';

import Colors from '../constants/Colors';

const ReportNavigator = createStackNavigator({
  Report: ReportScreen,
  Chart: {
    screen: ChartScreen,
    // navigationOptions:
    // {headerStyle: {
    //   backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    // },
    // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor}
  }
  
},  {

  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'Milk Supply Report'
  }
});

const MainNavigator = createBottomTabNavigator(
  {
    Reports: {
      screen: ReportNavigator,
      // navigationOptions: {
      //   tabBarIcon: tabInfo => {
      //     return (
      //       <Ionicons
      //         name="ios-restaurant"
      //         size={25}
      //         color={tabInfo.tintColor}
      //       />
      //     );
      //   }
      // }
    },
    Charts: {
      screen: ChartScreen,
      // navigationOptions: {
      //   tabBarLabel: 'Favorites!',
      //   tabBarIcon: tabInfo => {
      //     return (
      //       <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
      //     );
      //   }
      // }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.accentColor
    }
  }
);

const AuthNavigator = createStackNavigator({
  Auth:LoginScreen
});

const TopNavigator= createSwitchNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator
})

export default createAppContainer(TopNavigator);
