import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../screen/group/mainScreen';
import ProfileScreen from '../screen/auth/profileScreen';
import CreateGroupScreen from '../screen/createGroupScreen';

const Drawer = createDrawerNavigator();

const MainNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName="Гловный"
            screenOptions={{
                // drawerActiveTintColor: "#fff",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#99A3A4",
                },
                drawerActiveBackgroundColor: "#B3B6B7",
                drawerStyle: {
                    backgroundColor: "#99A3A4",
                    
                },
                drawerLabelStyle: {
                    color: "#fff",
                }
            }}
        >
            <Drawer.Screen name="Гловный" component={MainScreen} />
            <Drawer.Screen name="Создать" component={CreateGroupScreen} />
            <Drawer.Screen name="Профиль" component={ProfileScreen} />
        </Drawer.Navigator>
    )
}

export default MainNavigation;