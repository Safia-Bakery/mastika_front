import { useMatch, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useState } from "react";

const routes = [
  { name: "Главная страница", url: "/" },
  { name: "Поиск", url: "/search", hasline: true },
  { name: "Все заявки", url: "/orders" },
  { name: "Принятые заказы", url: "/recieved-orders" },
  { name: "Категории", url: "/categories" },
  { name: "Начинки", url: "/recieved-orders1" },
  { name: "Палитры", url: "/recieved-orders2" },
  { name: "Товары", url: "/recieved-orders4" },
  { name: "Отчёты", url: "/recieved-orders5", hasline: true },
  { name: "Клиенты", url: "/clients", hasline: true },
  { name: "Отзывы", url: "/recieved-orders6" },
  { name: "Уведомления", url: "/recieved-orders7" },
  { name: "Пользователи", url: "/recieved-orders8" },
  { name: "Настройки", url: "/recieved-orders9" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, $active] = useState("Все заявки");

  const handleActive = (name: string) => $active(name);

  return (
    <div className="p-3 relative top-0 bottom-0 left-0 h-[100lvh] overflow-y-auto mr-4">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          className="w-full"
          src="/assets/images/main-logo.png"
          alt="safia-logo"
        />
      </div>

      <ul className="p-2">
        {routes.map((route) => {
          const selected = route.name === active;
          return (
            <Fragment key={route.name}>
              <li
                onClick={() => navigate(route.url)}
                className={cl(
                  "py-2 px-4  my-2 rounded-[16px] hover:bg-white cursor-pointer",
                  {
                    ["bg-white"]: useMatch(route.url),
                  }
                )}
              >
                <span
                  className={cl("text-darkGray font-medium ", {
                    ["!text-black"]: selected,
                  })}
                >
                  {route.name}
                </span>
              </li>

              {route.hasline && <div className={styles.line} />}
            </Fragment>
          );
        })}
      </ul>

      <div className="text-darkGray font-medium py-2 px-6 my-2 cursor-pointer">
        Аккаунт (Выйти)
      </div>
    </div>
  );
};

export default Sidebar;
