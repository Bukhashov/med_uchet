import React, {useState} from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import groupScreen from '../screen/group/groupScreen';
import groupReadScreen from '../screen/group/groupReadScreen';

const GroupNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="groupScreen">
            <Stack.Screen name="groupScreen" options={{ headerShown: false }} component={groupScreen} />
            <Stack.Screen name="groupReadScreen" options={{ headerShown: false }} component={groupReadScreen} />
        </Stack.Navigator>
    )
}

export default  GroupNavigation;