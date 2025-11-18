import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity,ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import LessonPlayer from "./components/LessonPlayer";
import { useEffect, useState } from 'react';


export default function Classroom({navigation,route}){
    const {name}=route.params;
    const [lesson, setLesson] = useState(null);
    const [fonts] = useFonts({
        baloo: require("../assets/fonts/static/Baloo2-ExtraBold.ttf"),
      });
    const fetchLesson = async () => {
    const res = await fetch("http://172.20.10.9:4000/teach/class1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        topic: "Addition"
      })
    });

    const data = await res.json();
    setLesson(data);
  };

  useEffect(() => {
    fetchLesson();
  }, []);

  if (!lesson) return <ActivityIndicator size="large" />;
    return(
        <ImageBackground style={styles.bg} source={require("../assets/background.png")} resizeMode="cover">
            <View>
                <Text style={styles.text}>Classroom</Text>
                <LessonPlayer lesson={lesson}/>
                {/* <TouchableOpacity onPress={() => navigation.navigate("Classroom")} style={styles.button}><Text style={styles.buttonText}>Classroom</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Games")} style={styles.button}><Text style={styles.buttonText}>Games</Text>
                </TouchableOpacity> */}
                
            </View>
        </ImageBackground>
    )
}
const styles=StyleSheet.create(
    {
        text: {
    fontFamily: "baloo",
    fontSize: 30,
    textAlign: "top",
    padding: 20,
    color:'#fff'
  },
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