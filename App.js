
import {
  FlatList,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WEATHER_API_KEY } from "@env";
import Theme from "./app/styles/Theme";
import MainWeather from "./app/components/MainWeather";
import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, SafeAreaView, ScrollView, Alert, RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import HourlyWeather from "./app/components/HourlyWeather";
import FutureWeather from "./app/components/FutureWeather";

let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${WEATHER_API_KEY}`;


const App = () => {

  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);

    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

    const response = await fetch( `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
    const data = await response.json();

    if(!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`); 
    } else {
      setForecast(data);
    }

    setRefreshing(false);
  }

  useEffect(() => { 
    if (!forecast) {
      loadForecast(); 
    }
  })

  if (!forecast) {
    return <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" />
      </SafeAreaView>;
  }

  const current = forecast.current.weather[0];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            onRefresh={() => {  loadForecast() }} 
            refreshing={refreshing}
          />}
      >
    <MainWeather forecast={forecast} />


        <HourlyWeather forecast={forecast} />

       <FutureWeather forecast={forecast} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'}})

export default App;
//<Theme>
    //   <ImageBackground source={photo} style={{ height: "100%", width: "100%" }}>
    //     <View style={styles.container}>
    //       <View style={styles.container}>
    //          <KeyboardAvoidingView
    //           behavior={Platform.OS === "ios" ? "padding" : "height"}
    //         />
    //         <TextInput
    //           placeholder="Search..."
    //           value={query}
              
    //           onChange={(e) => setQuery(e.target.value)}
    //         />
    //       <TouchableOpacity
    //       onPress={() => search()}
         
    //     >
    //       <View>
    //         <Text>+</Text>
    //       </View>
    //     </TouchableOpacity>
        
            
    //       </View>
    //     </View>
    //   </ImageBackground>
    // </Theme>