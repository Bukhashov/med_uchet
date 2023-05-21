import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TextInput, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "../../../config";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height;

const GroupScreen = ({navigation}) => {
    const [isCreate, setIsCreate] = useState(false);
    const [uid, setUid] = useState();
    const [createBtnVel, setCreateBtnVel] = useState("+")
    const [allGroup, setAllGroup] = useState([]);
    const [newGroupTitle, setNewGroupTitle] = useState("")

    const onPressCreateGroupBtn = () => {
        if(isCreate) {
            setCreateBtnVel("-");
            setIsCreate(false);
        }else{
            setCreateBtnVel("+");
            setIsCreate(true);
        }
    }

    const onPressNewGroupTitle = (vel) => {
        setNewGroupTitle(vel)
    }


    const featchAllGroups = async () => {
        try{            
            await axios.get(`${config.API_URI}${config.API_VERSION}/group/my/${await AsyncStorage.getItem("uid").then(async data => data)}`).then((res) => {
                console.log(res.data);
                setAllGroup(res.data);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const createNewGroup = async () => {
        if(newGroupTitle.length >= 1){
            try{
                await axios.post(`${config.API_URI}${config.API_VERSION}/group/create`, {
                    uid: await AsyncStorage.getItem("uid").then(async data => data),
                    title: newGroupTitle
                }).then(res => {
                    setNewGroupTitle("");
                })
                featchAllGroups();
            }catch(e){
                console.log(e);            
            }
        }
    }

    const feat = async () => {
        featchAllGroups();
    }

    useFocusEffect(
        React.useCallback(() => {
            feat();
        }, [])
    )

    return (
        <View>
            <View style={{paddingVertical: 8, paddingHorizontal: 12, width: width, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View ><Text style={{color: "#A2A9AB", fontSize: 18}}>Create group</Text></View>
                <View style={{width: 42, borderColor: '#A2A9AB', borderRadius: 6, borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Text 
                        onPress={() => onPressCreateGroupBtn()} 
                        style={{color: "#A2A9AB", fontSize: 22, paddingHorizontal: 10, paddingVertical: 2}}
                    >{createBtnVel}
                    </Text>
                </View>
            </View>

            {/* Create Group */}
            <View style={isCreate ? { display: 'flex', paddingHorizontal: 16, paddingVertical: 8,} : { display: 'none'}}>
                <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}> 
                    <Text style={{color: "#A2A9AB"}}>Title: </Text>
                    <TextInput
                        numberOfLines={1}
                        maxLength={50}
                        onChangeText={vel => onPressNewGroupTitle(vel)} 
                        value={newGroupTitle}
                        style={{ width: 230, height: 32, padding: 8, marginHorizontal: 8, color: "#A2A9AB", borderColor: '#A2A9AB', borderRadius: 8, borderWidth: 1, }}
                        />
                    <View>
                        <Text onPress={()=> createNewGroup()}
                            style={{color: "#A2A9AB", padding: 8, borderRadius: 8, borderColor: "#A2A9AB", borderWidth: 1, }}>Create</Text>
                    </View>
                </View>
            </View>
            <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}> 
                    {
                        allGroup.map(group => 
                            <TouchableOpacity key={group._id}
                                onPress={() => {navigation.navigate("groupReadScreen", {
                                    content: {
                                        id: group._id,
                                        title: group.title
                                    }
                                })}}
                            >
                                <View
                                    style={{ 
                                        margin: 15,
                                        paddingHorizontal: 10, paddingVertical: 10,
                                        width: width-35, height: 55, 
                                        display: 'flex', flexDirection: 'row', justifyContent: 'center',  
                                        backgroundColor: "#A2A9AB",
                                    }}
                                >
                                    <Text style={{color: '#000'}}>{group.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default GroupScreen; 