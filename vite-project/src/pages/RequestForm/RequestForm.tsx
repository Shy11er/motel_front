import React from "react";
import styles from "./styles.module.scss";
import axios from "axios";

interface FormData {
  fieldName: string;
}

interface DynamicFormProps {
  form: string;
}

const date = new Date();
date.toLocaleString("ru-RU", {
  hour12: false,
});

enum roomTypeEnum {
  Luxury,
  Ordinary,
}

enum requestTypeEnum {
  Booking,
  CheckIn,
}

const features = [
  "Не учитывать",
  "Вид на море",
  "Удобные креслы",
  "Просторный шкаф",
  "Есть приставка",
  "Есть мини-бар",
];

interface tableDto {
  feature: string;
  id: number;
  // price: string;
  roomType: string;
  status: string;
  payImmediatle: Boolean;
  roomNumber: number;
  roomCount: number;
  requestType: string;
  amountPrice: number;
}

const RequestForm: React.FC<DynamicFormProps> = ({ form }) => {
  const [guestId, setGuestId] = React.useState<number | undefined>();
  const [roomCount, setRoomCount] = React.useState<number | undefined>();
  const [roomNumber, setRoomNumber] = React.useState<number | undefined>();
  const [daysToLive, setDaysToLive] = React.useState<number | undefined>();
  const [arrival, setArrival] = React.useState<Date>(date);
  const [roomType, setRoomType] = React.useState("Люкс");
  const [requestType, setRequestType] = React.useState("CheckIn");
  const [feature, setFeature] = React.useState(features[0]);
  const [tableData, setTableData] = React.useState<tableDto[]>([]);
  const [pay, setPay] = React.useState(false);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    fieldName: "",
  });

  React.useEffect(() => {
    (async () => {
      try {
        setButtonClicked(false);
        if (buttonClicked) {
          const { data } = await axios.get(
            "http://localhost:8080/request/get-all"
          );
          setTableData(data);
          console.log(data);
        }
      } catch (error) {
        return console.log(error);
      }
    })();
  }, [buttonClicked]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = {
        guest_id: guestId,
        payImmediatle: pay,
        roomCount,
        daysToLive,
        roomNumber: requestType === "CheckIn" ? 0 : roomNumber,
        feature: feature === "Не учитывать" ? null : feature,
        roomType:
          roomType === "Люкс" ? roomTypeEnum.Luxury : roomTypeEnum.Ordinary,
        arrival,
        requestType:
          requestType == "CheckIn"
            ? requestTypeEnum.CheckIn
            : requestTypeEnum.Booking,
      };

      let request;
      switch (form) {
        case "create":
          request = "POST";
          await axios.post(`http://localhost:8080/request/${form}`, data);
          break;
        case "delete":
          request = "DELETE";
          form += `${guestId}`;
          await axios.delete(`http://localhost:8080/request/${form}`);
          break;
        case "update":
          request = "PUT";
          form += `${guestId}`;
          await axios.patch(`http://localhost:8080/request/${form}`);
          break;
        // case "get-all":
        //   request = "GET";
        //   const requestsData = await axios.post(
        //     `http://localhost:8080/request/${form}`
        //   );
        //   setTableData(requestsData.data);
        //   break;
      }

      // await fetch(`http://localhost:8080/request/${form}`, {
      //   method: requestType,
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      // })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));

      console.log("Form submitted:", data);
    } catch (error) {
      return console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);

    if (!isNaN(inputValue)) {
      setGuestId(inputValue);
    }
  };

  return (
    <div className={styles.main}>
      {form === "get-all" ? (
        <>
          <h1>Список заявок</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Особенности</th>
                {/* <th>Цена</th> */}
                <th>Тип комнаты</th>
                <th>Тип заявки</th>
                <th>Оплачен</th>
                <th>Кол-во номеров</th>
                <th>Чек</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data: tableDto, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.feature}</td>
                  {/* <td>{data.price}</td> */}
                  <td>{data.roomType === "Luxury" ? "Люкс" : "Обычный"}</td>
                  <td>
                    {data.requestType == "Booking"
                      ? "Бронирование"
                      : "Заселение"}
                  </td>
                  <td>{data.payImmediatle === false ? "Нет" : "Да"}</td>
                  <td>{data.roomNumber === 0 ? 1 : roomNumber}</td>
                  <td>{data.amountPrice} руб.</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setButtonClicked(true)}>Обновить</button>
        </>
      ) : (
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <div className={styles.navbar}>
            <span
              className={styles.requestType}
              style={requestType === "Booking" ? { background: "#01b075" } : {}}
              onClick={() => setRequestType("Booking")}
            >
              Забронировать
            </span>
            <span
              className={styles.requestType}
              style={requestType === "CheckIn" ? { background: "#01b075" } : {}}
              onClick={() => setRequestType("CheckIn")}
            >
              Заселиться
            </span>
          </div>
          <div className={styles.group}>
            <input
              type="number"
              required
              id="guestId"
              value={guestId !== undefined ? guestId : ""}
              onChange={handleInputChange}
            />
            <label htmlFor="guestId" className={styles.label}>
              Id гостя
            </label>
          </div>
          <div className={styles.group}>
            <input
              type="text"
              required
              id="daysToLive"
              value={daysToLive}
              onChange={(ev) => {
                if (!isNaN(parseFloat(ev.target.value))) {
                  setDaysToLive(+ev.target.value);
                }
              }}
            />
            <label htmlFor="daysToLive" className={styles.label}>
              Дней для проживания
            </label>
          </div>
          {form !== "delete" && (
            <>
              <div className={styles.group}>
                <input
                  type="text"
                  required
                  id="roomCount"
                  value={roomCount}
                  onChange={(ev) => {
                    if (!isNaN(parseFloat(ev.target.value))) {
                      setRoomCount(+ev.target.value);
                    }
                  }}
                />
                <label htmlFor="roomType" className={styles.label}>
                  Количество комнат
                </label>
              </div>
              <div className={styles.select}>
                <label htmlFor="roomType">Тип комнаты </label>
                <select
                  id="roomType"
                  name="roomType"
                  value={roomType.toString()}
                  onChange={(ev) => setRoomType(ev.target.value)}
                >
                  <option value="Люкс">Люкс</option>
                  <option value="Обычная">Обычная</option>
                </select>
              </div>
              <div className={styles.select}>
                <label htmlFor="feature">Особенности комнаты </label>
                <select
                  id="feature"
                  name="feature"
                  value={feature.toString()}
                  onChange={(ev) => setFeature(ev.target.value)}
                >
                  <option value="Не учитывать">Не учитывать</option>
                  <option value="Вид на море">Вид на море</option>
                  <option value="Удобные креслы">Удобные креслы</option>
                  <option value="Просторный шкаф">Просторный шкаф</option>
                  <option value="Есть приставка">Есть приставка</option>
                  <option value="Есть мини-бар">Есть мини-бар</option>
                </select>
              </div>
              {requestType === "Booking" && (
                <>
                  <div className={styles.group}>
                    <input
                      type="text"
                      required
                      id="roomNumber"
                      value={roomNumber}
                      onChange={(ev) => {
                        if (!isNaN(parseFloat(ev.target.value))) {
                          setRoomNumber(+ev.target.value);
                        }
                      }}
                    />
                    <label htmlFor="roomType" className={styles.label}>
                      Количество номеров
                    </label>
                  </div>
                  <input
                    type="datetime-local"
                    id="arrivalTime"
                    name="arrivalTime"
                    onChange={(ev) => setArrival(new Date(ev.target.value))}
                    required
                  />
                </>
              )}
            </>
          )}
          <label>
            <input onClick={() => setPay(!pay)} type="radio" checked={pay} />
            Оплатить сразу
          </label>

          <button style={{ marginTop: "25px" }}>Принять</button>
        </form>
      )}
    </div>
  );
};

export default RequestForm;
