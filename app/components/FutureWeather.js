import React from "react";
import { Image} from "react-native";
import styled from "styled-components/native";

const FutureWeather = ({ forecast }) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <Container>
      {forecast.daily.slice(0, 3).map((d) => {
        const weather = d.weather[0];
        let dt = new Date(d.dt * 1000);
        return (
          <WeatherDay key={d.dt}>
            <Column>
              <Image
                style={{ height: 40, width: 40 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                }}
              />
              <Day>{days[dt.getDay()]}</Day>
              <Name> ⭒ {weather.main}</Name>
            </Column>

            <Column>
              <HighestTemp>{Math.round(d.temp.max)}°</HighestTemp>
              <LowestTemp> / {Math.round(d.temp.min)}°</LowestTemp>
            </Column>
          </WeatherDay>
        );
      })}

    
    </Container>
  );
};

export default FutureWeather;
const Container = styled.View`
  flex: 0.4;
  background-color: transparent;
  padding: 50px 20px;
  padding-bottom: 20px;
  justify-content: center;
`;

const WeatherDay = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Day = styled.Text`
  color: #fff;
  letter-spacing: 0.8px;
`;

const Name = styled.Text`
  color: #fff;
  letter-spacing: 0.8px;
`;

const HighestTemp = styled.Text`
  color: #fff;
`;

const LowestTemp = styled.Text`
  color: #fff;
`;
