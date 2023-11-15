import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment } from "react";
import { useAppDispatch } from "src/store/utils/types";
import { logoutHandler } from "src/store/reducers/auth";
import { MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDA0NTk5NjcsInN1YiI6InRlc3QifQ.kzPjvDJgqNh0JSnEZCQy7imVve4-f4CGq_Mh74qEsSg";

const routes = [
  { name: "Главная страница", url: "/home", param: "?" },
  {
    name: "Поиск",
    url: "/search",
    hasline: true,
    screen: MainPermissions.fillings,
  },
  {
    name: "Все заявки",
    url: "/orders",
    screen: MainPermissions.all_orders,
  },
  {
    name: "Принятые заказы",
    url: "/received-orders",
    screen: MainPermissions.rec_orders,
  },
  {
    name: "Товары",
    url: "/products",
    screen: MainPermissions.products,
  },
  {
    name: "Категории",
    url: "/categories",
    screen: MainPermissions.categories,
  },
  {
    name: "Начинки",
    url: "/fillings",
    screen: MainPermissions.fillings,
  },
  { name: "Клиенты", url: "/clients", screen: MainPermissions.clients },
  {
    name: "Отзывы",
    url: "/comments",
    hasline: true,
    screen: MainPermissions.comments,
  },
  { name: "Пользователи", url: "/users", screen: MainPermissions.users },
  { name: "Филиалы", url: "/branches", screen: MainPermissions.branches },
  {
    name: "Роли",
    url: "/roles",
    screen: MainPermissions.roles,
  },
  // {
  //   name: "Test: View Web App",
  //   url: `/tg/order-type?token=${token}`,
  //   screen: MainPermissions.roles,
  // },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { data } = useToken({});
  const permission = data?.permissions;
  const { data: me } = useToken({ enabled: false });

  const handleLogout = () => dispatch(logoutHandler());

  return (
    <div className={cl(styles.sidebar)}>
      <div className={styles.block}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            className="w-full m-3"
            src="/assets/icons/main-logo.svg"
            alt="safia-logo"
          />
        </div>
        <ul className={styles.mainList}>
          <li className={cl(styles.navItem)}>
            <Link
              className={cl(styles.link, {
                [styles.active]: pathname === "/home",
              })}
              to={"/home"}
            >
              <p className={styles.content}>Главная страница</p>
            </Link>
          </li>
          {routes.map((route) => {
            if (route?.screen && permission?.[route?.screen]) {
              return (
                <Fragment key={route.url + route.name}>
                  <li className={cl("nav-item")}>
                    <Link
                      className={cl(
                        "nav-link d-flex align-items-center",
                        styles.link,
                        {
                          [styles.active]: pathname.includes(route.url!),
                        }
                      )}
                      to={`${route.url}`}
                      state={{ name: route.name }}
                    >
                      <p className={styles.content}>{route.name}</p>
                    </Link>
                  </li>
                  {route.hasline && <div className={styles.line} />}
                </Fragment>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div onClick={handleLogout} className={styles.logout}>
        Выйти ({me?.user.username})
      </div>
    </div>
  );
};

export default Sidebar;
