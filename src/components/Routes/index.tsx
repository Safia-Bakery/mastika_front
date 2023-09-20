import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "src/redux/utils/types";
import { permissionSelector, tokenSelector } from "src/redux/reducers/auth";
import Login from "pages/Login";
import { useMemo } from "react";
import Sidebar from "../Sidebar";
import Orders from "src/pages/Orders";
import AddPhone from "src/pages/AddPhone";
import AddOrder from "src/pages/AddOrder";

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
          <Route element={<Orders />} path={"/"} />
          <Route element={<AddPhone />} path={"/orders/add-phone"} />
          <Route element={<AddOrder />} path={"/orders/add"} />
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
