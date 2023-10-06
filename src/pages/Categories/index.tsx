import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import CategoriesFilter from "./filter";
import Header from "src/components/Header";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useCategories from "src/hooks/useCategories";
import useQueryString from "src/hooks/useQueryString";

const column = [
  { name: "№", key: "" },
  { name: "Категория", key: "name" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Categories = () => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const update = useQueryString("update");

  const { data: categories, refetch } = useCategories({});

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

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  return (
    <>
      {/* <CategoriesFilter /> */}

      <Card className="mt-8">
        <Header title="Категории">
          <Button
            className="bg-yellow ml-2 w-24"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => handleNavigate("add")}
          >
            Создать
          </Button>
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

              {!!categories?.length && (
                <tbody>
                  {categories?.map((category, idx) => (
                    <tr key={idx} className="bg-blue">
                      <td className="first:pl-16" width="40">
                        {idx + 1}
                      </td>
                      <td className="text-center">
                        <Link to={`${category.id}/show`}>{category?.name}</Link>
                      </td>
                      <td className="text-center">
                        {!!category?.status ? "Активный" : "Неактивный"}
                      </td>
                      <td className="text-center" width={40}>
                        <TableViewBtn
                          onClick={() => handleNavigate(`${category.id}`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}

              {}
            </table>
            {!categories?.length && (
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
