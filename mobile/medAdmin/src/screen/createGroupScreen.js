import React from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from '../../config/index';

var width = Dimensions.get('window').width;

const CreateGroupScreen = () => {
    const [newTitle, setNewTitle] = React.useState("");
    const [newSubject, setNewSubject] = React.useState("");

    const createNewGroup = async () => {
        try{
            await axios.post(`${config.API_URI}${config.API_VERSION}/group/create`, {
                uid: await AsyncStorage.getItem("uid").then(async data => data),
                title: newGroupTitle,
                subject: newSubject,
            }).then(res => {
                setNewTitle("");
                setNewSubject("");
            })
        }catch(e) {
            console.log(e);
        }
    }
    return (
        <View style={{
            paddingHorizontal: 5,
        }}
        >
            {/* name new croup */}
            <View style={{
               padding: 5,
            }}>
                <Text style={{
                    fontSize: 18,
                }}>Называния</Text>
                <TextInput
                    numberOfLines={1} 
                    maxLength={50}
                    onChangeText={vel => setNewTitle(vel)} 
                    value={newTitle}
                    style={{ 
                        color: "#000", 
                        width: width-50, height: 32, 
                        padding: 8, 
                        borderColor: "#000", borderWidth: 1, 
                    }}
                />
            </View>
            {/* subject */}
            <View style={{
               padding: 5,
            }}>
                <Text style={{
                    fontSize: 18,
                }}>Называния</Text>
                
                <TextInput
                    editable
                    multiline
                    numberOfLines={15}
                    maxLength={5000}
                    onChangeText={vel => setNewSubject(vel)} 
                    value={newSubject}
                    style={{ 
                        color: "#000", 
                        width: width-50, height: 200,
                        padding: 8, 
                        borderColor: "#000", borderWidth: 1, 
                    }}
                />
            </View>

            <View style={{
                padding: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',

            }}>
                <Text
                    style={{
                        paddingHorizontal: 25,
                        paddingVertical: 15,
                        borderRadius: 12,
                        backgroundColor: "#fff",
                    }}
                    onPress={() => createNewGroup()}
                >Создать</Text>
            </View>

        </View>

    )
}

export default CreateGroupScreen;