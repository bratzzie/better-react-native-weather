import React from "react";
import styled from "styled-components/native";

const MainWeather = ({ forecast }) => {
  const current = forecast.current.weather[0];

  return (
    <Container>
      <Wrapper>
        <Location>{/[^/]*$/.exec(`${forecast.timezone}`)[0]}</Location>
        <Row>
          <Temp>{Math.round(forecast.current.temp)}</Temp>
          <Symb>°C</Symb>
        </Row>
        <WeatherName>{current.main}</WeatherName>
      </Wrapper>
    </Container>
  );
};

export default MainWeather;
const Container = styled.View`
  flex: 0.6;

  padding-top: 80px;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
const Location = styled.Text`
  font-size: 25px;
  color: #fff;
  font-weight: 600;

  text-align: center;
`;

const WeatherName = styled.Text`
  font-size: 30px;
  color: #f0f1f2;
  text-align: center;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 20%;
  margin-bottom: auto;
  justify-content: center;
`;
const Temp = styled.Text`
  font-size: 150px;
  font-weight: 600;
  color: #fff;
  transform: translateX(10px);
  text-align: center;
`;

const Symb = styled.Text`
  font-variant: small-caps;
  color: #fff;
  font-weight: 600;
  font-size: 30px;
  transform: translate(5px, 35px);
  text-align: center;
`;
