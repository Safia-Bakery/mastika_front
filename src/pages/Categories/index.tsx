import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Header from "src/components/Header";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useCategories from "src/hooks/useCategories";
import useQueryString from "src/hooks/useQueryString";
import EmptyList from "src/components/EmptyList";
import categorySyncMutation from "src/hooks/mutation/categorySync";
import Loading from "src/components/Loader";

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

  const { mutate: syncIIco, isLoading: synLoading } = categorySyncMutation();

  const { data: categories, refetch, isLoading } = useCategories({});

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

  const handleSync = () => syncIIco();

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  if (synLoading) return <Loading absolute />;

  return (
    <>
      {/* <CategoriesFilter /> */}

      <Card className="mt-8">
        <Header title="Категории">
          <div className="flex gap-3">
            <Button
              className="bg-blue-400 ml-2 w-24"
              textClassName="text-white"
              textSize={TextSize.L}
              mainIcon="/assets/icons/sync.svg"
              onClick={handleSync}
            >
              Update
            </Button>
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
                          onClick={() => handleNavigate(`${category.id}/edit`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {isLoading && <Loading />}
            {!categories?.length && !isLoading && <EmptyList />}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Categories;
