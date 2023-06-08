import React, { useEffect, useState } from "react";
import { View, Text, Dimensions,  SafeAreaView, ScrollView, Linking} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import config from "../../../config";


const ReadScreen = (props) => {

    const [data, setData] = useState([]);

    const featchdata = async () => {
        try{ 
            await axios.get(`${config.API_URI}${config.API_VERSION}/group/${props.route.params.content.gid}/todo`).then((res) => {
                console.log(res.data);
                setData(res.data);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    useFocusEffect(React.useCallback(() => {
        featchdata();
    }, []))
    

    return (
        <View>
            <View style={{ marginVertical: 15, marginHorizontal: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{ paddingHorizontal: 15, paddingVertical: 18, 
                    borderRadius: 12,
                    backgroundColor: "#99A3A4", color: "#fff",
                    fontWeight: '600',
                }}
                    onPress={() => {
                        props.navigation.navigate("AddTodoScreen", {
                            content: {
                                gid: props.route.params.content.gid,
                            }
                        })
                    }}
                    >Создать задачу</Text>
            </View>
            <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
                    <View style={{ 
                        paddingHorizontal: 15,
                    }}>
                        {
                            data.map((d) => (
                                <View key={d._id}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 8,
                                        paddingHorizontal: 8,
                                        paddingVertical: 8,
                                        backgroundColor: "#99A3A4",
                                    }}
                                >
                                    <View>
                                        <View style={{ paddingHorizontal: 5, paddingVertical: 5, }}>
                                            <Text style={{ fontSize: 18, color: "#fff" }}>{d.title}</Text>
                                        </View>
                                        <View style={{ paddingHorizontal: 5, paddingVertical: 5, }}>
                                            <Text style={{ fontSize: 16, color: "#fff" }}>{d.subject}</Text>
                                        </View>
                                    </View>
                                    <View style={{ 
                                         display: 'flex',
                                         flexDirection: 'row',
                                         justifyContent: 'space-between',
                                         alignItems: 'center',
                                         padding: 8,
                                    }}>
                                        
                                        <Text onPress={() => { Linking.openURL(`${config.API_URI}/pdf/${props.route.params.content.gid}/${d.title}.pdf`) }} 
                                            style={{ borderRadius: 8, padding: 8, color: "#A6ACAF", backgroundColor: "#E5E7E9",  }}>Открыть файл</Text>
                                        <Text onPress={() =>{ props.navigation.navigate('ViewReportScreen', {
                                                content: {
                                                    gid: d._id,
                                                    title: d.title,
                                                }
                                            }); } }
                                            style={{ borderRadius: 8, padding: 8, color: "#A6ACAF", backgroundColor: "#E5E7E9", }}>Отчет</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ReadScreen;