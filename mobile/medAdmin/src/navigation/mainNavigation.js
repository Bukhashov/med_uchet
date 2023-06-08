import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GroupNavigation from './groupNavigation';
import ProfileScreen from '../screen/auth/profileScreen';
import CreateGroupScreen from '../screen/createGroupScreen';

const Drawer = createDrawerNavigator();

const MainNavigation = ({navigation}) => {
    
    const controller = async () => {
        try{
            await AsyncStorage.getItem('uid').then((data) => {
                if(data == "" || data == null) navigation.navigate('singin');
            })
        }
        catch(e) {
            console.log(`Error Main Navigation get token : ${e}`);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            controller();
        }, [])
    )
    
    return (
        <Drawer.Navigator initialRouteName="Главный"
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
            <Drawer.Screen name="Главный" component={GroupNavigation} />
            <Drawer.Screen name="Создать" component={CreateGroupScreen} />
            <Drawer.Screen name="Профиль" component={ProfileScreen} />
        </Drawer.Navigator>
    )
}

export default MainNavigation;