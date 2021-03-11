//first consumer
import React from "react";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { WeatherContext } from "../screens/ManageLocation";
import styled from "styled-components/native";
function List({ navigation }) {
  const context = React.useContext(WeatherContext);
  return (
    <View style={{ padding: 20 }}>
      <FlatList
        style={{
          width: "100%",
          height: "100%",
        }}
        vertical
        showsHorizontalScrollIndicator={false}
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
            <Card style={{ backgroundColor: `${backColor()}` }}>
              <Column>
                <Location>{city.item.name}</Location>
                <Row>
                  <MinMax>{Math.round(city.item.data.main.temp_min)}°</MinMax>
                  <MinMax>
                    {" "}
                    / {Math.round(city.item.data.main.temp_max)}°
                  </MinMax>
                </Row>
                <Button
                  title="Go to Blog Details"
                  onPress={() => {
                    navigation.navigate("Details", {
                      itemId: 86,
                      dataParam: city.item.data,
                    });
                  }}
                />
              </Column>
              <Temp>{Math.round(city.item.temperature)}°</Temp>
            </Card>
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
  margin-bottom: 8px;
  margin-top: 8px;
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
