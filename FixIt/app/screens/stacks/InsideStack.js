import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeView from '../views/HomeView';
import ServiceListView from '../views/ServiceView/ServiceListView';
import AnnoucementView from '../views/AnnouncementView';
import MyRequestView from '../views/MyRequestView';
import {calcScale} from '../../utils/dimension';
import MyProfileView from '../views/MyProfileView';
import ChangePasswordView from '../views/ChangePasswordView';

const InsideTabBottom = createBottomTabNavigator();

const InsideTabBottomNavigator = () => {
  return (
    <InsideTabBottom.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'HomeStackNavigator') {
            return <Icon name="home" size={calcScale(22)} color={color} />;
          } else if (route.name === 'MyRequestView') {
            return <Icon name="tasks" size={calcScale(22)} color={color} />;
          } else if (route.name === 'AnnoucementView') {
            return <Icon name="bell" size={calcScale(22)} color={color} />;
          } else {
            return <Icon name="user" size={calcScale(22)} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: 'rgb(242, 85, 44)',
      }}>
      <InsideTabBottom.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
      />
      <InsideTabBottom.Screen name="MyRequestView" component={MyRequestView} />
      <InsideTabBottom.Screen
        name="AnnoucementView"
        component={AnnoucementView}
      />
      <InsideTabBottom.Screen name="MyProfileView" component={MyProfileView} />
    </InsideTabBottom.Navigator>
  );
};

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{headerShown: false}}
        name="HomeView"
        component={HomeView}
      />
      <HomeStack.Screen name="ServiceListView" component={ServiceListView} />
    </HomeStack.Navigator>
  );
};

export default InsideTabBottomNavigator;
