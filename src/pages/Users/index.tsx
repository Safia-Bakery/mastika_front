import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Container from "src/components/Container";
import Loading from "src/components/Loader";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import UsersFilter from "./filter";
import Header from "src/components/Header";

import { TextSize } from "src/components/Typography";
import Button from "src/components/Button";

const column = [
  { name: "№", key: "" },
  { name: "ФИО", key: "full_name" },
  { name: "Логин", key: "username" },
  { name: "Роль", key: "group.name" },
  { name: "Телефон", key: "phone_number" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Users = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState();

  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  return (
    <Container>
      <UsersFilter />
      <Card>
        <Header title="Пользователи">
          <Button
            className="bg-yellow ml-2 w-24"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={handleNavigate("add")}
          >
            Создать
          </Button>
        </Header>
        <table>
          <TableHead
            column={column}
            sort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />

          <tbody>
            {
              // !!users?.items?.length &&
              //   !orderLoading &&
              //   (sortData()?.length ? sortData() : users?.items)
              //     ?.filter((user) => user.status !== 1)
              [...Array(4)].map((user, idx) => (
                <tr className="bg-blue hover:bg-gray-200 py-2" key={idx}>
                  <td width="40" className="first:pl-16">
                    {idx + 1}
                  </td>
                  <td className="text-center">{"user?.full_name"}</td>
                  <td className="text-center">
                    <span className="not-set">{"user?.username"}</span>
                  </td>
                  <td className="text-center" width={250}>
                    {"user?.group?.name"}
                  </td>
                  <td className="text-center">{"user?.phone_number"}</td>
                  <td className="text-center">{"user?.status"}</td>
                  <td className="text-center" width={40}>
                    <TableViewBtn onClick={handleNavigate(`${user?.id}`)} />
                  </td>
                </tr>
              ))
            }
            {false && (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </Container>
  );
};

export default Users;
