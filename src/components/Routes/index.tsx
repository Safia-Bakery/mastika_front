import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "src/redux/utils/types";
import useToken from "src/hooks/useToken";
import { MainPermissions, OrderStatus } from "src/utils/types";
import Loading from "../Loader";
import { tokenSelector } from "src/redux/reducers/auth";
import { lazy, useEffect, useMemo } from "react";

// import Orders from "src/pages/Orders";
// import AddPhone from "src/pages/AddPhone";
// import AddOrder from "src/pages/AddOrder";
// import ShowOrder from "src/pages/ShowOrder";
// import Home from "src/pages/Home";
// import Users from "src/pages/Users";
// import Categories from "src/pages/Categories";
// import EditAddSubCategories from "src/pages/EditAddSubCategories";
// import Comments from "src/pages/Comments";
// import Roles from "src/pages/Roles";
// import EditAddRole from "src/pages/EditAddRole";
// import Branches from "src/pages/Branches";
// import EditAddBranch from "src/pages/EditAddBranch";
// import EditAddUser from "src/pages/EditAddUser";
// import FillingsComplexity from "src/pages/FillingsComplexity";
// import FillingInfo from "src/pages/FillingInfo";
// import EditAddFillingInfo from "src/pages/EditAddFillingInfo";
// import EditAddFillings from "src/pages/EditAddFillings";

// import EditAddCategory from "src/pages/EditAddCategory";
// import ShowSubCategory from "src/pages/ShowSubCategory";
// import ShowRole from "src/pages/ShowRole";
// import ShowSubCategChild from "src/pages/ShowSubCategChild";
// import EditAddSubCategsChild from "src/pages/EditAddSubCategsChild";
// import Products from "src/pages/Products";
// import Login from "src/pages/Login";
import Suspend from "../Suspend";
import WebRooutes from "../WebRoutes";

const TgMap = lazy(() => import("src/webapp/screens/TgMap"));
const TgSuccessOrder = lazy(() => import("src/webapp/screens/TgSuccessOrder"));
const TgDetails = lazy(() => import("src/webapp/screens/TgDetails"));
const TgPackage = lazy(() => import("src/webapp/screens/TgPackage"));
const TgFillings = lazy(() => import("src/webapp/screens/TgFillings"));
const TgOrderType = lazy(() => import("src/webapp/screens/TgOrderType"));
const TgOrderDirections = lazy(
  () => import("src/webapp/screens/TgOrderDirection")
);
const TgSubCategory = lazy(() => import("src/webapp/screens/TgSubCategory"));

const Login = lazy(() => import("src/pages/Login"));
const Orders = lazy(() => import("src/pages/Orders"));
const AddPhone = lazy(() => import("src/pages/AddPhone"));
const AddOrder = lazy(() => import("src/pages/AddOrder"));
const ShowOrder = lazy(() => import("src/pages/ShowOrder"));
const Home = lazy(() => import("src/pages/Home"));
const Users = lazy(() => import("src/pages/Users"));
const Categories = lazy(() => import("src/pages/Categories"));
const EditAddSubCategories = lazy(
  () => import("src/pages/EditAddSubCategories")
);
const Fillings = lazy(() => import("src/pages/Fillings"));
const Comments = lazy(() => import("src/pages/Comments"));
const Roles = lazy(() => import("src/pages/Roles"));
const EditAddRole = lazy(() => import("src/pages/EditAddRole"));
const Branches = lazy(() => import("src/pages/Branches"));
const EditAddBranch = lazy(() => import("src/pages/EditAddBranch"));
const EditAddUser = lazy(() => import("src/pages/EditAddUser"));
const FillingsComplexity = lazy(() => import("src/pages/FillingsComplexity"));
const FillingInfo = lazy(() => import("src/pages/FillingInfo"));
const EditAddFillingInfo = lazy(() => import("src/pages/EditAddFillingInfo"));
const EditAddFillings = lazy(() => import("src/pages/EditAddFillings"));
const EditAddCategory = lazy(() => import("src/pages/EditAddCategory"));
const ShowSubCategory = lazy(() => import("src/pages/ShowSubCategory"));
const ShowRole = lazy(() => import("src/pages/ShowRole"));
const ShowSubCategChild = lazy(() => import("src/pages/ShowSubCategChild"));
const EditAddSubCategsChild = lazy(
  () => import("src/pages/EditAddSubCategsChild")
);
const Products = lazy(() => import("src/pages/Products"));

const Navigation = () => {
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();

  const { isLoading, data } = useToken({});

  const permission = data?.permissions;

  const routes = useMemo(() => {
    return [
      {
        element: (
          <Orders
            edit={MainPermissions.edit_all_orders}
            add={MainPermissions.add_all_orders}
          />
        ),
        path: "/orders",
        screen: MainPermissions.all_orders,
      },
      {
        element: (
          <Orders
            status={OrderStatus.accepted}
            edit={MainPermissions.edit_rec_orders}
            add={MainPermissions.add_rec_orders}
          />
        ),
        path: "/received-orders",
        screen: MainPermissions.rec_orders,
      },
      {
        element: (
          <Users
            edit={MainPermissions.edit_clients}
            add={MainPermissions.add_clients}
          />
        ),
        path: "/clients",
        screen: MainPermissions.clients,
      },
      {
        element: <EditAddUser />,
        path: "/clients/add",
        screen: MainPermissions.add_clients,
      },
      {
        element: <EditAddUser />,
        path: "/clients/:clientid",
        screen: MainPermissions.edit_clients,
      },
      {
        element: <AddPhone />,
        path: "/orders/add-phone",
        screen: MainPermissions.add_all_orders,
      },
      {
        element: <AddOrder />,
        path: "/orders/add",
        screen: MainPermissions.add_all_orders,
      },
      {
        element: <ShowOrder />,
        path: "/orders/:id",
        screen: MainPermissions.edit_all_orders,
      },
      {
        element: <Comments />,
        path: "/comments",
        screen: MainPermissions.comments,
      },
      {
        element: <Fillings />,
        path: "/fillings",
        screen: MainPermissions.categories,
      },
      {
        element: <EditAddFillings />,
        path: "/fillings/add",
        screen: MainPermissions.categories,
      },
      {
        element: <EditAddFillings />,
        path: "/fillings/:id",
        screen: MainPermissions.categories,
      },
      {
        element: <Categories />,
        path: "/categories",
        screen: MainPermissions.categories,
      },
      {
        element: <EditAddCategory />,
        path: "add",
        screen: MainPermissions.add_categories,
      },
      // {
      //   element: <EditAddCategory />,
      //   path: ":id/edit",
      //   screen: MainPermissions.filling  ,
      // },
      // {
      //   element: <ShowSubCategory />,
      //   path: ":id/show",
      //   screen: MainPermissions.filling  ,
      // },
      // {
      //   element: <EditAddSubCategories />,
      //   path: ":id/editsub/:subid",
      //   screen: MainPermissions.filling  ,
      // },
      {
        element: <Roles />,
        path: "/roles",
        screen: MainPermissions.roles,
      },
      {
        element: <EditAddRole />,
        path: "/roles/add",
        screen: MainPermissions.add_roles,
      },
      {
        element: <EditAddRole />,
        path: "/roles/edit/:id",
        screen: MainPermissions.edit_roles,
      },
      {
        element: <ShowRole />,
        path: "/roles/:id",
        screen: MainPermissions.edit_roles,
      },
      {
        element: <Branches />,
        path: "/branches",
        screen: MainPermissions.branches,
      },
      {
        element: <EditAddBranch />,
        path: "/branches/add",
        screen: MainPermissions.branches,
      },
      {
        element: <EditAddBranch />,
        path: "/branches/:id",
        screen: MainPermissions.branches,
      },
      {
        element: (
          <Users
            edit={MainPermissions.edit_users}
            add={MainPermissions.add_users}
          />
        ),
        path: "/users",
        screen: MainPermissions.users,
      },
      {
        element: <EditAddUser />,
        path: "/users/add",
        screen: MainPermissions.add_users,
      },
      {
        element: <EditAddUser />,
        path: "/users/:id",
        screen: MainPermissions.edit_users,
      },
      {
        element: <Products />,
        path: "/products",
        screen: MainPermissions.products,
      },
    ];
  }, []);

  const renderScreen = useMemo(() => {
    if (!!permission && !!token)
      return routes.map((route) => {
        if (!!permission?.[route.screen]) {
          return (
            <Route
              key={route.path}
              element={<Suspend>{route.element}</Suspend>}
              path={route.path}
            />
          );
        }
      });

    return null;
  }, [permission, token]);

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/home");
  }, []);

  if (isLoading && token) return <Loading absolute />;
  return (
    <Routes>
      <Route path="/" element={<WebRooutes />}>
        <Route
          element={
            <Suspend>
              <Home />
            </Suspend>
          }
          index
          path={"home"}
        />
        <Route
          element={
            <Suspend>
              <Home />
            </Suspend>
          }
          path={"*"}
        />
        <Route
          element={
            <Suspend>
              <Login />
            </Suspend>
          }
          path={"login"}
        />
        {/* <Route element={<Login />} path={"login"} />
        <Route element={<Home />} index path={"home"} />
        <Route element={<Home />} path={"*"} />
        <Route
          element={
            <Orders
              edit={MainPermissions.edit_all_orders}
              add={MainPermissions.add_all_orders}
            />
          }
          path={"/orders"}
        />

        <Route
          element={
            <Orders
              edit={MainPermissions.edit_rec_orders}
              add={MainPermissions.add_rec_orders}
            />
          }
          path={"/received-orders"}
        />

        <Route
          element={
            <Users
              client
              edit={MainPermissions.edit_clients}
              add={MainPermissions.add_clients}
            />
          }
          path={"/clients"}
        />
        <Route element={<EditAddUser />} path={"/clients/add"} />
        <Route element={<EditAddUser />} path={"/clients/:clientid"} />
        <Route element={<AddPhone />} path={"/orders/add-phone"} />
        <Route element={<AddOrder />} path={"/orders/add"} />
        <Route element={<ShowOrder />} path={"/orders/:id"} />
        <Route element={<Comments />} path={"/comments"} />

        <Route element={<Roles />} path={"/roles"} />
        <Route element={<EditAddRole />} path={"/roles/add"} />
        <Route element={<EditAddRole />} path={"/roles/edit/:id"} />
        <Route element={<ShowRole />} path={"/roles/:id"} />

        <Route element={<Branches />} path={"/branches"} />
        <Route element={<EditAddBranch />} path={"/branches/add"} />
        <Route element={<EditAddBranch />} path={"/branches/:id"} />

        <Route
          element={
            <Users
              edit={MainPermissions.edit_users}
              add={MainPermissions.add_users}
            />
          }
          path={"/users"}
        />
        <Route element={<EditAddUser />} path={"/users/add"} />
        <Route element={<EditAddUser />} path={"/users/:id"} />

        <Route element={<Products />} path={"/products"} /> */}

        {renderScreen}

        <Route path={"/categories"}>
          <Route
            element={
              <Suspend>
                <Categories />
              </Suspend>
            }
            index
          />
          <Route
            element={
              <Suspend>
                <EditAddCategory />
              </Suspend>
            }
            path={"add"}
          />
          <Route
            element={
              <Suspend>
                <EditAddCategory />
              </Suspend>
            }
            path={":id/edit"}
          />

          {/* show subcategory */}
          <Route
            element={
              <Suspend>
                <ShowSubCategory />
              </Suspend>
            }
            path={":id/show"}
          />
          <Route
            element={
              <Suspend>
                <EditAddSubCategories />
              </Suspend>
            }
            path={":id/editsub/:subid"}
          />
          <Route
            element={
              <Suspend>
                <EditAddSubCategories />
              </Suspend>
            }
            path={":id/addsub"}
          />

          {/* <Route
              element={<Suspend><ShowSubCategory ch</Suspend>ild />}
              path={":id/:subid/show"}
            /> */}
          <Route
            element={
              <Suspend>
                <ShowSubCategChild />
              </Suspend>
            }
            path={":id/:subid/show"}
          />
          <Route
            element={
              <Suspend>
                <EditAddSubCategsChild />
              </Suspend>
            }
            path={":id/:subid/add"}
          />
          <Route
            element={
              <Suspend>
                <EditAddSubCategsChild />
              </Suspend>
            }
            path={":id/:subid/:child/edit"}
          />
          {/* <Route element={<Suspend><ShowSubCategChild /></Suspend>} path={":id/:subid/show"} /> */}
        </Route>

        {/* <Route path={"/fillings"}>
          <Route
            element={
              <Suspend>
                <FillingsComplexity />
              </Suspend>
            }
            path={":id"}
          />

          <Route
            element={
              <Suspend>
                <EditAddFillings />
              </Suspend>
            }
            path={":id/add"}
          />
          <Route
            element={
              <Suspend>
                <EditAddFillings />
              </Suspend>
            }
            path={":id/:complexity/edit"}
          />
          <Route
            element={
              <Suspend>
                <FillingInfo />
              </Suspend>
            }
            path={":id/:complexity"}
          />

          <Route
            element={
              <Suspend>
                <EditAddFillingInfo />
              </Suspend>
            }
            path={":id/:complexity/add"}
          />
          <Route
            element={
              <Suspend>
                <EditAddFillingInfo />
              </Suspend>
            }
            path={":id/:complexity/:filling/edit"}
          />
        </Route> */}
      </Route>

      {/* <WebNavigations /> */}
      <Route path="/tg">
        <Route
          path="order-type"
          element={
            <Suspend>
              <TgOrderType />
            </Suspend>
          }
          index
        />
        <Route
          path="order-directions"
          element={
            <Suspend>
              <TgOrderDirections />
            </Suspend>
          }
        />
        <Route
          path="complexity"
          element={
            <Suspend>
              <TgSubCategory />
            </Suspend>
          }
        />
        <Route
          path="fillings"
          element={
            <Suspend>
              <TgFillings />
            </Suspend>
          }
        />
        <Route
          path="package"
          element={
            <Suspend>
              <TgPackage />
            </Suspend>
          }
        />
        <Route
          path="details"
          element={
            <Suspend>
              <TgDetails />
            </Suspend>
          }
        />
        <Route
          path="success"
          element={
            <Suspend>
              <TgSuccessOrder />
            </Suspend>
          }
        />
        <Route
          path="map"
          element={
            <Suspend>
              <TgMap />
            </Suspend>
          }
        />
      </Route>
    </Routes>
  );
};

export default Navigation;
