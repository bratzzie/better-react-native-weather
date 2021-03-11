import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import SingleFuture from "../components/SingleFuture";
import SingleHour from "../components/SingleHour";
import SingleWidget from "../components/SingleWidget";
import { WEATHER_API_KEY } from "@env";
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&appid=${WEATHER_API_KEY}`;
const SingleScreenWeather = ({ route, navigation }) => {
  const { itemId } = route.params;
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

  return (
    <Container>
      <Wrapper>
        <Location>{dataParam.name}</Location>
        <Row>
          <Temp>{JSON.stringify(itemId)}</Temp>
          <Symb>°C</Symb>
        </Row>
        <WeatherName>{JSON.stringify(dataParam.weather[0].main)}</WeatherName>
      </Wrapper>
      <SingleFuture anotherForecast={forecast} />
      <SingleHour anotherForecast={forecast} />
      <SingleWidget forecast={dataParam} />
    </Container>
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
