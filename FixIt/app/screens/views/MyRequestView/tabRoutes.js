import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RateTabView from './RateTabView';
import OngoingTabview from './OngoingTabView';
import ExecuteTabView from './ExecuteTabView';
import ConfirmTabView from './ConfirmTabView';

const Tab = createMaterialTopTabNavigator();

const RequestTabs = () => {
  return (
    <Tab.Navigator lazy={true}>
      <Tab.Screen
        name="Ongoing"
        component={OngoingTabview}
        options={{tabBarLabel: 'Đang chờ'}}
      />
      <Tab.Screen
        name="Execute"
        component={ExecuteTabView}
        options={{tabBarLabel: 'Đang xử lý'}}
      />
      <Tab.Screen
        name="Rate"
        component={RateTabView}
        options={{tabBarLabel: 'Đánh giá'}}
      />
      <Tab.Screen
        name="Confirm"
        component={ConfirmTabView}
        options={{tabBarLabel: 'Hoàn thành'}}
      />
    </Tab.Navigator>
  );
};

export default RequestTabs;
