import React, { useState } from "react";
import { View } from "react-native";
import { RadioButton, Text, Divider } from "react-native-paper";

const Radio = (props) => {
  return (
    <View style={{marginBottom:16}}>
      <Text style={{ textAlign: "center" }}>{props.data.title}</Text>
      <RadioButton.Group
        onValueChange={(checkedValue) => props.setChecked(checkedValue)}
        value={props.checked}
      >
        {props.data.items.map((items) => (
          <RadioButton.Item key={items.label} label={items.label} value={items.value} />
        ))}
      </RadioButton.Group>
      <Divider style={{height:1}}/>
    </View>
  );
};

export default Radio;
