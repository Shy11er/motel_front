import React from "react";
import styles from "./styles.module.scss";
import DynamicForm from "../../components/DynamicForm/DynamicForm";

const Guest: React.FC = () => {
  const [selectedForm, setSelectedForm] = React.useState<string | null>(null);

  const showForm = (formName: string) => {
    setSelectedForm(formName);
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <button onClick={() => showForm("showAll")}>Показать Всех</button>
        <button onClick={() => showForm("create")}>Создать</button>
        <button onClick={() => showForm("delete")}>Удалить</button>
      </div>

      <div className={styles.main}>
        {selectedForm && <DynamicForm form={selectedForm} />}
      </div>
    </div>
  );
};

export default Guest;
