//first consumer
import React from "react";
import { Button, Text, View } from "react-native";
import { FlatList, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { WeatherContext } from "../screens/ManageLocation";
import styled from "styled-components/native";
function List({ navigation }) {
  const context = React.useContext(WeatherContext);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
      style={{paddingHorizontal: 20, paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
        vertical
         data={context.cities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(city) => {
          const backColor = () => {
            switch (city.item.data.weather[0].main) {
              case "Clouds":
                return "#4275B7";
                break;
              case "Clear":
                return "#00BAFF";
                break;
              case "Rain":
                return "#0099BF";
                break;
              case "Snow":
                return "#E6F4F1";
                break;
              case "Thunderstorm":
                return "#8F67B3";
                break;
              case "Drizzle":
                return "#3B93CB";
                break;
              case "Haze":
                return "#3A4856";
                break;
              case "Mist":
                return "#9EADBD";
                break;
              default:
                return "#00D1CE";
                break;
            }
          };
          return (
            <TouchableHighlight style={{borderRadius: 20,   marginBottom: 8,
              marginTop: 8}}onPress={() => {
                    navigation.navigate("Details", {
                     dataParam: city.item.data,
                    });
                  }}>
            <Card  
                  style={{ backgroundColor: `${backColor()}` }}>
              <Column>
                <Location>{city.item.name}</Location>
                <Row>
                  <MinMax>{Math.round(city.item.data.main.temp_min)}°</MinMax>
                  <MinMax>
                    {" "}
                    / {Math.round(city.item.data.main.temp_max)}°
                  </MinMax>
                </Row>
                
              </Column>
              <Temp>{Math.round(city.item.temperature)}°</Temp>
            </Card>

            </TouchableHighlight>
          );
        }}
      />
    </View>
  );
}

export default List;
const Card = styled.View`
  width: 100%;
  height: 95px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
`;
const Row = styled.View`
  flex-direction: row;
`;
const Column = styled.View``;
const Location = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  text-transform: capitalize;
`;

const Temp = styled.Text`
  color: #fff;
  font-size: 40px;
  font-weight: 600;
`;

const MinMax = styled.Text`
  color: #fff;
  font-size: 13px;
`;
