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
import React from 'react'
import { View, Text } from 'react-native'
import AddCity from '../components/AddCity';
import List from '../components/List'
export const WeatherContext = React.createContext({
    cities: [],
    addCity: (name, temperature) => { },
  });


 

export default function ManageLocation() {
   const [cities, setCities] = React.useState([]);
  const addCity = (name, temperature) => {
    const newCity = { name, temperature };
    setCities(prevCities => [...prevCities, { name, temperature }]);
  };
    return (
        <WeatherContext.Provider value={{
            cities,
            addCity,
          }}>
            <View>
              <AddCity />
              <List />
              
            </View>
              
        
          </WeatherContext.Provider>
    )
}
