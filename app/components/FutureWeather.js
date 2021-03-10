import React from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import styled from 'styled-components/native'
import photo from '../../assets/weather_icons/cloud.png'
const FutureWeather = ({forecast}) => {
    return (
        <Container>
             <Text >Next 3 Days</Text>
        {forecast.daily.slice(0,3).map(d => { 
          const weather = d.weather[0];
          var dt = new Date(d.dt * 1000);
          return <WeatherDay key={d.dt}>
              <Column>
                    <Image
                    
                    source={{
                        uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                    }}
                    />
                    <Day>{dt.toLocaleDateString()}</Day>
                    <Name> ⭒ {weather.description}</Name>
              </Column>

              <Column>  
                    <HighestTemp>{Math.round(d.temp.max)}°C</HighestTemp>
                    <LowestTemp> / {Math.round(d.temp.min)}°C</LowestTemp>
              </Column>
           </WeatherDay>
        })}

          
        </Container>
    )
}

export default FutureWeather
const Container = styled.View`
flex: 0.4;
background-color: transparent;
padding: 50px;
justify-content: center;
`

const WeatherDay = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 8px;
margin-bottom: 8px;`

const Column = styled.View`
flex-direction: row;
align-items: center;`

const Day = styled.Text`
color: #fff; 
letter-spacing: 0.8px;`


const Name = styled.Text`
color: #fff;
letter-spacing: 0.8px;`

const HighestTemp = styled.Text`
color: #fff;`

const LowestTemp = styled.Text`
color: #fff;`
