import React from "react";
import {Text, Image } from "react-native";
import styled from "styled-components/native";

import sunrise from "../../assets/weather_icons/sunrise.png";
import sunset from "../../assets/weather_icons/sunset.png";

const WeatherWidget = ({ forecast }) => {
  return (
    <Wrapper>
      <Text></Text>
      <Column>
        <Image source={sunrise} style={{ width: 50, height: 50 }} />
        <Sun>
          {new Date(forecast.current.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Sun>
        <Title>Real feel</Title>
        <Detail>{Math.round(forecast.current.feels_like)}°C</Detail>

        <Title>Clouds</Title>
        <Detail>{forecast.current.clouds}%</Detail>
        <Title>Wind speed</Title>
        <Detail>{forecast.current.wind_speed}m/s</Detail>
      </Column>

      <Column>
        <Image source={sunset} style={{ width: 50, height: 50 }} />
        <Sun>
          {new Date(forecast.current.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Sun>
        <Title>Humidity</Title>
        <Detail>{forecast.current.humidity}%</Detail>

        <Title>Pressure</Title>
        <Detail>{forecast.current.pressure}hPa</Detail>

        <Title>UV index</Title>
        <Detail>{forecast.current.uvi}</Detail>
      </Column>
    </Wrapper>
  );
};

export default WeatherWidget;

const Wrapper = styled.View`
  width: 100%;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;

  padding: 20px;
  width: 90%;
  align-self: center;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const Column = styled.View`
  width: 50%;
`;

const Title = styled.Text`
  color: #fff;
`;

const Detail = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
`;

const Sun = styled.Text`
  color: #fff;
  font-size: 15px;

  padding-bottom: 20px;
`;
// sunrise sunset icons by Icons8 https://icons8.com/
