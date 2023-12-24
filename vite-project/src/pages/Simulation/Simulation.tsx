import React from "react";
import styles from "./styles.module.scss";
import axios from "axios";

interface otchetDto {
  requestsNotSubmitted: number;
  requestsSubmitted: number;
  allRooms: number;
  amountPrice: number;
  luxury_count: number;
  ordinary_count: number;
  lux_occupancy_percentage: number;
  ordinary_occupancy_percentage: number;
  one_room: number;
  three_room: number;
  two_room: number;
}

const Simulation: React.FC = () => {
  const [step, setStep] = React.useState("1");
  const [day, setDay] = React.useState("12");
  const [otchet, setOtchet] = React.useState<otchetDto>();

  const [clickWork, setClickWork] = React.useState(false);
  const [clickOtchet, setClickOtchet] = React.useState(false);
  const [clickSimulation, setClickSimulation] = React.useState(false);

  const submit = async () => {
    try {
      setClickSimulation((prev) => !prev);
      await axios.get(`http://localhost:8080/simulation/start/${step}/${day}`);
    } catch (error) {
      return console.log(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        if (clickOtchet) {
          const { data } = await axios.get(
            `http://localhost:8080/motel/otchet`
          );

          setOtchet(data);
          setClickOtchet(false);
        }

        if (clickWork) {
          await axios.get(`http://localhost:8080/motel/start`);

          setClickWork(false);
        }
      } catch (error) {
        return console.log(error);
      }
    })();
  }, [clickOtchet, clickWork]);

  console.log(clickOtchet, clickWork);

  return (
    <div className={styles.main}>
      <header>
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
      </header>
      <div className={styles.body}>
        <div className={styles.buttons}>
          <button
            disabled={!clickSimulation}
            onClick={() => setClickWork((prev) => !prev)}
          >
            Начать работу отеля
          </button>
          <button onClick={() => setClickOtchet((prev) => !prev)}>
            Получение отчета
          </button>
        </div>
        <div className={styles.container}>
          <h1>Отчет</h1>
          {otchet !== null && (
            <ul>
              <li>Заявок не принято: {otchet?.requestsNotSubmitted}</li>
              <li>Заявок принято: {otchet?.requestsSubmitted}</li>
              <li>Общее кол-во номеров: {otchet?.allRooms}</li>
              <li>Кол-во люксовых номеров: {otchet?.luxury_count}</li>
              <li>Кол-во обычных номеров: {otchet?.ordinary_count}</li>
              <li>
                Процент загруженности люксовых номеров:{" "}
                {otchet?.lux_occupancy_percentage.toFixed(2)}%
              </li>
              <li>
                Процент загруженности обычных номеров:{" "}
                {otchet?.ordinary_occupancy_percentage.toFixed(2)}%
              </li>
              <li>Кол-во однокомнатных номеров: {otchet?.one_room}</li>
              <li>Кол-во двухкомнатных номеров: {otchet?.two_room}</li>
              <li>Кол-во трёхкомнатных номеров: {otchet?.three_room}</li>
              <li>Общая выручка гостиницы Элеон: {otchet?.amountPrice} руб.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulation;
