import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, ImageBackground, RefreshControl, SafeAreaView, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import FutureWeather from '../components/FutureWeather';
import HourlyWeather from '../components/HourlyWeather';
import MainWeather from '../components/MainWeather';
import WeatherWidget from '../components/WeatherWidget';
import Theme from '../styles/Theme';
import * as Location from "expo-location";

import clouds from "../../assets/weather/Clouds.jpg";
import rain from "../../assets/weather/Rain.jpg";
import clear from "../../assets/weather/Clear.jpg";
import drizzle from "../../assets/weather/Drizzle.jpg";
import haze from "../../assets/weather/Haze.jpg";
import mist from "../../assets/weather/mist.jpg";
import snow from "../../assets/weather/snow.jpg";
import thunder from "../../assets/weather/thunderstorm.jpg";
import { WEATHER_API_KEY } from "@env";

let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&appid=${WEATHER_API_KEY}`;
export default function LocationBasedWeatherScreen(props) {
    const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigationOptions = {
  title: 'find',
};
  const loadForecast = async () => {
    setRefreshing(true);

    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    const response = await fetch(
      `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    const data = await response.json();

    if (!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`);
    } else {
      setForecast(data);
    }

    setRefreshing(false);
    
  };

  useEffect(() => {
    if (!forecast) {
      loadForecast();
    }
    
  });

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

    const current = forecast.current.weather[0];
    const back = () => {
      if (typeof current.main != "undefined") {
        switch (current.main) {
          case "Clouds":
            return clouds;
            break;
          case "Clear":
            return clear;
            break;
          case "Rain":
            return rain;
            break;
          case "Snow":
            return snow;
            break;
          case "Thunderstorm":
            return thunder;
            break;
          case "Drizzle":
            return drizzle;
            break;
          case "Haze":
            return haze;
            break;
          case "Mist":
            return mist;
            break;
  
          default:
            return clear;
            break;
        }
      }
    };
    return (
        <Theme>
            <ImageBackground source={back()} style={styles.container}>
          <SafeAreaView style={styles.overlay}>
               <ScrollView
                refreshControl={
                  <RefreshControl
                    onRefresh={() => {  loadForecast() }}
                    refreshing={refreshing}
                  />}
                >
                <MainWeather forecast={forecast} />
                <FutureWeather forecast={forecast} />
                <HourlyWeather forecast={forecast} />
                <WeatherWidget forecast={forecast} />
               
              </ScrollView>
        
          </SafeAreaView>
          </ImageBackground>
        </Theme>
        
    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
       alignItems: "center",
      justifyContent: "flex-start",
     
    },
    loading: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay:{
      backgroundColor: "rgba(0,0,0, 0.4)",
       
    }
  });
  