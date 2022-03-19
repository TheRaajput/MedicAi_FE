const Gender = {
  title: "Gender",
  items: [
    {
      label: "Male",
      value: "1",
    },
    {
      label: "Female",
      value: "0",
    },
  ],
};

const chestPainType = {
  title: "Chest Pain Type",
  items: [
    {
      label: "Typical Angina",
      value: "0",
    },
    {
      label: "Atypical Angina",
      value: "1",
    },
    {
      label: "Non Anginal",
      value: "2",
    },
    {
      label: "Asymptomatic",
      value: "3",
    },
  ],
};

const bloodSugar = {
  title: "Blood Sugar > 120 mg/dl",
  items: [
    {
      label: "Yes",
      value: "1",
    },
    {
      label: "No",
      value: "0",
    },
  ],
};

const ecgReport = {
  title: "ECG Report",
  items: [
    {
      label: "Normal",
      value: "0",
    },
    {
      label: "ST-Abnormality",
      value: "1",
    },
    {
      label: "LV-Hypertrophy",
      value: "2",
    },
  ],
};

const chestExercise = {
  title: "Chest Exercise Pain",
  items: [
    {
      label: "Yes",
      value: "1",
    },
    {
      label: "No",
      value: "0",
    },
  ],
};

const slopePeak = {
  title: "Slope Peak",
  items: [
    {
      label: "Up Sloping",
      value: "0",
    },
    {
      label: "Flat",
      value: "1",
    },
    {
      label: "Down Sloping",
      value: "2",
    },
  ],
};

const thalSlope = {
  title: "Thal Slope",
  items: [
    {
      label: "Nan",
      value: "0",
    },
    {
      label: "Normal",
      value: "1",
    },
    {
      label: "Fixed Defect",
      value: "2",
    },
    {
      label: "Normal Defect",
      value: "3",
    }
  ],
};

module.exports = {
  Gender,
  chestPainType,
  bloodSugar,
  ecgReport,
  chestExercise,
  slopePeak,
  thalSlope
};
