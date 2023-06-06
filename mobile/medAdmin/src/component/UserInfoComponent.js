import { View, Text } from "react-native";


const UserInfoComponent = (props) => {
    return (
        <View style={{
            backgroundColor: "#99A3A4",
            paddingHorizontal: 15,
            paddingVertical: 20,
            borderRadius: 12,
            marginVertical: 15,
            display: 'flex', flexDirection: 'row',  justifyContent: 'space-between', 
        }}>
            <Text style={{ color: "#fff" }}>{props.title}</Text>   
            <Text style={{ color: "#fff" }}>{props.vel}</Text>        
        </View>
    )
}

export default UserInfoComponent;