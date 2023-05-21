import React from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// Screen

import GroupNavigation from './groupNavigation';
import HomeScreen from '../screen/home/homeScreen';
import ProfileScreen from '../screen/auth/userScreen';

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: true,
                tabBarIcon:  ({ focused, color, size }) => {
                    let iconName;
                    if(route.name === "Home") {
                        iconName = focused ? 'home' : 'home-outline' 
                    }
                    else if (route.name === "Group") {
                        iconName = focused ? 'people' : 'people-outline' 
                    }
                    else if (route.name === "User") {
                        iconName = focused ? 'person' : 'person-outline' 
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarStyle: {
                    backgroundColor:'#000',
                    height: 60,
                    // borderTopColor: "#fff",
                    // borderWidth: 1,
                },
                tabBarItemStyle: {
                    margin:5,
                    //borderRadius:10,
                },
                headerStyle: {
                    backgroundColor:'#0D0D0E',
                    // borderBottomColor: "#fff",
                    // borderWidth: 1,
                },
                headerTitleStyle: {
                    color: '#fff',
                },
            })}
        >
            <Tab.Screen name="Home"  component={HomeScreen} />
            <Tab.Screen name="Group" component={GroupNavigation} />
            <Tab.Screen name="User" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainNavigation;