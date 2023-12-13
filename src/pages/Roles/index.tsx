import Card from "src/components/Card";
import Header from "src/components/Header";
import { Link, useNavigate } from "react-router-dom";

import Loading from "src/components/Loader";
import { useEffect, useState } from "react";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useRoles from "src/hooks/useRoles";
import { MainPermissions, RoleTypes } from "src/utils/types";
import useToken from "src/hooks/useToken";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "", key: "" },
];

const Roles = () => {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);
  const { data } = useToken({});
  const perms = data?.permissions;

  const { data: roles, isLoading, refetch } = useRoles({ enabled: false });
  const [sort, $sort] = useState<RoleTypes[]>();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loading absolute />;

  return (
    <Card>
      <Header title="Роли">
        {perms?.[MainPermissions.add_roles] && (
          <Button
            className="bg-yellow"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => navigate("add")}
          >
            Создать
          </Button>
        )}
      </Header>
      <div className="table-responsive grid-view content">
        <table className="table table-hover">
          <TableHead
            column={column}
            onSort={(data) => $sort(data)}
            data={roles}
          />

          {!!roles?.length && (
            <tbody>
              {(sort?.length ? sort : roles)?.map((role, idx) => (
                <tr className="bg-blue" key={idx}>
                  <td className="first:pl-16" width="40">
                    {idx + 1}
                  </td>
                  <td>
                    <Link to={`/roles/${role.id}`}>{role.name}</Link>
                  </td>
                  {/* <td>{true ? "Не активный" : "Активный"}</td> */}
                  <td width={40}>
                    {perms?.[MainPermissions.edit_roles] && (
                      <TableViewBtn
                        onClick={handleNavigate(`edit/${role.id}`)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Card>
  );
};

export default Roles;
