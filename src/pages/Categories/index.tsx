import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import CategoriesFilter from "./filter";

const column = [
  { name: "№", key: "" },
  { name: "Наименование", key: "name" },
  { name: "Отдел", key: "department" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Categories = () => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleNavigate = (url: string) => navigate(url);

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortData = () => {
    // if (categories?.items && sortKey) {
    //   const sortedData = [...categories?.items].sort((a, b) => {
    //     if (a[sortKey]! < b[sortKey]!) return sortOrder === "asc" ? -1 : 1;
    //     if (a[sortKey]! > b[sortKey]!) return sortOrder === "asc" ? 1 : -1;
    //     else return 0;
    //   });
    //   return sortedData;
    // }
  };

  return (
    <>
      <CategoriesFilter />

      <Card title="Категории">
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
            {false && (
              <div className="w-100">
                <p className="text-center w-100 ">Спосок пуст</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Categories;
