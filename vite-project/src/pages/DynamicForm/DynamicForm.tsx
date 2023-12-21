import React from "react";
import styles from "./styles.module.scss";
import axios from "axios";

interface FormData {
  fieldName: string;
}

interface DynamicFormProps {
  form: string;
}

interface GuestDto {
  firstName: string;
  surName: string;
  lastName: string;
  id: number;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ form }) => {
  const [firstName, setFirstName] = React.useState<String>("");
  const [surName, setSurName] = React.useState<String>("");
  const [lastName, setLastName] = React.useState<String>("");
  const [guestId, setGuestId] = React.useState<number | undefined>();

  const [buttonClicked, setButtonClicked] = React.useState<Boolean>(false);

  const [tableData, setTableData] = React.useState<GuestDto[]>([]);
  const [formData, setFormData] = React.useState<FormData>({
    fieldName: "",
  });

  React.useEffect(() => {
    (async () => {
      if (buttonClicked) {
        const fetchData = await axios.get<GuestDto[]>(
          "http://localhost:8080/guest/get-all"
        );

        setTableData(fetchData.data);
        console.log(tableData);
      }

      setButtonClicked(false);
    })();
  }, [buttonClicked]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: guestId,
      firstName,
      surName,
      lastName,
    };

    let requestType;
    switch (form) {
      case "create":
        requestType = "POST";
        break;
      case "showAll":
        requestType = "GET";
        break;
      case "delete":
        requestType = "DELETE";
        break;
      case "update":
        requestType = "PUT";
        break;
    }

    if (form == "delete" || form == "update") {
      form += `/${guestId}`;
    }

    await fetch(`http://localhost:8080/guest/${form}`, {
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
      {form === "showAll" ? (
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
                  <td>{data.id}</td>
                  <td>{data.firstName}</td>
                  <td>{data.surName}</td>
                  <td>{data.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setButtonClicked(true)}>Обновить</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {(form === "delete" || form === "update") && (
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
            </>
          )}
          {(form === "create" || form === "update") && (
            <>
              <div className={styles.group}>
                <input
                  type="text"
                  required
                  id="firstName"
                  value={firstName.toString()}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(ev.target.value)
                  }
                />
                <label htmlFor="firstName" className={styles.label}>
                  Имя
                </label>
              </div>

              <div className={styles.group}>
                <input
                  type="text"
                  required
                  id="surName"
                  value={surName.toString()}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    setSurName(ev.target.value)
                  }
                />
                <label htmlFor="surName" className={styles.label}>
                  Фамилия
                </label>
              </div>

              <div className={styles.group}>
                <input
                  type="text"
                  required
                  id="lastName"
                  value={lastName.toString()}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(ev.target.value)
                  }
                />
                <label htmlFor="lastName" className={styles.label}>
                  Отчество
                </label>
              </div>
            </>
          )}

          <button type="submit">Принять</button>
        </form>
      )}
    </div>
  );
};

export default DynamicForm;
