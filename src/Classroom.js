import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import * as Speech from "expo-speech";
import { useFonts } from "expo-font";

export default function Classroom({ navigation, route }) {
  const { name, classGrade } = route.params;

  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [fonts] = useFonts({
    baloo: require("../assets/fonts/static/Baloo2-ExtraBold.ttf"),
  });

  const askTeacher = async () => {
    if (!question.trim()) return;

    setLoading(true);

    const res = await fetch("http://172.20.10.9:4000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        classGrade,
      }),
    });

    const data = await res.json();
    setAiAnswer(data.answer);

    // Speak the answer
    Speech.speak(data.answer, {
      voice: "com.apple.voice.compact.en-US.Samantha",
      rate: 0.95,
      pitch: 1.1,
    });

    setLoading(false);
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Class {classGrade} Classroom</Text>
        <Text style={styles.subtitle}>
          Hello {name}! Ask your EBUDDY teacher anything!
        </Text>

        {/* Question Input */}
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          placeholderTextColor="#555"
          value={question}
          onChangeText={setQuestion}
        />

        {/* Ask Button */}
        <TouchableOpacity
          onPress={askTeacher}
          style={styles.askButton}
        >
          <Text style={styles.askText}>Ask</Text>
        </TouchableOpacity>

        {/* Loader */}
        {loading && <ActivityIndicator size="large" color="#fff" />}

        {/* AI Answer */}
        {aiAnswer !== "" && (
          <View style={styles.answerBox}>
            <Text style={styles.answerTitle}>Teacher says:</Text>
            <Text style={styles.answerText}>{aiAnswer}</Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  container: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 100,
  },
  title: {
    fontSize: 36,
    fontFamily: "baloo",
    color: "#fff",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "baloo",
    color: "#fff",
    marginBottom: 30,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 15,
    borderRadius: 15,
    fontSize: 18,
    marginBottom: 15,
  },
  askButton: {
    backgroundColor: "#ffbe25",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 20,
  },
  askText: {
    fontSize: 22,
    fontFamily: "baloo",
    color: "#fff",
  },
  answerBox: {
    backgroundColor: "#ffffffcc",
    padding: 20,
    borderRadius: 15,
    width: "85%",
    marginTop: 20,
  },
  answerTitle: {
    fontSize: 22,
    fontFamily: "baloo",
    marginBottom: 10,
  },
  answerText: {
    fontSize: 20,
    fontFamily: "baloo",
    color: "#333",
  },
});
