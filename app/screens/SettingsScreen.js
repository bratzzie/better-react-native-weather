import { Picker } from "@react-native-community/picker";
import React, { useState } from "react";
import {Linking, Platform } from "react-native";
import styled from "styled-components/native";

const SettingsScreen = () => {
  const [unitSystem, setUnitSystem] = useState("");

  return (
    <Section style={{ paddingTop: Platform.OS === "ios" ? 60 : 80 }}>
      <SectionTitle>Settings</SectionTitle>
      <ColumnTitle>units</ColumnTitle>
      <Row>
        <Title>Units of measurement</Title>
            <PickerWrapper>
                <Picker
                    mode="dropdown"
                    style={{ width: 150 }}
                    selectedValue={unitSystem}
                    onValueChange={(itemValue, itemIndex) => setUnitSystem(itemValue)}
                >
                    <Picker.Item label="Metric" value="metric" />
                    <Picker.Item label="Imperial" value="imperial" />
                    <Picker.Item label="Standard" value="standard" />
                </Picker>
            </PickerWrapper>
        </Row>
        <Title style={{color: 'blue'}} onPress={() => Linking.openURL('https://icons8.com')}>
        Sunrise and Sunset icons by Icons8 
        </Title>
        
    </Section>
  );
};

export default SettingsScreen;
const Section = styled.View`
  flex: 1;

  padding-left: 25px;
  padding-right: 25px;
`;
const SectionTitle = styled.Text`
  font-size: 35px;
  font-weight: 100;
  margin-bottom: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ColumnTitle = styled.Text`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 17px;
`;

const PickerWrapper = styled.View``;
