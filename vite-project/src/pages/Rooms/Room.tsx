import React from "react";
import styles from "./styles.module.scss";
import axios from "axios";

interface tableDto {
  features: string;
  id: number;
  price: number;
  roomType: string;
  status: string;
  roomCount: number;
}

const Room: React.FC = () => {
  const [tableData, setTableData] = React.useState<tableDto[]>([]);
  const [buttonClicked, setButtonClicked] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setButtonClicked(false);
        if (buttonClicked) {
          const { data } = await axios.get(
            "http://localhost:8080/room/get-all"
          );
          setTableData(data);
          console.log(data);
        }
      } catch (error) {
        return console.log(error);
      }
    })();
  }, [buttonClicked]);

  return (
    <div className={styles.main}>
      <h1>Список комнат гостиницы Элеон</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Особенности</th>
            <th>Тип номера</th>
            <th>Статус</th>
            <th>Кол-во комнат</th>
            <th>Цена в день</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data: tableDto, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.features}</td>
              <td>{data.roomType === "Luxury" ? "Люкс" : "Обычный"}</td>
              <td>
                {data.status === "Free"
                  ? "Свободен"
                  : data.status === "Busy"
                  ? "Занят"
                  : "Забронирован"}
              </td>
              <td>{data.roomCount}</td>
              <td>{data.price} руб.</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setButtonClicked(true)}>Обновить</button>
    </div>
  );
};

export default Room;
