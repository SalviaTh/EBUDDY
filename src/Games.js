import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";


export default function Classroom(navigation){
    const [fonts] = useFonts({
        baloo: require("../assets/fonts/static/Baloo2-ExtraBold.ttf"),
      });
    return(
        <ImageBackground style={styles.bg} source={require("../assets/background.png")} resizeMode="cover">
            <View>
                <Text>Classroom</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Classroom")} style={styles.button}><Text style={styles.buttonText}>Classroom</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Games")} style={styles.button}><Text style={styles.buttonText}>Games</Text>
                </TouchableOpacity>
                
            </View>
        </ImageBackground>
    )
}
const styles=StyleSheet.create(
    {
        bg:{
            alignItems:'center',
            justifyContent:'center',
            flex:1,
        },
        
        button:{
    backgroundColor:"#ffbe25",
    width:"250",
    marginBottom:20,
    padding:12,
    borderRadius:25,
    borderWidth:3,
    borderColor:"#fff",
    alignItems:"center"
  },
  buttonText:{
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'baloo',

  },
    }
)