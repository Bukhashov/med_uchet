import React, {useState} from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RestoreNavigation = () => {
    
    return (
        <Stack.Navigator initialRouteName="restore">
            <Stack.Screen name="restore" options={{ headerShown: false }} component={TabNavigator} />
            <Stack.Screen name="confirm" options={{ headerShown: false }} component={SinginScreen} />
            <Stack.Screen name="newpassword" options={{ headerShown: false }} component={SingupScreen} />
        </Stack.Navigator>
    )
}

export default RestoreNavigation;