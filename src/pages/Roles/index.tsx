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

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "", key: "" },
];

const Roles = () => {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);

  const { data: roles, isLoading, refetch } = useRoles({ enabled: false });

  const [sortKey, setSortKey] = useState();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortData = () => {
    if (roles && sortKey) {
      const sortedData = [...roles].sort((a, b) => {
        if (a[sortKey]! < b[sortKey]!) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey]! > b[sortKey]!) return sortOrder === "asc" ? 1 : -1;
        else return 0;
      });
      return sortedData;
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loading absolute />;

  return (
    // <div className="flex flex-col justify-end mr-4">
    <Card>
      <Header title="Роли">
        <Button
          className="bg-yellow"
          textClassName="text-black"
          textSize={TextSize.L}
          onClick={() => navigate("add")}
        >
          Создать
        </Button>
      </Header>
      <div className="table-responsive grid-view content">
        <table className="table table-hover">
          <TableHead
            column={column}
            sort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />

          {!!roles?.length && (
            <tbody>
              {(sortData()?.length ? sortData() : roles)?.map((role, idx) => (
                <tr className="bg-blue" key={idx}>
                  <td className="first:pl-16" width="40">
                    {idx + 1}
                  </td>
                  <td>
                    <Link to={`/roles/${role.id}`}>{role.name}</Link>
                  </td>
                  {/* <td>{true ? "Не активный" : "Активный"}</td> */}
                  <td width={40}>
                    <TableViewBtn onClick={handleNavigate(`edit/${role.id}`)} />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {/* {!roles?.length && !orderLoading && (
          <EmptyList />
        )} */}
      </div>
    </Card>
  );
};

export default Roles;
