
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
import clouds from './assets/weather/Clouds.jpg'
import rain from "./assets/weather/Rain.jpg"
import clear from './assets/weather/Clear.jpg'
import drizzle from "./assets/weather/Drizzle.jpg"
import haze from './assets/weather/Haze.jpg'
import mist from "./assets/weather/mist.jpg"
import snow from './assets/weather/snow.jpg'
import thunder from "./assets/weather/thunderstorm.jpg"
import WeatherWidget from "./app/components/WeatherWidget";
import ManageLocation from "./app/screens/ManageLocation";
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
  const back = () => {
    if(typeof current.main != "undefined"){
      switch (current.main) {
        case "Clouds":
          return clouds
          break;
        case "Clear":
          return clear
          break;
        case "Rain":
          return rain
          break;
        case "Snow":
          return snow
          break;
        case "Thunderstorm":
          return thunder
          break;
        case "Drizzle":
          return drizzle
          break;
        case "Haze":
          return haze
          break;
        case "Mist":
          return mist
          break;
      
        default:
          return clear
          break;
      }
    }
  }
  return (
    <Theme>
       <ImageBackground source={back()} style={{ height: "100%", width: "100%" }}>
     <SafeAreaView style={styles.container}> 
          <ScrollView 
            refreshControl={
              <RefreshControl 
                onRefresh={() => {  loadForecast() }} 
                refreshing={refreshing}
              />}
            >
        {/* <MainWeather forecast={forecast} />
            
            <FutureWeather forecast={forecast} />
            <HourlyWeather forecast={forecast} />
            <WeatherWidget forecast={forecast} /> */}
            <ManageLocation />
          </ScrollView>
      
      </SafeAreaView>  
      </ImageBackground>
    </Theme>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)',
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
    //  
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