import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React,{useState} from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";


export default function Login() {
  const [name,setName]=useState("");
  const [classGrade, setClassGrade] = useState("");

  const navigation = useNavigation();

  const [fonts]=useFonts({
    baloo:require("../assets/fonts/static/Baloo2-ExtraBold.ttf"),
});
  const handleSubmit=()=>{
    // alert(name);
    if(!name.trim()) return;
    navigation.navigate("Ai",{name,classGrade});
  };
  if (!fonts) {
  return null;
}

  return (
    <ImageBackground source={require("../assets/background.png")}
    style={styles.bg}
    resizeMode='cover'
   >
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.textfont}>Enter Name</Text>
      <TextInput 
        placeholder='Type your Name' 
        style={styles.input} 
        placeholderTextColor={"#999"} 
        value={name} 
        onChangeText={setName}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={classGrade}
          onValueChange={(value) => setClassGrade(value)}
          dropdownIconColor="#333"
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select Class" value="" />
          <Picker.Item label="Class 1" value="1" />
          <Picker.Item label="Class 2" value="2" />
          <Picker.Item label="Class 3" value="3" />
          <Picker.Item label="Class 4" value="4" />
          <Picker.Item label="Class 5" value="5" />
        </Picker>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Start Learning</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg:{
    flex:1,
    width:"100%",
    height:"100%",
  },
  textfont:{
    color: '#fff158',
    fontSize:38,
    fontWeight:'bold',
    fontFamily:'baloo',
  },
  input:{
    backgroundColor:"#edb5b1",
    width:"70%",
    padding:14,
    borderRadius:10,
    fontSize:18,
    marginTop:20,
    marginBottom:20,
    color:"#040303",
  },
  pickerContainer: {
    backgroundColor: "#edb5b1",
    width: "70%",
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    justifyContent:'center',
    height:50,
  },
  picker: {
    color: "#333",
    backgroundColor: "transparent",
    fontSize: 18,
  },
  pickerItem: {
    fontSize: 18,
  },
  button:{
    backgroundColor:"#ffbe25",
    width:"70%",
    marginBottom:20,
    padding:14,
    borderRadius:20,
    borderWidth:2,
    borderColor:"#fff",
    alignItems:"center"
  },
  buttonText:{
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'baloo',
  },
});