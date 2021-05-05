import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { calcScale } from '../../utils/dimension';
import AnnouncementView from '../views/AnnouncementView';
import AddressListView from '../views/CreateRequestView/AddressListView';
import ConfirmRequestView from '../views/CreateRequestView/ConfirmRequestView';
import CreateAddressView from '../views/CreateRequestView/CreateAddressView';
import CreateRequestView from '../views/CreateRequestView/CreateRequestView';
import HomeView from '../views/HomeView';
import MyProfileView from '../views/MyProfileView';
import RequestTabs from '../views/MyRequestView/tabRoutes';
import RequestDetailView from '../views/RequestDetailView';
import ServiceListView from '../views/ServiceView/ServiceListView';
import messaging from '@react-native-firebase/messaging'

import { useDispatch, useSelector } from 'react-redux';
import { listAllRequest } from '../../store/request';
import BillDetailView from '../views/RequestDetailView/BillDetailView';
const InsideTabBottom = createBottomTabNavigator();

const InsideTabBottomNavigator = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data.requestId != 0) {
        navigation.navigate('MyRequestStackNavigator', {
          screen: remoteMessage.data.screen,
          params: { requestId: remoteMessage.data.requestId }
        });
      }

    });

    messaging().onMessage(async remoteMessage => {
      alert(`${remoteMessage.notification.title}\n${remoteMessage.notification.body}`);
    });

  }, []);

  return (
    <InsideTabBottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeStackNavigator') {
            return <Icon name="home" size={calcScale(22)} color={color} />;
          } else if (route.name === 'MyRequestStackNavigator') {
            return <Icon name="tasks" size={calcScale(22)} color={color} />;
          } else if (route.name === 'AnnouncementStackNavigator') {
            return <Icon name="bell" size={calcScale(22)} color={color} />;
          } else {
            return <Icon name="user" size={calcScale(22)} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: 'rgb(242, 85, 44)',
      }}>
      <InsideTabBottom.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Trang chủ' }}
      />
      <InsideTabBottom.Screen
        name="MyRequestStackNavigator"
        component={MyRequestStackNavigator}
        options={{ tabBarLabel: 'Yêu cầu' }}
      />
      <InsideTabBottom.Screen
        name="AnnouncementStackNavigator"
        component={AnnouncementStackNavigator}
        options={{ tabBarLabel: 'Thông báo' }}
      />
      <InsideTabBottom.Screen
        name="Thông tin cá nhân"
        component={MyProfileView}
        options={{ tabBarLabel: 'Tôi' }}
      />
    </InsideTabBottom.Navigator>
  );
};

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="HomeView"
        component={HomeView}
      />
      <HomeStack.Screen
        name="ServiceListView"
        component={ServiceListView}
        options={({ route }) => ({
          title: route.params.serviceName,
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        })}
      />
      <HomeStack.Screen
        name="CreateRequestView"
        component={CreateRequestView}
        options={{
          title: 'Tạo yêu cầu',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
      <HomeStack.Screen
        name="ConfirmRequestView"
        component={ConfirmRequestView}
        options={{
          title: 'Xác nhận yêu cầu',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
      <HomeStack.Screen
        name="AddressListView"
        component={AddressListView}
        options={{
          title: 'Chọn địa chỉ',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
      <HomeStack.Screen
        name="CreateAddressView"
        component={CreateAddressView}
        options={{
          title: 'Thêm địa chỉ',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
    </HomeStack.Navigator>
  );
};

const MyRequestStack = createStackNavigator();

const MyRequestStackNavigator = () => {
  const navigation = useNavigation();
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('on Going Requests List: ' + user.token + user.userId)
    dispatch(listAllRequest(user.token, user.userId));
  }, []);

  return (
    <MyRequestStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
      }}>
      <MyRequestStack.Screen
        name="MyRequest"
        options={{
          title: 'Danh sách yêu cầu',
          headerRight: () => {
            return (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={'#ccd0d5'}
                onPress={() => navigation.openDrawer()}
                style={styles.iconBox}>
                <Icon name="user" size={calcScale(22)} color="#fff" />
              </TouchableHighlight>
            );
          },
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerLeft: null,
        }}
        component={RequestTabs}
      />
      <MyRequestStack.Screen
        name="RequestDetailView"
        component={RequestDetailView}
        options={({ route }) => ({
          title: 'Chi tiết yêu cầu',
          headerLeft: () => {
            return (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={'#ccd0d5'}
                onPress={() => {
                  route.params.flag === 'announcement'
                    ? backToAnnouncement(navigation)
                    : navigation.navigate('MyRequest');
                }}
                style={styles.backButton}>
                <Icon
                  name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
                  size={calcScale(22)}
                  color="#fff"
                  light={true}
                />
              </TouchableHighlight>
            );
          },
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
        })}
      />
      <MyRequestStack.Screen
        name="BillDetailView"
        component={BillDetailView}
        options={({ route }) => ({
          title: 'Chi tiết hóa đơn',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
        })}
      />
    </MyRequestStack.Navigator>
  );
};

const backToAnnouncement = (navigation) => {
  navigation.pop();
  navigation.navigate('AnnouncementView');
};

const AnnouncementStack = createStackNavigator();

const AnnouncementStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <AnnouncementStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
      }}>
      <AnnouncementStack.Screen
        name="AnnouncementView"
        options={{
          title: 'Thông báo',
          headerRight: () => {
            return (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={'#ccd0d5'}
                onPress={() => navigation.openDrawer()}
                style={styles.iconBox}>
                <Icon name="user" size={calcScale(22)} color="#fff" />
              </TouchableHighlight>
            );
          },
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerLeft: null,
        }}
        component={AnnouncementView}
      />
    </AnnouncementStack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    width: calcScale(40),
    height: calcScale(40),
    borderRadius: calcScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: calcScale(10),
  },
  backButton: {
    width: calcScale(50),
    height: calcScale(50),
    borderRadius: calcScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: calcScale(10),
  },
});

export default InsideTabBottomNavigator;
