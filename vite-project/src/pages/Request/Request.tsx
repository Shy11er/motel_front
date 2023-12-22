import React from "react";
import styles from "./styles.module.scss";
import RequestForm from "../RequestForm/RequestForm";

const Request: React.FC = () => {
  const [selectedForm, setSelectedForm] = React.useState<string | null>(null);

  const showForm = (formName: string) => {
    setSelectedForm(formName);
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <button onClick={() => showForm("create")}>Подать</button>
        <button onClick={() => showForm("delete")}>Удалить</button>
        <button onClick={() => showForm("update")}>Обновить</button>
        <button onClick={() => showForm("get-all")}>Показать все</button>
      </div>

      <div className={styles.main}>
        {selectedForm && <RequestForm form={selectedForm} />}
      </div>
    </div>
  );
};

export default Request;
