import React from "react";
import { View } from "react-native";
import { Text, Divider } from "react-native-paper";
import DropDown from "react-native-dropdown-picker";

const CustomDrop = (props) => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  return (
    <View>
      <Text style={{ marginBottom: 8 }}>{props.data.title}</Text>
      <DropDown
        setValue={props.setSelected}
        value={props.selected}
        items={props.data.items}
        open={showDropDown}
        setOpen={setShowDropDown}
        listMode="MODAL"
        dropDownDirection="AUTO"
        style={{marginBottom:16}}
      />
      <Divider style={{ height: 1 }} />
    </View>
  );
};

export default CustomDrop;
