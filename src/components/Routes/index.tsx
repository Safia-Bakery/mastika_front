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
import ControlPanel from "src/pages/ControlPanel";
import Users from "src/pages/Users";
import Categories from "src/pages/Categories";
import EditAddCategories from "src/pages/EditAddCategories";
import Comments from "src/pages/Comments";
import Roles from "src/pages/Roles";
import AddRole from "src/pages/AddRole";

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
      <div className="flex flex-col flex-1">
        <Routes>
          <Route element={<Login />} path={"/login"} />
          <Route element={<ControlPanel />} index path={"/"} />
          <Route element={<Orders />} path={"/orders"} />
          <Route element={<Users />} path={"/users"} />
          <Route element={<Users />} path={"/clients"} />
          <Route element={<AddPhone />} path={"/orders/add-phone"} />
          <Route element={<AddOrder />} path={"/orders/add"} />
          <Route element={<ShowOrder />} path={"/orders/:id"} />
          <Route element={<Categories />} path={"/categories"} />
          <Route element={<Comments />} path={"/comments"} />
          <Route element={<EditAddCategories />} path={"/categories/add"} />
          <Route element={<EditAddCategories />} path={"/categories/:id"} />
          <Route element={<Roles />} path={"/roles"} />
          <Route element={<AddRole />} path={"/roles/add"} />
          <Route element={<AddRole />} path={"/roles/:id"} />
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
