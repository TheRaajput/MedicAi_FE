import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FlatGrid } from "react-native-super-grid";

const CustomCard = (props) => {
  return (
    <FlatGrid
      itemDimension={130}
      style={styles.gridView}
      data={props.data}
      renderItem={(items) => (
        <TouchableOpacity onPress={items.item.to}>
          <View style={styles.itemContainer}>
              <Image source={items.item.img} style={styles.itemImage}/>
            <Text style={styles.itemName}>{items.item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    height: 150,
    elevation: 5,
    backgroundColor: "#EDBF69",
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemImage:{
      width:100,
      height:100
  }
});

export default CustomCard;
