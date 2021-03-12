import React from "react";
import ManageLocation from "./app/screens/ManageLocation";
import SingleScreenWeather from "./app/screens/SingleScreenWeather";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LocationBasedWeatherScreen from "./app/screens/LocationBasedWeatherScreen";
import { AntDesign } from "@expo/vector-icons";
import SettingsScreen from "./app/screens/SettingsScreen";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LocationBasedWeatherScreen}
          options={({ navigation }) => ({
            title: "",
            headerTransparent: true,
            headerTitleStyle: { marginHorizontal: "auto" },
            headerLeft: () => (
              <AntDesign
                name="plus"
                size={24}
                color="#fff"
                style={{ paddingLeft: 30 }}
                onPress={() => navigation.navigate("Manage")}
              />
            ),
            headerRight: () => (
              <AntDesign
                name="bars"
                size={24}
                color="#fff"
                style={{ paddingRight: 30 }}
                onPress={() => navigation.navigate("Settings")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Manage"
          component={ManageLocation}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="Details"
          options={{
            title: "",
            headerTransparent: true,
          }}
          component={SingleScreenWeather}
        />
        <Stack.Screen
          name="Settings"
          options={{ title: "", headerTransparent: true }}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


