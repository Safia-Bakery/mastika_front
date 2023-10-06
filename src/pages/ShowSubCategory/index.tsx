import Card from "src/components/Card";
import Header from "src/components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loading from "src/components/Loader";
import { useState } from "react";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const ShowSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleNavigate = (route: string) => () => navigate(route);

  const roles: any[] = [];
  const orderLoading = false;

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

  if (orderLoading) return <Loading />;

  return (
    // <div className="flex flex-col justify-end mr-4">
    <Card>
      <Header title="Бенто">
        <div className="flex gap-2">
          <Button
            className="bg-yellow"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={handleNavigate(`/categories/${id}/addsub`)}
          >
            Создать
          </Button>
        </div>
      </Header>
      <div className="table-responsive grid-view content">
        <table className="table table-hover">
          <TableHead
            column={column}
            sort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />

          <tbody>
            {[...Array(4)]?.map((role, idx) => (
              <tr className="bg-blue" key={idx}>
                <td className="first:pl-16" width="40">
                  {idx + 1}
                </td>
                <td>
                  {/* <Link to={`${idx + 1}`} className="text-sky-600"> */}
                  {idx % 2 ? "Мастика" : "Песочный"}
                  {/* </Link> */}
                </td>
                <td>{false ? "Не активный" : "Активный"}</td>
                <td width={40}>
                  <TableViewBtn
                    onClick={handleNavigate(`/categories/${id}/editsub/${idx}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {!roles?.length && !orderLoading && (
          <div className="w-100">
            <p className="text-center w-100">Спосок пуст</p>
          </div>
        )} */}
      </div>
    </Card>
  );
};

export default ShowSubCategory;
