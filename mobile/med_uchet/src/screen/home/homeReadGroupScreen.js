import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native"
import axios from "axios";
import config from "../../../config";


const HomeReadGroupScreen = (props) => {
    const [todos, setTodos] = React.useState([]);
    
    const fatchTodos = async () => {
        try {
            await axios.get(`${config.API_URI}${config.API_VERSION}/group/${props.route.params.content.id}/todo`).then(response => {
                setTodos(response.data);
                console.log(response.data);
            }) 
        }
        catch(e) {
            console.log(e)        
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fatchTodos();
        }, [])
    )

    return (
        <View>
            <View style={{paddingVertical: 18, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{color: "#fff", fontSize: 20, fontWeight: 700 }}>{props.route.params.content.title}</Text>
            </View>
            <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
                    {
                        todos.map(todo => (
                            <View 
                                key={todo._id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    margin: 15,
                                    paddingHorizontal: 5,
                                    paddingVertical: 15,
                                    backgroundColor: "#A5ABAB",
                                }}>
                                <Text style={{color: "#fff"}}>{todo.title}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default HomeReadGroupScreen;