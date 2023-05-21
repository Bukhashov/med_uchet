import React, {useState} from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import homeScreen from '../screen/home/homeScreen';
import homeReadScreen from '../screen/home/homeReadGroupScreen';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="homeScreen">
            <Stack.Screen name="homeScreen" options={{ headerShown: false }} component={homeScreen} />
            <Stack.Screen name="homeReadScreen" options={{ headerShown: false }} component={homeReadScreen} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;