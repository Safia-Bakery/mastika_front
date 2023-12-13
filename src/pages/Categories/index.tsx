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
import Loading from "src/components/Loader";
import { CategoryTypes, MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";

const column = [
  { name: "№", key: "" },
  { name: "Категория", key: "name" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Categories = () => {
  const navigate = useNavigate();
  const update = useQueryString("update");
  const { data } = useToken({});
  const perms = data?.permissions;
  const [sort, $sort] = useState<CategoryTypes[]>();
  const { data: categories, refetch, isLoading } = useCategories({});

  const handleNavigate = (url: string) => navigate(url);

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  return (
    <Card className="mt-8">
      <Header title="Категории">
        <div className="flex gap-3">
          {perms?.[MainPermissions.add_categories] && (
            <Button
              className="bg-yellow ml-2 w-24"
              textClassName="text-black"
              textSize={TextSize.L}
              onClick={() => handleNavigate("add")}
            >
              Создать
            </Button>
          )}
        </div>
      </Header>
      <div className="content">
        <div className="table-responsive grid-view">
          <table className="table table-hover">
            <TableHead
              column={column}
              onSort={(data) => $sort(data)}
              data={categories}
            />

            {!!categories?.length && (
              <tbody>
                {(sort?.length ? sort : categories)?.map((category, idx) => (
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
                      {perms?.[MainPermissions.edit_categories] && (
                        <TableViewBtn
                          onClick={() => handleNavigate(`${category.id}/edit`)}
                        />
                      )}
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
  );
};

export default Categories;
