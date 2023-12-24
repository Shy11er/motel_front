import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const nav_items = [
  { title: "Гость", to: "/guest" },
  { title: "Заявка", to: "/request" },
  { title: "Гостиница Элеон", to: "/" },
  { title: "Симуляция", to: "/simulation" },
  { title: "Комнаты", to: "/room" },
];

const Navbar: React.FC = () => {
  const [activeTitle, setActiveTitle] = React.useState<String | null>("Отель");

  return (
    <nav className={styles.nav}>
      <ul>
        {nav_items.map((item, key) => (
          <li
            key={key}
            className={activeTitle === item.title ? styles.active : ""}
            onClick={() => setActiveTitle(item.title)}
          >
            <Link to={item.to}>
              <h1>{item.title}</h1>
              <div className={styles.line}></div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
