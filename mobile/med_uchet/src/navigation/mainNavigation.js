import React from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image} from 'react-native';
// Screen
import HomeNavigation from './homeNavigation';
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
                    if(route.name === "Главный") {
                        iconName = focused ? 'home' : 'home-outline' 
                    }
                    else if (route.name === "Пользователь") {
                        iconName = focused ? 'person' : 'person-outline' 
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#fff",
                tabBarStyle: {
                    backgroundColor:'#ACCFFF',
                    height: 80,
                    borderTopEndRadius: 12,
                    borderTopStartRadius: 12,
                    // borderTopColor: "#fff",
                    // borderWidth: 1,
                },
                tabBarItemStyle: {
                    margin:10,
                    
                    //borderRadius:10,
                },
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                    backgroundColor:'#ACCFFF',
                    // borderBottomColor: "#fff",
                    // borderWidth: 1,
                },
                headerTitleStyle: {
                    color: '#fff',

                },
            })}
        >
            <Tab.Screen name="Главный"  component={HomeNavigation} />
            <Tab.Screen name="Пользователь" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainNavigation;

const LogoTitle = (props) => {
    console.log(props)
    return (
        <View style={{ display: 'flex', flexDirection: 'row', }}>
            <Image style={{ width: 32, height: 32, padding: 5, }} source={require('../constants/logo.png')} />
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600'}}>{props.children}</Text>
        </View>
    )
}