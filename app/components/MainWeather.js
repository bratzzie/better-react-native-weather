import React from 'react'
import { ImageBackground, View } from 'react-native'
import styled from 'styled-components/native'
import { Image } from "react-native";

import { LinearGradient } from 'expo-linear-gradient'

const MainWeather = (props) => {


    const current = props.forecast.current.weather[0];

    return (
  

 
        <Container>
          
      <Wrapper>
                <Location>Zaporizhzhia</Location>
                 <Row>
                    <Temp>{Math.round(props.forecast.current.temp)}</Temp>
                    <Symb>°</Symb> 
                   
                </Row>
                 <WeatherName>{props.forecast.current.weather.description}</WeatherName>
               </Wrapper>

        </Container>
    
    )
}

export default MainWeather
const Container = styled.View`
flex: 0.6;

padding-top: 80px;

`

const Wrapper = styled.View`
`
const Location = styled.Text`
font-size: 25px;
color: #fff;
font-weight: 600;

text-align: center;
`

const WeatherName = styled.Text`
font-size: 25px;
color: #f0f1f2;


text-align: center;
`

const Row = styled.View`
flex-direction: row;
margin-top: 45%;
justify-content: center;
`
const Temp = styled.Text`
font-size: 150px;
font-weight: 600;
color: #fff;

text-align: center;
`

const Symb = styled.Text`
font-variant: small-caps;
color: #fff;
font-weight: 500;
font-size: 120px;
transform: translate(-10px, 0px);

text-align: center;
`

