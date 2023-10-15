import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import useToken from "src/hooks/useToken";
import { MainPermissions } from "src/utils/types";
import Loading from "../Loader";
import {
  logoutHandler,
  permissionSelector,
  tokenSelector,
} from "src/redux/reducers/auth";
import { lazy, useEffect, useMemo } from "react";
import Sidebar from "../Sidebar";

import Orders from "src/pages/Orders";
import AddPhone from "src/pages/AddPhone";
import AddOrder from "src/pages/AddOrder";
import ShowOrder from "src/pages/ShowOrder";
import Home from "src/pages/Home";
import Users from "src/pages/Users";
import Categories from "src/pages/Categories";
import EditAddSubCategories from "src/pages/EditAddSubCategories";
import Comments from "src/pages/Comments";
import Roles from "src/pages/Roles";
import EditAddRole from "src/pages/EditAddRole";
import Branches from "src/pages/Branches";
import EditAddBranch from "src/pages/EditAddBranch";
import EditAddUser from "src/pages/EditAddUser";
import FillingsComplexity from "src/pages/FillingsComplexity";
import FillingInfo from "src/pages/FillingInfo";
import EditAddFillingInfo from "src/pages/EditAddFillingInfo";
import EditAddFillings from "src/pages/EditAddFillings";

import EditAddCategory from "src/pages/EditAddCategory";
import ShowSubCategory from "src/pages/ShowSubCategory";
import ShowRole from "src/pages/ShowRole";
import ShowSubCategChild from "src/pages/ShowSubCategChild";
import EditAddSubCategsChild from "src/pages/EditAddSubCategsChild";
import Products from "src/pages/Products";
import Login from "src/pages/Login";
import Suspend from "../Suspend";

// const Login = lazy(() => import("pages/Login"));
// const Orders = lazy(() => import("src/pages/Orders"));
// const AddPhone = lazy(() => import("src/pages/AddPhone"));
// const AddOrder = lazy(() => import("src/pages/AddOrder"));
// const ShowOrder = lazy(() => import("src/pages/ShowOrder"));
// const Home = lazy(() => import("src/pages/Home"));
// const Users = lazy(() => import("src/pages/Users"));
// const Categories = lazy(() => import("src/pages/Categories"));
// const EditAddSubCategories = lazy(
//   () => import("src/pages/EditAddSubCategories")
// );
// const Comments = lazy(() => import("src/pages/Comments"));
// const Roles = lazy(() => import("src/pages/Roles"));
// const EditAddRole = lazy(() => import("src/pages/EditAddRole"));
// const Branches = lazy(() => import("src/pages/Branches"));
// const EditAddBranch = lazy(() => import("src/pages/EditAddBranch"));
// const EditAddUser = lazy(() => import("src/pages/EditAddUser"));
// const FillingsComplexity = lazy(() => import("src/pages/FillingsComplexity"));
// const FillingInfo = lazy(() => import("src/pages/FillingInfo"));
// const EditAddFillingInfo = lazy(() => import("src/pages/EditAddFillingInfo"));
// const EditAddFillings = lazy(() => import("src/pages/EditAddFillings"));
// const EditAddCategory = lazy(() => import("src/pages/EditAddCategory"));
// const ShowSubCategory = lazy(() => import("src/pages/ShowSubCategory"));
// const ShowRole = lazy(() => import("src/pages/ShowRole"));
// const ShowSubCategChild = lazy(() => import("src/pages/ShowSubCategChild"));
// const EditAddSubCategsChild = lazy(
//   () => import("src/pages/EditAddSubCategsChild")
// );
// const Products = lazy(() => import("src/pages/Products"));

export const routes = [
  {
    element: <Orders />,
    path: "/orders",
    screen: MainPermissions.all_orders,
  },
  {
    element: <Orders />,
    path: "/received-orders",
    screen: MainPermissions.rec_orders,
  },
  {
    element: <Users />,
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
    element: <Users />,
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

const Navigation = () => {
  const token = useAppSelector(tokenSelector);
  const permission = useAppSelector(permissionSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: me, error, isLoading } = useToken({});

  // useEffect(() => {
  //   if (!!user?.permissions.length)
  //     dispatch(permissionHandler(user?.permissions));
  // }, [user?.permissions]);

  // const renderScreen = useMemo(() => {
  //   if (!!permission && !!token)
  //     return routes.map((route) => {
  //       if (!!permission?.[route.screen]) {
  //         return (
  //           <Route
  //             key={route.path}
  //             element={<Suspend>{route.element}</Suspend>}
  //             path={route.path}
  //           />
  //         );
  //       }
  //     });

  //   return null;
  // }, [permission, routes, token]);

  const renderSidebar = useMemo(() => {
    if (!token) return <Sidebar />;
  }, [permission, token]);

  useEffect(() => {
    // if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);

  if (isLoading && token) return <Loading absolute />;

  return (
    <div className="flex max-w-[100vw] w-full pl-[270px]">
      {renderSidebar}
      <div className="flex flex-col flex-1">
        <Routes>
          <Route element={<Login />} path={"/login"} />
          <Route element={<Home />} index path={"/home"} />
          <Route element={<Home />} path={"*"} />
          <Route element={<Orders />} path={"/orders"} />

          <Route element={<Orders />} path={"/received-orders"} />

          <Route element={<Users client />} path={"/clients"} />
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

          <Route element={<Users />} path={"/users"} />
          <Route element={<EditAddUser />} path={"/users/add"} />
          <Route element={<EditAddUser />} path={"/users/:id"} />

          <Route element={<Products />} path={"/products"} />

          {/* {renderScreen} */}

          <Route path={"/categories"}>
            <Route element={<Categories />} index />
            <Route element={<EditAddCategory />} path={"add"} />
            <Route element={<EditAddCategory />} path={":id/edit"} />

            {/* show subcategory */}
            <Route element={<ShowSubCategory />} path={":id/show"} />
            <Route
              element={<EditAddSubCategories />}
              path={":id/editsub/:subid"}
            />
            <Route element={<EditAddSubCategories />} path={":id/addsub"} />

            {/* <Route
              element={<ShowSubCategory child />}
              path={":id/:subid/show"}
            /> */}
            <Route element={<ShowSubCategChild />} path={":id/:subid/show"} />
            <Route
              element={<EditAddSubCategsChild />}
              path={":id/:subid/add"}
            />
            <Route
              element={<EditAddSubCategsChild />}
              path={":id/:subid/:child/edit"}
            />
            {/* <Route element={<ShowSubCategChild />} path={":id/:subid/show"} /> */}
          </Route>

          <Route path={"/fillings"}>
            {/* 
            
              --complexity - {standart, PP, premium}
              --filling - {standart} -> {raduga, rafaello }

              Fillings -> complexity(standart) -> filling(raduga, rafaello)

              /filling/:id - standart show
              /filling/add - add like a standart
              /filling/edit/:id - edit standart

              /filling/:id/add - add new complexity, like a rafaello, raduga
              /filling/:id/:complexity - show raduga, inside of standart
              /filling/:id/:complexity/edit - edit raduga
              
              /filling/:id/:complexity/add - add new filling, floors portions
              /filling/:id/:complexity/:filling/edit - edit portion, 

            
            */}
            <Route element={<EditAddFillings />} path={"add"} />
            <Route element={<EditAddFillings />} path={"edit/:id"} />
            <Route element={<FillingsComplexity />} path={":id"} />

            <Route element={<EditAddFillings />} path={":id/add"} />
            <Route
              element={<EditAddFillings />}
              path={":id/:complexity/edit"}
            />
            <Route element={<FillingInfo />} path={":id/:complexity"} />

            <Route
              element={<EditAddFillingInfo />}
              path={":id/:complexity/add"}
            />
            <Route
              element={<EditAddFillingInfo />}
              path={":id/:complexity/:filling/edit"}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
