import React ,{ useState, useEffect} from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import config from '../../../config';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const SingupScreen = ({navigation}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    const onPressChangeTextInputLogin = (vel) => {
        setLogin(vel)
    }
    const onPressChangeTextInputPassword = (vel) => {
        setPassword(vel)
    }
    const onPressChangeTextInputFirstname = (vel) => {
        setFirstname(vel)
    }
    const onPressChangeTextInputLastname = (vel) => {
        setLastname(vel)
    }

    const onPressAuth = async () => {
        const res = await axios.post(`${config.API_URI}${config.API_VERSION}/singup`, {
            lastname: lastname,
            firstname: firstname,
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
                    <Text style={{ color: "#A2A9AB", fontSize: 26, fontWeight: '400',  textAlign: 'center'}}>Qosh keldińiz</Text>
                </View>

                <View style={{ paddingBottom: 25, paddingTop: 5, alignItems: 'center',  display: 'flex', flexDirection: 'row' }}>
                    <View style={{ paddingRight: 12 }}>
                            <View style={{paddingBottom: 15, paddingTop: 15,}}>
                                <Text style={{ color: "#A2A9AB", fontSize: 18, padding: 5, }}>Fistname</Text>
                            </View>
                            <View style={{paddingBottom: 15, paddingTop: 15,}}>
                                <Text style={{ color: "#A2A9AB", fontSize: 18, padding: 5, }}>Lastname</Text>
                            </View>
                            <View style={{paddingBottom: 15, paddingTop: 15,}}>
                                <Text style={{ color: "#A2A9AB", fontSize: 18, padding: 5, }}>Email</Text>
                            </View>
                            <View style={{paddingBottom: 15, paddingTop: 15,}}>
                                <Text style={{ color: "#A2A9AB", fontSize: 18, padding: 5, }}>Password</Text>
                            </View>
                            
                        </View> 
                    <View style={{ display: 'flex', alignItems: 'center', }}>
                    
                    {/* firstname */}
                    <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} 
                                maxLength={50}
                                onChangeText={vel => onPressChangeTextInputFirstname(vel)} 
                                value={firstname}
                                style={{ color: "#A2A9AB", width: 230, height: 32, padding: 8, borderColor: "#A2A9AB", borderWidth: 1, }}
                            />
                        </View>
                    {/* lastname */}
                    <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} 
                                maxLength={50}
                                onChangeText={vel => onPressChangeTextInputLastname(vel)} 
                                value={lastname}
                                style={{ color: "#A2A9AB", width: 230, height: 32, padding: 8, borderColor: "#A2A9AB", borderWidth: 1, }}
                            />
                    </View>
                    {/* email */}
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} 
                                maxLength={50}
                                onChangeText={uLogin => onPressChangeTextInputLogin(uLogin)} 
                                value={login}
                                style={{ color: "#A2A9AB", width: 230, height: 32, padding: 8, borderColor: "#A2A9AB", borderWidth: 1, }}
                            />
                        </View>
                     {/* password */}
                        <View style={{paddingBottom: 15, paddingTop: 15,}}>
                            <TextInput
                                numberOfLines={1} maxLength={50}
                                onChangeText={uPass => onPressChangeTextInputPassword(uPass)} 
                                value={password}
                                style={{ color: "#A2A9AB", width: 230, height: 32, padding: 8, borderColor: "#A2A9AB", borderWidth: 1, }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',  }}>
                    <View style={{ width: 180, }}>
                        <Button 
                            onPress={()=> onPressAuth()}
                            color="#A2A9AB"
                            title={'tirkeý'}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SingupScreen;