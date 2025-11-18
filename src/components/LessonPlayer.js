import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";

export default function LessonPlayer({ lesson }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const slide = lesson.slides[slideIndex];
  const question = lesson.questions[questionIndex];

  useEffect(() => {
    if (slide) {
      Speech.speak(slide.text, {
        pitch: 1.2,
        rate: 0.95
      });
    }
  }, [slideIndex]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <LottieView
        source={require("../../assets/Animation/greeting.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />

      <Text style={{ fontSize: 20, textAlign: "center" }}>{slide.text}</Text>

      {slideIndex < lesson.slides.length - 1 ? (
        <TouchableOpacity onPress={() => setSlideIndex(slideIndex + 1)}>
          <Text>Next</Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* QUESTIONS */}
          <Text style={{ fontSize: 18 }}>{question.prompt}</Text>

          {question.options.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => {
                const isCorrect = opt === question.answer;

                Speech.speak(
                  isCorrect ? "Great job!" : question.hint || "Try again!"
                );

                if (isCorrect && questionIndex < lesson.questions.length - 1) {
                  setQuestionIndex(questionIndex + 1);
                }
              }}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}
