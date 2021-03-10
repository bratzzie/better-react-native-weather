import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

import sunrise from '../../assets/weather_icons/sunrise.png'
import sunset from '../../assets/weather_icons/sunset.png'

const WeatherWidget = ({forecast}) => {
    return (
        <Wrapper>
            <Text></Text>
            <Column>
                <Title>
                    Real feel
                </Title>
                <Detail>
                {forecast.current.feels_like}°C
                </Detail>

                <Title>
                    Clouds
                </Title>
                <Detail>
                {forecast.current.clouds}%
                </Detail>
                <Title>
                    Wind speed
                </Title>
                <Detail>
                {forecast.current.wind_speed}km/h
                </Detail>
            </Column>

            <Column>
                <Title>
                    Humidity
                </Title>
                <Detail>
                {forecast.current.humidity}%
                </Detail>

                <Title>
                    Pressure
                </Title>
                <Detail>
                {forecast.current.pressure}hPa
                </Detail>

                <Title>
                    UV index
                </Title>
                <Detail>
                {forecast.current.uvi}
                </Detail>
            </Column>
        </Wrapper>
    )
}

export default WeatherWidget

const Wrapper = styled.View`
width: 100%;
border-radius: 20px;
background-color: rgba(255, 255, 255, 0.3);
align-items: flex-start;
padding: 20px;
width: 90%;
align-self: center;
flex-wrap: wrap;
flex-direction: row;
margin-bottom: 10px;`

const Column = styled.View`
width: 50%;
`

const Title = styled.Text`
color: #fff;`

const Detail = styled.Text`
color: #fff;
font-size: 20px;
font-weight: bold;
padding-bottom: 20px;`

// sunrise sunset icons by Icons8 https://icons8.com/