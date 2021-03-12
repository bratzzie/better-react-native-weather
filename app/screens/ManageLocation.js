// import React from 'react'
// import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'

// import { MaterialIcons } from "@expo/vector-icons";
// import styled from 'styled-components/native'
// import { TextInput } from 'react-native-gesture-handler';
// import List from '../components/List'
// const ManageLocation = () => {
//     return (

//         <Section>
//             <Title>Manage cities</Title>

//             <Container>
//       <MaterialIcons
//         name="search"
//         size={24}
//         color="#515151"
//         style={{ position: "absolute", bottom: 14, zIndex: 30, left: -8, marginLeft: 15, marginRight: 15, paddingRight: 10 }}
//       />
//         <KeyboardAvoidingView
//               behavior={Platform.OS === "ios" ? "padding" : "height"}
//             />
//         <TextInput
//         style={styles.input}
//         placeholder={"Enter location"}
//       ></TextInput>
//     </Container>
// <List />
//             {/* <TextInput
//               placeholder="Search..." */}
//             {/* //   value={query}

//             //   onChange={(e) => setQuery(e.target.value)}
//             />
//           <TouchableOpacity */}
//         {/* //   onPress={() => search()}

//         >
//           <View> */}
//             {/* <Text>+</Text>
//           </View>
//         </TouchableOpacity>

//         </View> */}

//         </Section>
//     )
// }

// export default ManageLocation
// const Section = styled.View`
// flex: 1;
// width: 100%;
// height: 100%;
// padding-top: 50px;

// background-color: #fff;`

// const Container = styled.View`
//   position: relative;
//   width: 300px;
//   background-color: #fff;
//   border-radius: 30px;
//   margin-bottom: 22px;
//   justify-content: center;
//   align-items: center;
//   margin-top: 30px;
// `;

// const Title = styled.Text`
// font-size: 35px;
// font-weight: 400;
// `
// const styles = StyleSheet.create({
//   input: {
//     paddingVertical: 10,
//     width: "100%",
//     paddingHorizontal: 30,
//   },
// });
import React from "react";
import { View, Text, Alert } from "react-native";
import AddCity from "../components/AddCity";
import List from "../components/List";
import styled from "styled-components/native";

export const WeatherContext = React.createContext({
  cities: [], // array
  addCity: (name, temperature, data) => {}, // function
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
      const newCity = { name, temperature, data };
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
