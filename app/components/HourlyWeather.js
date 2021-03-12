import React from "react";
import { View, FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const HourlyWeather = ({ forecast }) => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={forecast.hourly.slice(0, 24)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(hour) => {
          const weather = hour.item.weather[0];
          let dt = new Date(hour.item.dt * 1000);
          const hours = dt.getHours();
          const minutes = dt.getMinutes();
          const arrow = () => {
            if (0 < hour.item.wind_deg && hour.item.wind_deg <= 90) {
              return "caretup";
            } else if (90 < hour.item.wind_deg && hour.item.wind_deg <= 180) {
              return "caretright";
            } else if (180 < hour.item.wind_deg && hour.item.wind_deg <= 270) {
              return "caretdown";
            } else if (180 < hour.item.wind_deg && hour.item.wind_deg <= 400) {
              return "caretright";
            }
          };
          return (
            <HourCard>
              <Time>
                {hours}:{minutes}0
              </Time>
              <Temp>{Math.round(hour.item.temp)}°</Temp>
              <Image
                style={{ width: 45, height: 45 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                }}
              />

              <Row>
                <AntDesign name={arrow()} size={10} color="#fff" />
                <Wind> {Math.round(hour.item.wind_speed * 10) / 10} m/s</Wind>
              </Row>
            </HourCard>
          );
        }}
      />
    </View>
  );
};

export default HourlyWeather;
const HourCard = styled.View`
  margin: 25px;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Time = styled.Text`
  color: #fff;
`;

const Temp = styled.Text`
  font-weight: 600;
  color: #fff;
  font-size: 20px;
`;

const Wind = styled.Text`
  color: #fff;
`;
