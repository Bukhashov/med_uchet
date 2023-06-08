import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screen/group/mainScreen';
import ReadScreen from '../screen/group/readScreen';
import AddTodoScreen from '../screen/group/addTodoScreen';
import ViewReportScreen from '../screen/group/viewReportScreen';

const Stack = createNativeStackNavigator();

const GroupNavigation = () => {    
    return (
        <Stack.Navigator initialRouteName="MainScreen">
            <Stack.Screen name="MainScreen" options={{ headerShown: false }} component={MainScreen} />
            <Stack.Screen name="ReadScreen" options={{ headerShown: false }} component={ReadScreen} />
            <Stack.Screen name="AddTodoScreen" options={{ headerShown: false }} component={AddTodoScreen} />
            <Stack.Screen name="ViewReportScreen" options={{ headerShown: false }} component={ViewReportScreen} />
        </Stack.Navigator>
    )
}

export default GroupNavigation;