import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import placeholder from "../../assets/placeholder.png";
import { url } from "../../env";

const Eye = (props) => {
  const [image, setImage] = useState([]);
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
    setImage([...image, result]);
  };
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("image", [
      { uri: image[0].uri, type: "image/jpeg", name: "left_eye" },
      { uri: image[1].uri, type: "image/jpeg", name: "right_eye" },
    ]);
    setisLoading(true);
    axios
      .post(`${url}/eye`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return formData;
        },
      })
      .then((res) => {
        console.log(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        alert(err);
        return;
      });
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Tap on images to upload image</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={pickImage} style={{ padding: 8 }}>
          <Image
            source={image.length >= 1 ? { uri: image[0].uri } : placeholder}
            style={{ width: 170, height: 170 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={{ padding: 8 }}>
          <Image
            source={image.length === 2 ? { uri: image[1].uri } : placeholder}
            style={{ width: 170, height: 170 }}
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
    padding: 8,
  },
  innerContainer: {
    flexDirection: "row",
  },
  headingText: {
    fontWeight: "700",
    fontSize: 24,
  },
});

export default Eye;
