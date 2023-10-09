import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import {
  logoutHandler,
  permissionSelector,
  tokenSelector,
} from "src/redux/reducers/auth";
import Login from "pages/Login";
import { useEffect, useMemo } from "react";
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
import EditAddComplexity from "src/pages/EditAddComplexity";
import EditAddFillingInfo from "src/pages/EditAddFillingInfo";
import EditAddFillings from "src/pages/EditAddFillings";
import useToken from "src/hooks/useToken";
import Loading from "../Loader";
import EditAddCategory from "src/pages/EditAddCategory";
import ShowSubCategory from "src/pages/ShowSubCategory";

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

  const renderSidebar = useMemo(() => {
    if (!!token) return <Sidebar />;
  }, [permission, token]);

  useEffect(() => {
    if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);

  if (isLoading && token) return <Loading absolute />;

  return (
    <div className="flex">
      {renderSidebar}
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
          <Route element={<EditAddCategory />} path={"/categories/add"} />
          <Route element={<EditAddCategory />} path={"/categories/:id"} />

          {/* show subcategory */}
          <Route element={<ShowSubCategory />} path={"/categories/:id/show"} />
          <Route
            element={<EditAddSubCategories />}
            path={"/categories/:id/editsub/:subid"}
          />
          <Route
            element={<EditAddSubCategories />}
            path={"/categories/:id/addsub"}
          />

          {/*           
          <Route element={<EditAddSubCategories />} path={"/categories/add"} />
          <Route element={<EditAddSubCategories />} path={"/categories/:id"} /> */}

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
