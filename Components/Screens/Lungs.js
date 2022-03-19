import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import placeholder from "../../assets/placeholder.png";

const Lungs = (props) => {
  const [image, setImage] = useState(null);
  const refRBSheet = useRef();
  const [Result, setResult] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      alert("Permission Denied");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    setImage(result.uri);
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Tap on images to upload image</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={pickImage} style={{ padding: 8 }}>
          <Image
            source={image.length >= 1 ? { uri: image[0] } : placeholder}
            style={{ width: 150, height: 150 }}
          />
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isLoading}
        style={{ marginTop: 16 }}
      >
        Get Result
      </Button>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{Result.message}</Text>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  innerContainer: {
    flexDirection: "row",
  },
  headingText: {
    fontWeight: "700",
    fontSize: 24,
  },
});

export default Lungs;
