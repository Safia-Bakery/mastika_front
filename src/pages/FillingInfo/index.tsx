import Card from "src/components/Card";
import Header from "src/components/Header";
import { useNavigate } from "react-router-dom";

import Loading from "src/components/Loader";
import { useState } from "react";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";

const column = [
  { name: "№", key: "" },
  { name: "Этажность", key: "name" },
  { name: "Мин. порция", key: "name" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const FillingInfo = () => {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);

  const roles: any[] = [];
  const orderLoading = false;
  if (orderLoading) return <Loading />;

  return (
    // <div className="flex flex-col justify-end mr-4">
    <Card>
      <Header title="Радуга">
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
          <TableHead column={column} />

          <tbody>
            {[...Array(4)]?.map((role, idx) => (
              <tr className="bg-blue" key={idx}>
                <td className="first:pl-16" width="40">
                  {idx + 1}
                </td>
                <td>2</td>
                <td>9</td>
                <td>{false ? "Не активный" : "Активный"}</td>
                <td width={40}>
                  <TableViewBtn onClick={handleNavigate("1/edit")} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {!roles?.length && !orderLoading && (
          <EmptyList />
        )} */}
      </div>
    </Card>
  );
};

export default FillingInfo;
