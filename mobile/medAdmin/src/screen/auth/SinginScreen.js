import React ,{ useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height;

const SinginScreen = ({navigation}) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    
    const onPressChangeTextInputLogin = (userLogin) => {
        setLogin(userLogin)
    }
    const onPressChangeTextInputPassword = (userPassword) => {
        setPassword(userPassword)
    }

    const onPressLogin = async () => {
        try{
            await axios.post(`${config.API_URI}${config.API_VERSION}/singin`, {
                email: login,
                password: password
            }).then(async (response) => {
                await AsyncStorage.setItem('uid', response.data.uid)
                await AsyncStorage.setItem('lastname', response.data.lastname)
                await AsyncStorage.setItem('firstname', response.data.firstname)
                await AsyncStorage.setItem('email', response.data.email)
                console.log(response.data);
                
            });
            
            navigation.navigate('mainNavigator');
        }
        catch(e){
            console.log(e);
            setLogin("")
            setPassword("")
            console.log("login no")
        }
    }

    const onPressAuth = () => {
        navigation.navigate('singup')
    }

    return(
        <View style={{width: width, height: height-300, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{  }}>
                <View style={{ paddingBottom: 15, }}>
                    <Text style={{ color: "#000", fontSize: 26, fontWeight: '400',  textAlign: 'center'}}>Qosh keldińiz</Text>
                </View>
                
                <View style={{ paddingBottom: 25, paddingTop: 5, alignItems: 'center',  display: 'flex', flexDirection: 'row' }}>
                    <View style={{ paddingRight: 12 }}>
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <Text style={{ color: "#000", fontSize: 18, padding: 5, }}>Почта</Text>
                        </View>
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <Text style={{ color: "#000", fontSize: 18, padding: 5, }}>Пароль</Text>
                        </View>
                        
                    </View> 
                    <View style={{ display: 'flex', alignItems: 'center', }}>
                    {/* email */}
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} 
                                maxLength={50}
                                onChangeText={uLogin => onPressChangeTextInputLogin(uLogin)} 
                                value={login}
                                style={{ color:"#000", width: 230, height: 32, padding: 8, borderColor: "#000", borderWidth: 1, }}
                            />
                        </View>
                     {/* password */}
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} 
                                maxLength={50}
                                onChangeText={uPass => onPressChangeTextInputPassword(uPass)} 
                                value={password}
                                style={{ color: "#000", width: 230, height: 32, padding: 8, borderColor: "#000", borderWidth: 1, }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',  }}>
                    <View style={{ width: 180, }}>
                        <Button 
                            onPress={()=> onPressLogin()}
                            color="#99A3A4"
                            title={'kirý'}
                        />
                    </View>
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={()=> console.log('e') }>
                        <View style={{ padding: 15}}>
                            <Text style={{color: "#000"}} >qupıa sózdi umytyp qaldym</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> onPressAuth() }>
                        <View style={{ padding: 15}}>
                            <Text style={{color: "#000"}}>tirkeý</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>            
        </View>
    )
}

export default SinginScreen;