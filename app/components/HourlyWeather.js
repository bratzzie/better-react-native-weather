import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import styled from 'styled-components/native'

const HourlyWeather = ({forecast}) => {
    return (
        <View>
           <FlatList horizontal
           showsHorizontalScrollIndicator={false}
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              const hours = dt.getHours();
              const minutes = dt.getMinutes()
              return <HourCard >
                  
                <Time>{hours}:{minutes}0</Time>
                <Temp>{Math.round(hour.item.temp)}°</Temp>
                <Image
                 style={{width: 45, height: 45}}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                  }}
                />
                <Wind>{Math.round(hour.item.wind_speed * 10) / 10} km/h</Wind>
              </HourCard>
            }}
          />
        </View>
    )
}

export default HourlyWeather
const HourCard = styled.View`
margin: 25px;
justify-content: center;
align-items: center;`

const Time = styled.Text`
color: #fff;`

const Temp = styled.Text`
font-weight: 600;
color: #fff;
font-size: 20px;`

const Wind = styled.Text`
color: #fff;`
