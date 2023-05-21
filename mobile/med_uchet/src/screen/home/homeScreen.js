import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native"
import axios from "axios";
import config from "../../../config";


const HomeScreen = () => {
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

                }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default HomeScreen;