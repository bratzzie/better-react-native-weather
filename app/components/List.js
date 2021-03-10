//first consumer
import React from 'react'
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {WeatherContext} from '../screens/ManageLocation'
function List() {
    const context = React.useContext(WeatherContext);
    return (
      <View style={{padding: 80}}>
      <FlatList vertical
      showsHorizontalScrollIndicator={false}
       data={context.cities}
       keyExtractor={(item, index) => index.toString()}
       renderItem={(city) => {
            return <View>
             
           <Text>{city.item.name}</Text>
           <Text>{Math.round(city.item.temperature)}°</Text>
         </View>
       }}
     />
   </View>
    );
  };

  export default List  