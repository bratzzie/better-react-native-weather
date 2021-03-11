import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ManageLocation from "../screens/ManageLocation";
import SingleScreenWeather from "../screens/SingleScreenWeather";

const Stack = createStackNavigator();

// function HomeScreen() {
//     return (
//       <Stack.Navigator >
//         <Stack.Screen name="Dogs Section">
//             {props => <ManageLocation {...props} />}
//         </Stack.Screen>

//       </Stack.Navigator>
//     );
//   }

//   function DetailScreen() {
//     return (
//       <Stack.Navigator >
//         <Stack.Screen name="Dogs Section" >
//             {props => <List {...props} />}
//         </Stack.Screen>

//       </Stack.Navigator>
//     );
//   }

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ManageLocation} />
        <Stack.Screen name="Details" component={SingleScreenWeather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
