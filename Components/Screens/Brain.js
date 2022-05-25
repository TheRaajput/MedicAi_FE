import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import placeholder from "../../assets/placeholder.png";
import { url } from "../../env";

const Brain = (props) => {
  const [image, setImage] = useState(null);
  const refRBSheet = useRef();
  const [Result, setResult] = useState({
    status: "0",
    message: { Percentages: "0", result: "0" },
  });
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = () => {
    setisLoading(true);
    let formdata = new FormData();
    formdata.append("image", {
      uri: image.uri,
      type: "image/jpeg",
      name: "brainimage",
    });
    axios
      .post(`${url}/brain`, formdata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return formdata;
        },
      })
      .then((response) => {
        setisLoading(false);
        setResult(response.data);
        refRBSheet.current.open();
      })
      .catch((err) => {
        alert(err);
      });
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
        loading={isLoading}
        style={{ marginTop: 16 }}
        onPress={handleSubmit}
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

export default Brain;
