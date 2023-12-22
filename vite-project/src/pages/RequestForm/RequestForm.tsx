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

const RequestForm: React.FC<DynamicFormProps> = ({ form }) => {
  const [guestId, setGuestId] = React.useState<number | undefined>();
  const [roomCount, setRoomCount] = React.useState<number | undefined>();
  const [arrival, setArrival] = React.useState<Date>(date);
  const [roomType, setRoomType] = React.useState("");
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState<FormData>({
    fieldName: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: guestId,
      arrival,
    };

    let requestType;
    switch (form) {
      case "create":
        requestType = "POST";
        break;
      case "delete":
        requestType = "DELETE";
        break;
      case "update":
        requestType = "PUT";
        break;
      case "get-all":
        requestType = "GET";
        break;
    }

    if (requestType === "DELETE" || requestType === "UPDATE") {
      form += `${guestId}`;
    }

    await fetch(`http://localhost:8080/request/${form}`, {
      method: requestType,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);

    if (!isNaN(inputValue)) {
      setGuestId(inputValue);
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        {form === "get-all" ? (
          <>
            <h1>Список гостей</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Фамилия</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    {/* <td>{data.id}</td>
                  <td>{data.firstName}</td>
                  <td>{data.surName}</td>
                  <td>{data.lastName}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <button onClick={() => setButtonClicked(true)}>Обновить</button> */}
          </>
        ) : (
          <>
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
                <input
                  type="datetime-local"
                  id="arrivalTime"
                  name="arrivalTime"
                  onChange={(ev) => setArrival(new Date(ev.target.value))}
                  required
                />
              </>
            )}

            <button style={{ marginTop: "25px" }}>Принять</button>
          </>
        )}
        ;
      </form>
    </div>
  );
};

export default RequestForm;
