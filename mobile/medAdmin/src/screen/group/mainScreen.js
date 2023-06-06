import React, { useState, useEffect } from "react";
import { View, Text, Dimensions,  SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from "../../../config";


var width = Dimensions.get('window').width;

const MainScreen = () => {
    const [allGroup, setAllGroup] = useState([]);


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
    
    useFocusEffect(React.useCallback(() => {
        featchAllGroups();
    }, []))



    return (
        <View>
            <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
                    <View style={{ paddingHorizontal: 15, }}>
                    {
                        allGroup.map((group) => (
                            <TouchableOpacity 
                                key={group._id}
                                style={{
                                    backgroundColor: "#99A3A4",
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ color: "#fff",  paddingVertical: 15, paddingHorizontal: 8, }}>{group.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    </View>
                    
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default MainScreen;