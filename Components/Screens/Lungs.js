import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import placeholder from "../../assets/placeholder.png";
import { url } from "../../env";

const Lungs = (props) => {
  const [image, setImage] = useState(null);
  const refRBSheet = useRef();
  const [Result, setResult] = useState({
    status: "0",
    message: [],
  });
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async () => {
    setisLoading(true);
    let formdata = new FormData();
    formdata.append("image", {
      uri: image.uri,
      type: "image/png",
      name: "lungsImage",
    });

    let result = await axios.post(`${url}/lungs`, formdata, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data, header) => {
        return formdata;
      },
    });
    setResult(result.data);
    setisLoading(false)
    refRBSheet.current.open();
  };

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
    setImage(result);
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Tap on images to upload image</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={pickImage} style={{ padding: 8 }}>
          <Image
            source={image !== null ? { uri: image.uri } : placeholder}
            style={{ width: 200, height: 200 }}
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
        height={300}
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
          style={{
            flex: 1,
            padding: 16,
            marginBottom: 16,
          }}
        >
          {Object.entries(Result.message).map(([key, value]) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              key={key}
            >
              <Text>{key}</Text>
              <Text style={parseInt(value) > 30 ? styles.danger : styles.safe}>
                {value}
              </Text>
            </View>
          ))}
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
  danger: {
    color: "red",
  },
  safe: {
    color: "green",
  },
});

export default Lungs;
