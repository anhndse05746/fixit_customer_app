import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CancelTabView from './CancelTabView';
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
        name="Confirm"
        component={ConfirmTabView}
        options={{tabBarLabel: 'Hoàn thành'}}
      />
      <Tab.Screen
        name="Cancel"
        component={CancelTabView}
        options={{tabBarLabel: 'Đã hủy'}}
      />
    </Tab.Navigator>
  );
};

export default RequestTabs;
