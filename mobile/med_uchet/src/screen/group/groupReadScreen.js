import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const GroupReadScreen = (props) => {
    const [newTodo, setNewTodo] = React.useState("");    

    return (
        <View>
            <View style={{paddingVertical: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                <Text style={{color: "#fff", fontSize: 24}} >{props.route.params.content.title}</Text>
            </View>
            
            <View>
                <TextInput 
                    numberOfLines={1} 
                    maxLength={250}
                    onChangeText={vel => onPressNewGroupTitle(vel)} 
                    value={newTodo}
                    style={{ 
                        width: 230, height: 32, 
                        padding: 8, marginHorizontal: 8, 
                        color: "#A2A9AB", borderColor: '#A2A9AB', 
                        borderRadius: 8, borderWidth: 1, 
                    }}
                />
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