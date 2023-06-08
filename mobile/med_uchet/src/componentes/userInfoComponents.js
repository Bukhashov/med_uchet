import { View, Text, Dimensions } from "react-native"
import LineComponent from "./lineComponent";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const UserInfoComponent = (props) => {
    return (
        <View style={{paddingTop: 10, paddingBottom: 10}}>
            <View style={{marginLeft: 15, marginRight: 15, padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View><Text style={{color: "#B3B6B7" }}>{props.title}</Text></View>  
                <View><Text style={{color: "#000"}}>{props.vel}</Text></View>
            </View>
            <LineComponent />
        </View>
    )
}

export default UserInfoComponent