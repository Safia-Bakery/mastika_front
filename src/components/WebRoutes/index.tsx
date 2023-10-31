import { useEffect, useMemo } from "react";
import Sidebar from "../Sidebar";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { logoutHandler, tokenSelector } from "src/store/reducers/auth";
import { Outlet, useNavigate } from "react-router-dom";
import useToken from "src/hooks/useToken";
import Loading from "../Loader";

const WebRooutes = () => {
  const token = useAppSelector(tokenSelector);
  const { data: me, isLoading, error } = useToken({});
  const permission = me?.permissions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);

  const renderSidebar = useMemo(() => {
    if (!!permission && !!token) {
      return <Sidebar />;
    }
  }, [permission, token]);

  if (isLoading && token) return <Loading absolute />;

  return (
    <>
      <div className="flex max-w-[100vw] w-full pl-[270px]">
        {renderSidebar}
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default WebRooutes;
