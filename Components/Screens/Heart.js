import React, { useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";

// Routes
import Radio from "../UI/Radio";
import CustomDrop from "../UI/CustomDrop";
import {
  Gender,
  chestPainType,
  bloodSugar,
  ecgReport,
  chestExercise,
  slopePeak,
  thalSlope,
} from "../Helper/radioHelper";
import CustomText from "../UI/CustomText";
import { Button } from "react-native-paper";

// Api route
import { url } from "../../env";
const Heart = (props) => {
  const [Age, setAge] = useState("");
  const [gender, setGender] = useState("1");
  const [chestPain, setchestPain] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [cholestrol, setCholestrol] = useState("");
  const [BloodSugar, setBloodSugar] = useState("1");
  const [Ecg, setEcg] = useState("");
  const [MaxHeart, setMaxHeart] = useState("");
  const [ChestEx, setChestEx] = useState("1");
  const [stDep, setstDep] = useState("");
  const [SlopePeak, setSlopePeak] = useState("");
  const [MajorVes, setMajorves] = useState("");
  const [ThalSlope, setThalSlope] = useState("");
  const [Result, setResult] = useState({
    status: "0",
    message: { Percentages: "0", result: "0" },
  });

  const [isLoading, setisLoading] = useState(false);

  const refRBSheet = useRef();

  const handleSubmit = () => {
    const data = {
      age: Age,
      gender: gender,
      chestPain: chestPain,
      bloodPressure: bloodPressure,
      cholestrol: cholestrol,
      bsugar: BloodSugar,
      ecg: Ecg,
      heartRate: MaxHeart,
      cPain: ChestEx,
      STdepression: stDep,
      slopeST: SlopePeak,
      majorVessel: MajorVes,
      ThalScore: ThalSlope,
    };
    setisLoading(true);
    axios
      .post(`${url}/heart`, data)
      .then((response) => {
        setResult(response.data);
        setisLoading(false);
        refRBSheet.current.open();
        console.log(response.data)
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ScrollView decelerationRate={0.1}>
      <View style={styles.mainContainer}>
        <Text style={{ textAlign: "center" }}>Please insert your details</Text>
        <CustomText label={"Age"} keyboardType={"numeric"} setData={setAge} />
        <Radio data={Gender} checked={gender} setChecked={setGender} />
        <CustomDrop
          data={chestPainType}
          setSelected={setchestPain}
          selected={chestPain}
        />
        <CustomText
          label={"Blood Pressure"}
          keyboardType={"numeric"}
          setData={setBloodPressure}
        />
        <CustomText
          label={"Cholestrol"}
          keyboardType={"numeric"}
          setData={setCholestrol}
        />
        <Radio
          data={bloodSugar}
          checked={BloodSugar}
          setChecked={setBloodSugar}
        />
        <CustomDrop data={ecgReport} selected={Ecg} setSelected={setEcg} />
        <CustomText
          label={"Max Heart Rate"}
          keyboardType={"numeric"}
          setData={setMaxHeart}
        />
        <Radio data={chestExercise} setChecked={setChestEx} checked={ChestEx} />
        <CustomText
          label={"ST-Depression Curve"}
          keyboardType={"numeric"}
          setData={setstDep}
        />
        <CustomDrop
          data={slopePeak}
          setSelected={setSlopePeak}
          selected={SlopePeak}
        />
        <CustomText
          label={"Major Vessel(1,2,3)"}
          keyboardType={"numeric"}
          setData={setMajorves}
        />
        <CustomDrop
          data={thalSlope}
          setSelected={setThalSlope}
          selected={ThalSlope}
        />

        <Button mode="contained" onPress={handleSubmit} loading={isLoading}>
          Get Result
        </Button>
      </View>
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
          <Text>{Result.message.Percentages}</Text>
        </View>
      </RBSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 32,
  },
});

export default Heart;
