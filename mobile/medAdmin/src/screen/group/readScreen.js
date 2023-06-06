import { View, Text, Dimensions } from "react-native";

const ReadScreen = (props) => {

    return (
        <View>
            <View style={{ marginVertical: 15, marginHorizontal: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{ paddingHorizontal: 15, paddingVertical: 18, 
                    borderRadius: 12,
                    backgroundColor: "#99A3A4", color: "#fff",
                    fontWeight: '600',
                }}
                    onPress={() => {
                        
                    }}
                    >Создать задачу</Text>
            </View>

        </View>
    )
}

export default ReadScreen;