import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Speech from "expo-speech";
import LottieView from "lottie-react-native";

export default function Ai({ route, navigation }) {
  const { name } = route.params;
  const {classGrade}=route.params;
  const [isSpeakingDone, setIsSpeakingDone] = useState(false);

  const [fonts] = useFonts({
    baloo: require("../assets/fonts/static/Baloo2-ExtraBold.ttf"),
  });

  const message = `Hello ${name}! Welcome to EBUDDY lets start learning, press continue to begin`;
//   useEffect(() => {
//   Speech.getAvailableVoicesAsync().then(console.log);
// }, []);

  useEffect(() => {
    // Start speech
    Speech.speak(message, {
      language: "en",
       voice: "com.apple.voice.compact.en-US.Samantha",
      pitch: 1.2,
      rate: 0.95,
      onDone: () => setIsSpeakingDone(true), // Speech finished
      onStopped: () => setIsSpeakingDone(true),
    });

    return () => {
      Speech.stop(); // Cleanup when leaving screen
    };
  }, []);

  if (!fonts) return null;

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StatusBar style="light" />

        <LottieView
  source={require("../assets/Animation/greeting.json")}
  autoPlay
  loop
  style={{ width: 300, height: 300, marginBottom: 20 }}
/>

        <View style={{ height: 100, justifyContent: "center" }}>
  {isSpeakingDone && (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Classroom",{name,classGrade})}
    >
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  )}
</View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "baloo",
    fontSize: 25,
    textAlign: "center",
    padding: 20,
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
});
