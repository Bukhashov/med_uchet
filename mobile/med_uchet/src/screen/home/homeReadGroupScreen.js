import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, ScrollView, Linking} from "react-native"
import axios from "axios";
import config from "../../../config";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeReadGroupScreen = (props) => {
    const [todos, setTodos] = React.useState([]);
    
    const [formData, setFormData] = React.useState(new FormData());
    
    const pickDocument = async (title) => {
        let result = await DocumentPicker.getDocumentAsync({type: "application/pdf"});
        
        formData.append('file', {
            uri: result.uri,
            type: result.mimeType,
            name: result.name,
        });

        formData.append('fullname', await AsyncStorage.getItem("lastname") + await AsyncStorage.getItem("firstname"));
        
        formData.append('title', title);

    };

    const sendFile = async () => {
        console.log(props.route.params.content.gid);

        let uri = `${config.API_URI}${config.API_VERSION}/group/${props.route.params.content.gid}/add/report`
        
        await axios({
            method: "post",
            url: uri,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'},
        }).then(res => {            
            formData.delete('title');
            formData.delete('subject');
        })
    }

    const filework = async (title) => {
        await pickDocument(title);
        await sendFile();
    }

    const fatchTodos = async () => {
        try {
            await axios.get(`${config.API_URI}${config.API_VERSION}/group/${props.route.params.content.gid}/todo`).then(response => {
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
                <Text style={{color: "#CCD1D1", fontSize: 20, fontWeight: 700 }}>{props.route.params.content.title}</Text>
            </View>
            <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
                    {
                        todos.map(todo => (
                            <View 
                                key={todo._id}
                                style={{
                                    // display: 'flex',
                                    // flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    // alignItems: 'center',
                                    margin: 15,
                                    paddingHorizontal: 5,
                                    paddingVertical: 15,
                                    backgroundColor: "#839192",
                                    borderRadius: 8,
                                }}>
                                <View>
                                    <View>
                                        <Text style={{paddingHorizontal: 10, borderTopEndRadius: 8,  paddingVertical: 5, color: "#fff"}}>{todo.title}</Text>
                                    </View>
                                    <View>
                                        <Text style={{paddingHorizontal: 10, borderTopEndRadius: 8,  paddingVertical: 5, color: "#fff"}}>{todo.subject}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 15, paddingTop: 8,  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text onPress={() =>{Linking.openURL(`${config.API_URI}/pdf/${props.route.params.content.id}/${todo.title}.pdf`) }} 
                                        style={{ backgroundColor: "#A6ACAF", padding: 8, borderRadius: 8, color: "#fff", }}>Открыть файл</Text>
                                    <Text onPress={()=> { filework(todo.title) } } style={{backgroundColor: "#A6ACAF", padding: 8, borderRadius: 8, color: "#fff", }}>Отправить файл</Text>
                                </View>
                                
                            </View>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default HomeReadGroupScreen;