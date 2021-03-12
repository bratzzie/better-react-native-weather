
import React from "react";
import { Alert } from "react-native";
import AddCity from "../components/AddCity";
import List from "../components/List";
import styled from "styled-components/native";

export const WeatherContext = React.createContext({
  cities: [], // array
  addCity: (name, temperature, data) => {}, // function,
});

export default function ManageLocation({ navigation }) {
  const [cities, setCities] = React.useState([]); // array and function

  function cityExist(name) {
    return cities.some(function (el) {
      return el.name === name;
    });
  }
  const addCity = (name, temperature, data) => {
    if (cityExist(name.trim())) {
      Alert.alert("Location is already in the list! :)");
    } else {
      setCities((prevCities) => [...prevCities, { name, temperature, data }]);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        cities,
        addCity,
      }}
    >
      <Section>
        <Title>Manage cities</Title>
        <AddCity />
        <List navigation={navigation} />
      </Section>
    </WeatherContext.Provider>
  );
}
const Section = styled.View`
  padding-top: 40px;
  flex: 1;
  background-color: #fff;
`;
const Title = styled.Text`
  font-size: 35px;
  font-weight: 400;
  padding-left: 20px;
  padding-top: 40px;
`;
