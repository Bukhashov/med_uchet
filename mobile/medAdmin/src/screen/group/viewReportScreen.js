import { View, Text, SafeAreaView, ScrollView, Linking } from 'react-native';
import React from 'react';
import axios from 'axios';
import config from '../../../config';
import { useFocusEffect } from '@react-navigation/native';

const ViewReportScreen = (props) => {
    const [allReport, setAllReport] = React.useState([]);

    const featchReport = async () => {
        try{            
            await axios.get(`${config.API_URI}${config.API_VERSION}/group/${props.route.params.content.gid}/${props.route.params.content.title}/report`)
            .then((res) => {
                setAllReport(res.data);
            console.log(res.data);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            featchReport()
        }, [])
    )
    console.log(props.route.params.content.gid)


    return (
        <View>
            <View style={{ paddingVertical: 15,  }}>
                <Text style={{ fontSize: 18, paddingHorizontal: 15, textAlign: 'center' }}>{props.route.params.content.title}</Text>
            </View>
                <SafeAreaView>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
                        <View style={{
                            paddingHorizontal: 15,
                        }}>
                            {
                                allReport.map((resort) => (
                                    <View key={resort._id}
                                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                                        paddingHorizontal: 15, backgroundColor: "#99A3A4",
                                        paddingVertical: 15, borderRadius: 8,
                                    }}
                                    >
                                        <Text style={{ fontSize: 16, color: "#fff",  }}>{resort.fullname}</Text>
                                        
                                        <Text onPress={() => { 
                                            console.log(Linking.openURL(`${config.API_URI}/pdf/report/${props.route.params.content.gid}/${resort.fullname}/${resort.title}.pdf`))
                                            Linking.openURL(`${config.API_URI}/pdf/report/${props.route.params.content.gid}/${resort.fullname}/${resort.title}.pdf`)}}
                                            
                                        >Открыть отчет</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
        </View>
    )
}

export default ViewReportScreen;