import React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import CustomCard from "./UI/CustomCard";
const Home = (props) => {
  const data = [
    {
      id: 1,
      name: "Heart",
      img: require("../assets/heart.png"),
      to: ()=>props.navigation.navigate("Heart")
    },
    {
      id: 2,
      name: "Eye",
      img: require("../assets/eye-ball.png"),
      to: ()=>props.navigation.navigate("Eye")
    },
    {
      id: 3,
      name: "Brain",
      img: require("../assets/brainstorm.png"),
      to: ()=>props.navigation.navigate("Brain")
    },
    {
      id: 4,
      name: "Lungs",
      img: require("../assets/lungs.png"),
      to: ()=>props.navigation.navigate("Lungs")
    },
  ];

  return (
    <SafeAreaView style={styles.upperContainer}>
      <View style={styles.innerContainer}>
        <LottieView
          source={require("../assets/53911-online-medical-assistance-animation.json")}
          autoPlay
          loop
        />
      </View>
      <View style={styles.lowerContainer}>
        <CustomCard data={data} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    flexDirection: "column",
  },
  innerContainer: {
    flex: 1,
    width: "100%",
  },
  lowerContainer: {
    flex: 1,
    width: "100%",
  },
});

export default Home;
