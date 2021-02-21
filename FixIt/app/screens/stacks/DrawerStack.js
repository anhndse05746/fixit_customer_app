import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import InsideTabBottomNavigator from './InsideStack';
import MyProfileView from '../views/MyProfileView';

const Drawer = createDrawerNavigator();

const DrawerInside = () => {
  return (
    <Drawer.Navigator drawerContent={props => <MyProfileView {...props}/> }>
      <Drawer.Screen name="InsideApp" component={InsideTabBottomNavigator}/>
    </Drawer.Navigator>
  );
};

export default DrawerInside;