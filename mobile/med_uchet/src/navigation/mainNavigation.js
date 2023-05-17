import React, {useState} from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

// Screen

import GroupScreen from '../screen/group/groupScreen';
import HomeScreen from '../screen/home/homeScreen';

const Tab = createBottomTabNavigator();

const MainNavigation = ({navigation}) => {
    
    const controller = async () => {
        try{
            await AsyncStorage.getItem('token').then((data) => {
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
                    if(route.name === "home") {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline' 
                    }
                    else if (route.name === "home") {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline' 
                    }
                    else if (route.name === "home") {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline' 
                    }
                    return <Ionic name={iconName} size={size} color={color} />
                }
            })}
            // tabBarOptions={{
            //     showLabel:false,
            //     style={
            //         backgroundColor: '#fff'
            //     }
            // }}
        >
            <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Tab.Screen name="Group" component={GroupScreen} />

        </Tab.Navigator>
    )
}

export default MainNavigation;