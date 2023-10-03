import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "src/redux/utils/types";
import { permissionSelector, tokenSelector } from "src/redux/reducers/auth";
import Login from "pages/Login";
import { useMemo } from "react";
import Sidebar from "../Sidebar";
import Orders from "src/pages/Orders";
import AddPhone from "src/pages/AddPhone";
import AddOrder from "src/pages/AddOrder";
import ShowOrder from "src/pages/ShowOrder";
import Home from "src/pages/Home";
import Users from "src/pages/Users";
import Categories from "src/pages/Categories";
import EditAddCategories from "src/pages/EditAddCategories";
import Comments from "src/pages/Comments";
import Roles from "src/pages/Roles";
import EditAddRole from "src/pages/EditAddRole";
import Branches from "src/pages/Branches";
import EditAddBranch from "src/pages/EditAddBranch";
import EditAddUser from "src/pages/EditAddUser";
import FillingsComplexity from "src/pages/FillingsComplexity";
import FillingInfo from "src/pages/FillingInfo";
import EditAddComplexity from "src/pages/EditAddComplexity";
import EditAddFillingInfo from "src/pages/EditAddFillingInfo";

const Navigation = () => {
  const token = useAppSelector(tokenSelector);
  const permission = useAppSelector(permissionSelector);

  // useEffect(() => {
  //   if (!!user?.permissions.length)
  //     dispatch(permissionHandler(user?.permissions));
  // }, [user?.permissions]);

  const renderSidebar = useMemo(() => {
    // if (permission && token)
    return <Sidebar />;
  }, [permission, token]);

  // useEffect(() => {
  //   if (!token) navigate("/login");
  //   if (!!error) dispatch(logoutHandler());
  // }, [token, error, tokenKey]);

  // if (isLoading && token) return <Loading />;

  return (
    <div className="flex">
      {renderSidebar}
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        <Routes>
          <Route element={<Login />} path={"/login"} />
          <Route element={<Home />} index path={"/home"} />
          <Route element={<Home />} path={"*"} />
          <Route element={<Orders />} path={"/orders"} />

          <Route element={<Orders />} path={"/received-orders"} />

          <Route element={<Users />} path={"/clients"} />
          <Route element={<AddPhone />} path={"/orders/add-phone"} />
          <Route element={<AddOrder />} path={"/orders/add"} />
          <Route element={<ShowOrder />} path={"/orders/:id"} />
          <Route element={<Comments />} path={"/comments"} />

          <Route element={<Categories />} path={"/categories"} />
          <Route element={<EditAddCategories />} path={"/categories/add"} />
          <Route element={<EditAddCategories />} path={"/categories/:id"} />

          <Route element={<Roles />} path={"/roles"} />
          <Route element={<EditAddRole />} path={"/roles/add"} />
          <Route element={<EditAddRole />} path={"/roles/:id"} />

          <Route element={<Branches />} path={"/branches"} />
          <Route element={<EditAddBranch />} path={"/branches/add"} />
          <Route element={<EditAddBranch />} path={"/branches/:id"} />

          <Route element={<Users />} path={"/users"} />
          <Route element={<EditAddUser />} path={"/users/add"} />
          <Route element={<EditAddUser />} path={"/users/:id"} />

          <Route
            // element={<FillingsComplexity />}
            path={"/fillings"}
          >
            <Route element={<FillingsComplexity />} path={":complexity"} />
            <Route element={<EditAddComplexity />} path={":complexity/edit"} />
            <Route element={<EditAddComplexity />} path={":complexity/add"} />
            <Route element={<FillingInfo />} path={":complexity/:filling"} />
            <Route
              element={<EditAddFillingInfo />}
              path={":complexity/:filling/edit"}
            />
            <Route
              element={<EditAddFillingInfo />}
              path={":complexity/:filling/add"}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
