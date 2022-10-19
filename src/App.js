import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import "./App.css";
import Bmilist from "./components/Bmilist";
import Bmiscore from "./components/Bmiscore";
import Form from "./components/Form";

function App() {
  const [show, setshow] = useState(false);
  const [changeWeight, setchangeWeight] = useState({ weight: "", type: "" });
  const [bmi, setBmi] = useState("00");
  const [bmiType, setBmiType] = useState("Not Calculated");
  const [bmiRange, setBmiRange] = useState({
    underWeight: { low: "" },
    normal: { low: "", high: "" },
    overWeight: { low: "", high: "" },
    obesityOne: { low: "", high: "" },
    obesityTwo: { low: "", high: "" },
    obesityThree: { high: "" },
  });

  const onFormSub = (h, w) => {
    console.log(h, w);
    let b = calBmi(h, w);
    setBmi(b);
    let bType = weightType(b);
    setBmiType(bType);

    const range = {
      underWeight: { low: calWeight(18.5, h) },
      normal: { low: calWeight(18.5, h), high: calWeight(24.9, h) },
      overWeight: { low: calWeight(24.9, h), high: calWeight(29.9, h) },
      obesityOne: { low: calWeight(30, h), high: calWeight(34.9, h) },
      obesityTwo: { low: calWeight(35, h), high: calWeight(39.9, h) },
      obesityThree: { high: calWeight(40, h) },
    };
    setBmiRange(range);
    setchangeWeight(weightChange(w, b, range));
    setshow(true);
  };

  const calBmi = (h, w) => (w / (h * h)).toFixed(2);

  const calWeight = (b, h) => (b * h * h).toFixed(2);

  const weightType = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (18.5 < bmi && bmi < 24.9) {
      return "Normal";
    } else if (24.9 < bmi && bmi < 29.9) {
      return "Over Weight";
    } else if (29.9 < bmi && bmi < 34.9) {
      return "Obesity Class I";
    } else if (34.9 < bmi && bmi < 39.9) {
      return "Obesity Class II";
    } else if (bmi > 40) {
      return "Obesity Class III";
    }
  };

  const weightChange = (w, b, range) => {
    let changeObj;
    if (b > 24.9) {
      changeObj = {
        weight: (w - range.normal.high).toFixed(2),
        type: "positive",
      };
      return changeObj;
    } else if (b < 18.5) {
      changeObj = {
        weight: range.normal.low.toFixed(2),
        type: "negative",
      };
      return changeObj;
    } else {
      changeObj = {
        weight: 0,
        type: "normal",
      };
      return changeObj;
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5 mx-2">
        <Form getData={onFormSub} />
      </div>


      {show && (<div className="row justify-content-center mt-5 mx-2">
        <div className=" col-12 col-sm-6">
          <Bmiscore bmiNo={bmi} bmiName={bmiType} changeWeight={changeWeight} />
        </div>
        <div className=" col-12 col-sm-6 ">
          <Bmilist range={bmiRange} bmi={bmi} />
        </div>
      </div>)}
    </div>
  );
}

export default App;
