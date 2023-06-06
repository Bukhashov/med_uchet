import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './mainNavigation';
import SingupScreen from '../screen/auth/SingupScreen';
import SinginScreen from '../screen/auth/SinginScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {    
    return (
        <Stack.Navigator initialRouteName="mainNavigator">
            <Stack.Screen name="mainNavigator" options={{ headerShown: false }} component={MainNavigator} />
            <Stack.Screen name="singin" options={{ headerShown: false }} component={SinginScreen} />
            <Stack.Screen name="singup" options={{ headerShown: false }} component={SingupScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;