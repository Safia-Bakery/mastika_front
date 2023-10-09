import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Header from "src/components/Header";
import BranchFilter from "./filter";
import EmptyList from "src/components/EmptyList";

const column = [
  { name: "№", key: "" },
  { name: "Наименование", key: "name" },
  { name: "Отдел", key: "department" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Branches = () => {
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState();

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleNavigate = (url: string) => navigate(url);
  return (
    <>
      <BranchFilter />

      <Card>
        <Header title="Филиалы">
          {/* <Button
            className="bg-yellow ml-2 w-24"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => handleNavigate("add")}
          >
            Создать
          </Button> */}
        </Header>
        <div className="content">
          <div className="table-responsive grid-view">
            {/* <ItemsCount data={categories} /> */}
            <table className="table table-hover">
              <TableHead
                column={column}
                sort={handleSort}
                sortKey={sortKey}
                sortOrder={sortOrder}
              />

              {/* {!!categories?.items?.length && ( */}
              <tbody>
                {[...Array(4)]?.map((category, idx) => (
                  <tr key={idx} className="bg-blue">
                    <td className="first:pl-16" width="40">
                      {idx + 1}
                    </td>
                    <td className="text-center">{"category?.name"}</td>
                    <td className="text-center">dep</td>
                    <td className="text-center">
                      {!!category?.status ? "Активный" : "Неактивный"}
                    </td>
                    <td className="text-center" width={40}>
                      <TableViewBtn onClick={() => handleNavigate(`${idx}`)} />
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* )} */}
            </table>
            {false && <Pagination totalPages={2} />}
            {false && <EmptyList />}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Branches;
