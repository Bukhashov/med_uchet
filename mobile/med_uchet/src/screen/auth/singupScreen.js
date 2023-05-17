import React ,{ useState, useEffect} from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import config from '../../../config';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const SingupScreen = ({navigation}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [fullname, setUserFullName] = useState("")

    const onPressChangeTextInputLogin = (userLogin) => {
        setLogin(userLogin)
    }
    const onPressChangeTextInputPassword = (userPassword) => {
        setPassword(userPassword)
    }
    const onPressChangeTextInputFullname = (userFullname) => {
        setUserFullName(userFullname)
    }

    const onPressAuth = async () => {
        const res = await axios.post(`${config.API_URI}/singup`, {
            fullname: fullname,
            password: password,
            email: login
        });
        if(res.status >= 200 && res.status < 400) {
            navigation.navigate('singin')
        }
    }

    return(
        <View style={{width: width, height: height-300, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{  }}>
                <View style={{ paddingBottom: 15, }}>
                    <Text style={{ fontSize: 26, fontWeight: '400',  textAlign: 'center'}}>Qosh keldińiz</Text>
                </View>

                <View style={{ paddingBottom: 25, paddingTop: 5, alignItems: 'center',  display: 'flex', flexDirection: 'row' }}>
                    <View style={{ paddingRight: 12 }}>
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                                <Text style={{ fontSize: 18, padding: 5, }}>FullName</Text>
                            </View>
                            <View style={{paddingBottom: 15, paddingTop: 15,}}>
                                <Text style={{ fontSize: 18, padding: 5, }}>Email</Text>
                            </View>
                            <View style={{paddingBottom: 15, paddingTop: 15,}}>
                                <Text style={{ fontSize: 18, padding: 5, }}>Password</Text>
                            </View>
                            
                        </View> 
                    <View style={{ display: 'flex', alignItems: 'center', }}>
                    {/* email */}
                    <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} 
                                maxLength={50}
                                onChangeText={uFullname => onPressChangeTextInputFullname(uFullname)} 
                                value={fullname}
                                style={{ width: 230, height: 32, padding: 8, borderColor: '#000', borderWidth: 1, }}
                            />
                        </View>
                    {/* email */}
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} 
                                maxLength={50}
                                onChangeText={uLogin => onPressChangeTextInputLogin(uLogin)} 
                                value={login}
                                style={{ width: 230, height: 32, padding: 8, borderColor: '#000', borderWidth: 1, }}
                            />
                        </View>
                     {/* password */}
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} maxLength={50}
                                onChangeText={uPass => onPressChangeTextInputPassword(uPass)} 
                                value={password}
                                style={{ width: 230, height: 32, padding: 8, borderColor: '#000', borderWidth: 1, }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',  }}>
                    <View style={{ width: 180, }}>
                        <Button 
                            onPress={()=> onPressAuth()}
                            color="#000"
                            title={'tirkeý'}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SingupScreen;