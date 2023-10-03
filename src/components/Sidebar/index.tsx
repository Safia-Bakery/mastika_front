import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useMemo } from "react";

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const routes = useMemo(() => {
    return [
      { name: "Главная страница", url: "/home" },
      { name: "Поиск", url: "/search", hasline: true },
      { name: "Все заявки", url: "/orders" },
      { name: "Принятые заказы", url: "/received-orders" },
      { name: "Палитры", url: "/received-orders2" },
      { name: "Товары", url: "/received-orders4" },
      { name: "Категории", url: "/categories" },
      {
        name: "Начинки",
        url: "/fillings",
        subroutes: [
          {
            name: "Стандарт",
            url: "/standart",
          },
        ],
      },
      // { name: "Отчёты", url: "/received-orders5", hasline: true },
      { name: "Клиенты", url: "/clients" },
      { name: "Отзывы", url: "/comments", hasline: true },
      { name: "Пользователи", url: "/users" },
      { name: "Роли", url: "/roles" },
      // { name: "Уведомления", url: "/notifications" },
      { name: "Филиалы", url: "/branches" },
    ];
  }, []);

  return (
    <div className="p-3 relative top-0 bottom-0 left-0 h-[100lvh] overflow-y-auto mr-4 flex flex-col justify-between">
      <div className="flex flex-col ">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            className="w-full"
            src="/assets/icons/main-logo.svg"
            alt="safia-logo"
          />
        </div>

        <ul className="p-2">
          {routes.map((route) => {
            const active = pathname.includes(route.url);
            return (
              <Fragment key={route.name}>
                <li
                  onClick={() => navigate(route.url)}
                  className={cl(
                    "py-2 px-4 rounded-[16px] hover:bg-white cursor-pointer my-1",
                    {
                      ["bg-white"]: active,
                    }
                  )}
                >
                  <span
                    className={cl("text-darkGray font-medium ", {
                      ["!text-black"]: active,
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
      </div>
      <div className="text-darkGray font-medium py-2 px-6 my-2 cursor-pointer">
        Аккаунт (Выйти)
      </div>
    </div>
  );
};

export default Sidebar;
