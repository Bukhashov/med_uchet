import React from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
// import FormData from 'form-data'

import axios from 'axios';
import config from '../../../config/index';

var width = Dimensions.get('window').width;

const AddTodoScreen = (props) => {
    const [newTodoTitle, setNewTodoTitle] = React.useState("");
    const [newTodoSubject, setNewTodoSubject] = React.useState("");
    const [formData, setFormData] = React.useState(new FormData());

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({type: "application/pdf"});
        
        formData.append('file', {
            uri: result.uri,
            type: result.mimeType,
            name: result.name,
        });

        console.log(result.uri);
        console.log(result);
    };

    const updateFormData = (field, value) => {
        formData.append(field, value);
        
        setFormData(formData);
    };

    const onPressTitle = (vel) => {
        setNewTodoTitle(vel)
    }
    const onPressSubject = (vel) => {
        setNewTodoSubject(vel);
    }
    
    const onPressCreateTodo = async () => {
        try{
            updateFormData('title',  newTodoTitle);
            updateFormData('subject',  newTodoSubject);
           
            let uri = `${config.API_URI}${config.API_VERSION}/group/${props.route.params.content.gid}/add/todo`;
            
            await axios({
                method: "post",
                url: uri,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'},
            }).then(res => { 
                console.log(res.data)
                
                formData.delete('title');
                formData.delete('subject');
            })           
        }
        catch(e){
            console.log(e);
            // formData.delete('title');
            // formData.delete('subject');
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
                    onChangeText={vel => onPressTitle(vel)} 
                    value={newTodoTitle}
                    style={{ 
                        color: "#000", 
                        width: width-20, height: 32, 
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
                    onChangeText={vel => onPressSubject(vel)} 
                    value={newTodoSubject}
                    style={{ 
                        color: "#000", 
                        width: width-20, height: 200,
                        padding: 8, 
                        borderColor: "#000", borderWidth: 1, 
                    }}
                />
            </View>

            <View style={{ padding: 5, width: width-20, display: 'flex' }}>
                <Text
                    style={{
                        color: "#fff",
                        backgroundColor: "#99A3A4",
                        paddingVertical: 15,
                        paddingHorizontal: 8,
                    }}
                    onPress={() => pickDocument("ff")}
                >прикрепите файл</Text>
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
                        backgroundColor: "#99A3A4",
                    }}
                    onPress={() => onPressCreateTodo()}
                >Создать</Text>
            </View>
            

        </View>
    )
}

export default AddTodoScreen;