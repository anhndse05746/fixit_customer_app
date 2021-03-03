import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import InsideTabBottomNavigator from './InsideStack';
import MyProfileDrawer from '../views/MyProfileDrawer';

const Drawer = createDrawerNavigator();

const DrawerInside = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <MyProfileDrawer {...props} />}>
      <Drawer.Screen name="InsideApp" component={InsideTabBottomNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerInside;
