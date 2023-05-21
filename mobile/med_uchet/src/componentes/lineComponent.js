import { View, Dimensions } from "react-native"

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const LineComponent = () => {
    return(
        <View style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <View style={{
                margin: 3, 
                width: width-20, 
                height: 3, 
                borderRadius: 10,
                backgroundColor: '#A5ABAB'
            }} />
        </View>
        
    )
}

export default LineComponent;