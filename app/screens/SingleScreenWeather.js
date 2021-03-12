import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
} from "react-native";
import styled from "styled-components/native";
import SingleFuture from "../components/SingleFuture";
import SingleHour from "../components/SingleHour";
import SingleWidget from "../components/SingleWidget";
import { WEATHER_API_KEY } from "@env";
import Theme from "../styles/Theme";
import { ScrollView } from "react-native-gesture-handler";

import clouds from "../../assets/weather/Clouds.jpg";
import rain from "../../assets/weather/Rain.jpg";
import clear from "../../assets/weather/Clear.jpg";
import drizzle from "../../assets/weather/Drizzle.jpg";
import haze from "../../assets/weather/Haze.jpg";
import mist from "../../assets/weather/mist.jpg";
import snow from "../../assets/weather/snow.jpg";
import thunder from "../../assets/weather/thunderstorm.jpg";
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&appid=${WEATHER_API_KEY}`;
const SingleScreenWeather = ({ route, navigation }) => {
  const { dataParam } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [forecast, setForecast] = useState(null);

  const loadForecast = async () => {
    setRefreshing(true);

    const response = await fetch(
      `${url}&lat=${dataParam.coord.lat}&lon=${dataParam.coord.lon}`
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
      <SafeAreaView>
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
      <ImageBackground
        source={back()}
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      >
        <SafeAreaView style={{ backgroundColor: "rgba(0,0,0, 0.4)" }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  loadForecast();
                }}
                refreshing={refreshing}
              />
            }
          >
            <Container>
              <Wrapper>
                <Location>{dataParam.name}</Location>
                <Row>
                  <Temp>{Math.round(JSON.stringify(dataParam.main.temp))}</Temp>
                  <Symb>°C</Symb>
                </Row>
                <WeatherName>{dataParam.weather[0].main}</WeatherName>
              </Wrapper>
              <SingleFuture anotherForecast={forecast} />
              <SingleHour anotherForecast={forecast} />
              <SingleWidget forecast={dataParam} />
            </Container>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </Theme>
  );
};

export default SingleScreenWeather;

const Container = styled.View`
  flex: 1;

  padding-top: 80px;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
const Location = styled.Text`
  font-size: 25px;
  color: #fff;
  font-weight: 600;

  text-align: center;
`;

const WeatherName = styled.Text`
  font-size: 30px;
  color: #f0f1f2;
  text-align: center;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 20%;
  margin-bottom: auto;
  justify-content: center;
`;
const Temp = styled.Text`
  font-size: 150px;
  font-weight: 600;
  color: #fff;
  transform: translateX(10px);
  text-align: center;
`;

const Symb = styled.Text`
  font-variant: small-caps;
  color: #fff;
  font-weight: 600;
  font-size: 30px;
  transform: translate(0px, 35px);
  text-align: center;
`;
