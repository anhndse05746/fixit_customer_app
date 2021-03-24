import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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

const InsideTabBottom = createBottomTabNavigator();

const InsideTabBottomNavigator = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        remoteMessage.data
      );
      navigation.navigate('MyRequestStackNavigator', {
        screen: remoteMessage.data.screen,
        params: { requestId: remoteMessage.data.requestId }
      });
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
        name="MyProfileView"
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
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        })}
      />
      <HomeStack.Screen
        name="CreateRequestView"
        component={CreateRequestView}
        options={{
          title: 'Tạo yêu cầu',
          headerTitleStyle: { color: '#fff' },
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
      <HomeStack.Screen
        name="ConfirmRequestView"
        component={ConfirmRequestView}
        options={{
          title: 'Xác nhận yêu cầu',
          headerTitleStyle: { color: '#fff' },
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
      <HomeStack.Screen
        name="AddressListView"
        component={AddressListView}
        options={{
          title: 'Chọn địa chỉ',
          headerTitleStyle: { color: '#fff' },
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
      <HomeStack.Screen
        name="CreateAddressView"
        component={CreateAddressView}
        options={{
          title: 'Thêm địa chỉ',
          headerTitleStyle: { color: '#fff' },
          headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
        }}
      />
    </HomeStack.Navigator>
  );
};

const MyRequestStack = createStackNavigator();

const MyRequestStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <MyRequestStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(242, 85, 44)' },
      }}>
      <MyRequestStack.Screen
        name="MyRequest"
        options={{
          title: 'My Request',
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
                  color="#000000"
                  light={true}
                />
              </TouchableHighlight>
            );
          },
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
          title: 'Notifications',
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
