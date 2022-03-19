import React from "react";
import { View } from "react-native";
import { Divider, TextInput } from "react-native-paper";

const CustomText = (props) => {
  return (
    <View>
      <TextInput
        value={props.value}
        label={props.label}
        mode="outlined"
        keyboardType={props.keyboardType}
        style={{ marginBottom: 16, marginTop: 16 }}
        onChangeText={text=>props.setData(text)}
      />
      <Divider style={{ height: 1 }} />
    </View>
  );
};

export default CustomText;
