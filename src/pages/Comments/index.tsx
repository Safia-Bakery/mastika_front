import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import Typography, { TextSize } from "src/components/Typography";

const column = [
  { name: "№", key: "id" },
  { name: "Сотрудник", key: "purchaser" },
  { name: "Заявка", key: "status" },
  { name: "Оценка", key: "status" },
  { name: "Текст", key: "status" },
  { name: "Дата", key: "status" },
];

const Comments = () => {
  const navigate = useNavigate();
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
      <Typography className="my-4 ml-1" size={TextSize.XXL}>
        Отзывы
      </Typography>
      <Card>
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
                    <td className="text-center">dep</td>
                    <td className="text-center">
                      {!!category?.status ? "Активный" : "Неактивный"}
                    </td>
                    <td className="text-center">
                      {dayjs(new Date()).format("DD.MM.YYYY HH:mm")}
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

export default Comments;
