import { Link } from "react-router-dom";
import Typography, { TextSize } from "../Typography";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useState } from "react";

const routes = [
  { name: "Все сервисы", url: "" },
  { name: "Поиск", url: "", hasline: true },
  { name: "Все заявки", url: "" },
  { name: "Принятые заказы", url: "" },
  { name: "Категории", url: "" },
  { name: "Начинки", url: "" },
  { name: "Палитры", url: "" },
  { name: "Товары", url: "" },
  { name: "Отчёты", url: "", hasline: true },
  { name: "Клиенты", url: "", hasline: true },
  { name: "Отзывы", url: "" },
  { name: "Уведомления", url: "" },
  { name: "Пользователи", url: "" },
  { name: "Настройки", url: "" },
];

const Sidebar = () => {
  const [active, $active] = useState("Все заявки");

  const handleActive = (name: string) => $active(name);

  return (
    <div className="p-3 relative top-0 bottom-0 left-0 h-[100lvh] overflow-y-auto mr-4">
      <div className="flex items-center gap-2">
        <img
          height={36}
          width={36}
          src="/assets/images/safia.png"
          alt="safia-logo"
        />
        <Typography size={TextSize.XXL} className="font-medium text-black">
          МАСТИКА
        </Typography>
      </div>

      <ul className="p-2">
        {routes.map((route) => {
          const selected = route.name === active;
          return (
            <Fragment key={route.name}>
              <li
                onClick={() => handleActive(route.name)}
                className={cl(
                  "py-2 px-4  my-2 rounded-[16px] hover:bg-white cursor-pointer",
                  {
                    ["bg-white"]: selected,
                  }
                )}
              >
                <Link
                  to={route.url}
                  className={cl("text-darkGray font-medium ", {
                    ["!text-black"]: selected,
                  })}
                >
                  {route.name}
                </Link>
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
