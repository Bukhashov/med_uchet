import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import axios from "axios";
import config from "../../../config";


const HomeScreen = ({navigation}) => {
    const [allGroup, setAllGroup] = React.useState([]);

    const featData = () => {
        try{
            axios.get(`${config.API_URI}${config.API_VERSION}/group/all`).then(response => {
                setAllGroup(response.data);
                console.log(response.data);
                console.log("res")
            })
        }
        catch(e){
            console.log(e);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            featData();
        }, [])
    )
    

    return (
        <View>
             <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}> 
                {
                    allGroup.map(group => (
                        <TouchableOpacity
                            key={group._id}
                            onPress={() => {navigation.navigate("homeReadScreen", {
                                content: {
                                    id: group._id,
                                    title: group.title
                                }
                            })}}
                        >
                            <View style={{
                                marginHorizontal: 18,
                                marginVertical: 8,
                                paddingHorizontal: 18,
                                paddingVertical: 18,
                                borderRadius: 8,
                                backgroundColor: "#A5ABAB",
                                
                            }}>
                                <Text style={{ color: "#fff", fontSize: 16 }}>{group.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default HomeScreen;