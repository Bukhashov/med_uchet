import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import config from '../../../config';
import { View, Text, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const GroupReadScreen = (props) => {
    const [newTodo, setNewTodo] = React.useState("");    
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
    const addTodo = async () => {
        try {
            await axios.post(`${config.API_URI}${config.API_VERSION}/group/${props.route.params.content.id}/add/todo`, {

            })
        }
        catch(e) {
            console.log(e);
        }
    }
    const onPressNewTodo = (vel) => {
        setNewTodo(vel);
    }

    useFocusEffect(
        React.useCallback(() => {
            fatchTodos();
        }, [])
    )

    return (
        <View>
            <View style={{paddingVertical: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                <Text style={{color: "#fff", fontSize: 24}} >{props.route.params.content.title}</Text>
            </View>
            
            <View style={{paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center',  }}>
                <Text style={{color: "#fff"}}>Add Todo:</Text>
                <TextInput 
                    numberOfLines={1} 
                    maxLength={250}
                    onChangeText={vel => onPressNewTodo(vel)} 
                    value={newTodo}
                    style={{ 
                        width: 230, height: 32, 
                        padding: 8, marginHorizontal: 8, 
                        color: "#A2A9AB", borderColor: '#A2A9AB', 
                        borderRadius: 8, borderWidth: 1, 
                    }}
                />
                <Text onPress={() => addTodo()}
                    style={{color: "#fff", paddingHorizontal: 17, paddingVertical: 5, borderColor: "#fff", borderWidth: 1, borderRadius: 5,}}
                    >Add</Text>
            </View>
            <View>
                <Text style={{paddingHorizontal: 10, paddingVertical: 5, color: "#fff", }}>Todo</Text>
                <View style={{width: width-20, height: 2, backgroundColor: "#fff", marginHorizontal: 10, marginVertical: 10, borderRadius: 8,}}></View>
            </View>
            <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
                    
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default GroupReadScreen;