import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useMemo, useState } from "react";
import { useAppDispatch } from "src/redux/utils/types";
import { logoutHandler } from "src/redux/reducers/auth";
import { MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const routes = useMemo(() => {
    return [
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
      // {
      //   name: "Палитры",
      //   url: "/received-orders2",
      //   screen: MainPermissions.fillings,
      // },
      {
        name: "Товары",
        url: "/received-orders4",
        screen: MainPermissions.fillings,
      },
      {
        name: "Категории",
        url: "/categories",
        screen: MainPermissions.fillings,
      },
      // {
      //   name: "Начинки",
      //   screen: MainPermissions.filling,
      //   url: "#",
      //   subroutes: [
      //     {
      //       name: "Стандарт",
      //       url: "/fillings/1",
      //       screen: MainPermissions.fillings,
      //       param: "?",
      //     },
      //     {
      //       name: "Another",
      //       url: "/fillings/2",
      //       screen: MainPermissions.fillings,
      //       param: "?",
      //     },
      //     {
      //       name: "add",
      //       url: "/fillings/add",
      //       screen: MainPermissions.fillings,
      //       param: "?",
      //     },
      //   ],
      // },
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
  }, []);

  const dispatch = useAppDispatch();
  const permission = { 1: true, 2: true };
  const { data: me } = useToken({ enabled: false });

  const [menuItem, $menuItem] = useState<MainPermissions>();

  const toggleSubItems = (item: MainPermissions) => {
    if (item === menuItem) $menuItem(undefined);
    else $menuItem(item);
  };

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
              // if (
              //   permission?.[route?.screen] ||
              //   (route?.subroutes &&
              //     route.subroutes.some(
              //       (subroute) => permission?.[subroute.screen]
              //     ))
              // ) {
              // if (route?.subroutes?.length) {
              //   const activeRoute = menuItem === route.screen;
              //   return (
              //     <li className={styles.navItem} key={route.url + route.name}>
              //       <a
              //         className={cl(styles.link, {
              //           // [styles.show]: activeRoute,
              //         })}
              //         onClick={() => toggleSubItems(route.screen)}
              //         href={`#${route.screen}`}
              //       >
              //         <p className={styles.content}>
              //           {route.name}
              //           <img
              //             src="/assets/icons/arrow.svg"
              //             alt="arrow"
              //             className={cl({
              //               [styles.activeImage]: activeRoute,
              //             })}
              //             width={15}
              //             height={15}
              //           />
              //         </p>
              //       </a>
              //       <div
              //         className={cl(styles.collapse, {
              //           [styles.show]: activeRoute,
              //         })}
              //         id="subItems"
              //       >
              //         <ul className={cl(styles.submenu)}>
              //           {route?.subroutes?.map((subroute) => {
              //             if (permission?.[subroute?.screen])
              //               return (
              //                 <li
              //                   className={styles.navItem}
              //                   key={subroute.url + subroute.name}
              //                 >
              //                   <Link
              //                     className={cl(styles.link, {
              //                       [styles.active]: pathname.includes(
              //                         subroute.url
              //                       ),
              //                     })}
              //                     to={`${subroute.url}${
              //                       !!subroute?.param ? subroute?.param : ""
              //                     }`}
              //                     state={{ name: subroute.name }}
              //                   >
              //                     <p className={styles.content}>
              //                       {subroute.name}
              //                     </p>
              //                   </Link>
              //                 </li>
              //               );
              //           })}
              //         </ul>
              //       </div>
              //     </li>
              //   );
              // }

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
                      {/* <span className={styles.menuItem}>{route.name}</span> */}
                    </Link>
                  </li>
                  {route.hasline && <div className={styles.line} />}
                </Fragment>
              );
              // }
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
