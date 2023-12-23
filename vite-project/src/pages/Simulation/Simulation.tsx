import React from "react";
import styles from "./styles.module.scss";
import axios from "axios";

const Simulation: React.FC = () => {
  const [step, setStep] = React.useState("1");
  const [day, setDay] = React.useState("12");

  const submit = async () => {
    try {
      await axios.get(`http://localhost:8080/simulation/start/${step}/${day}`);
      // await axios.get(`http://localhost:8080/simulation/start`);
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>
        Шаг:{" "}
        <select value={step} onChange={(ev) => setStep(ev.target.value)}>
          {[
            Array.from({ length: 5 }, (_, index) => 1 + index).map(
              (value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              )
            ),
          ]}
        </select>
        часов
      </h1>
      <h1>
        Период:{" "}
        <select value={day} onChange={(ev) => setDay(ev.target.value)}>
          {[
            Array.from({ length: 19 }, (_, index) => 12 + index).map(
              (value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              )
            ),
          ]}
        </select>
        дней
      </h1>
      <button onClick={submit}>Начать симуляцию</button>
    </div>
  );
};

export default Simulation;
