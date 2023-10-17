import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment } from "react";
import { useAppDispatch } from "src/redux/utils/types";
import { logoutHandler } from "src/redux/reducers/auth";
import { MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";

const routes = [
  { name: "Главная страница", url: "/home", param: "?" },
  {
    name: "Поиск",
    url: "/search",
    hasline: true,
    screen: MainPermissions.fillings,
  },
  { name: "Все заявки", url: "/orders", screen: MainPermissions.fillings },
  {
    name: "Принятые заказы",
    url: "/received-orders",
    screen: MainPermissions.fillings,
  },
  {
    name: "Товары",
    url: "/products",
    screen: MainPermissions.fillings,
  },
  {
    name: "Категории",
    url: "/categories",
    screen: MainPermissions.fillings,
  },
  { name: "Клиенты", url: "/clients", screen: MainPermissions.fillings },
  {
    name: "Отзывы",
    url: "/comments",
    hasline: true,
    screen: MainPermissions.fillings,
  },
  { name: "Пользователи", url: "/users", screen: MainPermissions.fillings },
  { name: "Филиалы", url: "/branches", screen: MainPermissions.fillings },
  {
    name: "Роли",
    url: "/roles",
    screen: MainPermissions.fillings,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  // const routes = useMemo(() => {
  //   return [
  //     { name: "Главная страница", url: "/home", param: "?" },
  //     {
  //       name: "Поиск",
  //       url: "/search",
  //       hasline: true,
  //       screen: MainPermissions.all_orders,
  //     },
  //     {
  //       name: "Все заявки",
  //       url: "/orders",
  //       screen: MainPermissions.all_orders,
  //     },
  //     {
  //       name: "Принятые заказы",
  //       url: "/received-orders",
  //       screen: MainPermissions.rec_orders,
  //     },

  //     {
  //       name: "Товары",
  //       url: "/products",
  //       screen: MainPermissions.products,
  //     },
  //     {
  //       name: "Категории",
  //       url: "/categories",
  //       screen: MainPermissions.categories,
  //     },

  //     { name: "Клиенты", url: "/clients", screen: MainPermissions.clients },
  //     {
  //       name: "Отзывы",
  //       url: "/comments",
  //       hasline: true,
  //       screen: MainPermissions.comments,
  //     },
  //     { name: "Пользователи", url: "/users", screen: MainPermissions.users },
  //     { name: "Филиалы", url: "/branches", screen: MainPermissions.branches },
  //     {
  //       name: "Роли",
  //       url: "/roles",
  //       screen: MainPermissions.roles,
  //     },
  //   ];
  // }, []);

  const dispatch = useAppDispatch();
  const permission = { 1: true, 2: true };
  const { data: me } = useToken({ enabled: false });

  // const [menuItem, $menuItem] = useState<MainPermissions>();

  // const toggleSubItems = (item: MainPermissions) => {
  //   if (item === menuItem) $menuItem(undefined);
  //   else $menuItem(item);
  // };

  const handleLogout = () => dispatch(logoutHandler());

  if (!permission) return;

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
      <span onClick={handleLogout} className={styles.logout}>
        Выйти ({me?.username})
      </span>
    </div>
  );
};

export default Sidebar;
