import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginView from '../views/LoginView';

const OutsideStack = createStackNavigator();
const OutsideStackNavigator = () => {
    return (
        <OutsideStack.Navigator mode='card' screenOptions={{headerShown: false}}>
            <OutsideStack.Screen name="LoginView" component={LoginView} />
        </OutsideStack.Navigator>
    );
}

export default OutsideStackNavigator;