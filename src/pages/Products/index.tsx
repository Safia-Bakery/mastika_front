import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Header from "src/components/Header";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useQueryString from "src/hooks/useQueryString";
import EmptyList from "src/components/EmptyList";
import Loading from "src/components/Loader";
import useProducts from "src/hooks/useProducts";

const column = [
  { name: "№", key: "" },
  { name: "Наименование", key: "name" },
  { name: "Цена", key: "price" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Products = () => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const update = useQueryString("update");

  const { data: products, refetch, isLoading } = useProducts({});

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
        <Header title="Товары">
          <div className="flex gap-3">
            <Button
              className="bg-yellow ml-2 w-24"
              textClassName="text-black"
              textSize={TextSize.L}
              onClick={() => handleNavigate("add")}
            >
              Создать
            </Button>
          </div>
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

              {!!products?.length && (
                <tbody>
                  {products?.map((product, idx) => (
                    <tr key={idx} className="bg-blue">
                      <td className="first:pl-16" width="40">
                        {idx + 1}
                      </td>
                      <td className="text-center">{product?.name}</td>
                      <td className="text-center">{product?.price}</td>
                      <td className="text-center">
                        {!!product?.status ? "Активный" : "Неактивный"}
                      </td>
                      <td className="text-center" width={40}>
                        <TableViewBtn onClick={() => null} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {isLoading && <Loading />}
            {!products?.length && !isLoading && <EmptyList />}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Products;
