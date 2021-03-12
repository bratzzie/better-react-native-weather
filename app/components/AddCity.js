import React, { useEffect } from 'react'
import { View, Text, Alert, StyleSheet,Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { WEATHER_API_KEY } from "@env";
import {WeatherContext} from '../screens/ManageLocation'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native'

import { MaterialIcons } from "@expo/vector-icons";
function AddCity(){
    const context = React.useContext(WeatherContext);
    const [name, setName] = React.useState('');



  const loadForecast = async () => {
    const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=28de34478f0127a5077b1c862ead605a&units=metric`);
    const data = await response.json();

    if(!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`); 
    } else {
        context.addCity(name, data.main.temp, data);
        setName('')
        Keyboard.dismiss();
        
    }

  }

 
      
    return (
    <Wrapper>
        
     <Container>
     <MaterialIcons
        name="search"
        size={24}
        color="#515151"
        style={{ position: "absolute", bottom: 14, zIndex: 30, left: -8, marginLeft: 15, marginRight: 15, paddingRight: 10 }}
      />
        <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            />
            <TextInput style={styles.input}
             keyboardType="default"
             returnKeyType="next"
             onSubmitEditing={()=>{
                loadForecast() // called only when multiline is false
             }} 
             onKeyPress={ (event) => {
                if(event.nativeEvent.key == "Enter"){
                    //called when multiline is true
                    loadForecast()
                } 
               
            }}

            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={"Enter location"}
            />
     </Container>
    
    </Wrapper>  
    );
         
  };

export default AddCity


const styles = StyleSheet.create({
      input: {
        paddingVertical: 10,
        width: "100%",
        paddingHorizontal: 30,
      },
    });

const Wrapper = styled.View`
padding: 20px;`
const Container = styled.View`
  position: relative;
  width: 300px;
  background-color: #d1d4de;
  border-radius: 30px;
 
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Title = styled.Text`
font-size: 35px;
font-weight: 400;
`