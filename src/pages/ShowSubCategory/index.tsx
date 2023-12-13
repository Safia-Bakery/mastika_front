import Card from "src/components/Card";
import Header from "src/components/Header";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "src/components/Loader";
import { FC, useEffect, useState } from "react";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useCategories from "src/hooks/useCategories";
import useSubCategories from "src/hooks/useSubCategories";
import useQueryString from "src/hooks/useQueryString";
import EmptyList from "src/components/EmptyList";
import { SubCategoryTypes } from "src/utils/types";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const ShowSubCategory: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const update = useQueryString("update");
  const handleNavigate = (route: string) => () => navigate(route);
  const [sort, $sort] = useState<SubCategoryTypes[]>();

  const { data: parent, isLoading: parentLoading } = useCategories({
    id: Number(id),
  });
  const parentCategry = parent?.[0];

  const { data, isLoading, refetch } = useSubCategories({
    category_id: Number(id),
    // child,
  });

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  if (isLoading || parentLoading) return <Loading absolute />;

  return (
    <Card>
      <Header title={parentCategry?.name}>
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
            onSort={(data) => $sort(data)}
            data={data}
          />

          <tbody>
            {(sort?.length ? sort : data)?.map((sub, idx) => (
              <tr className="bg-blue" key={idx}>
                <td className="first:pl-16" width="40">
                  {idx + 1}
                </td>
                <td>{sub.name}</td>
                <td>
                  {sub.subcategory_vs_category.status
                    ? "Активный"
                    : "Не активный"}
                </td>
                <td width={40}>
                  <TableViewBtn
                    onClick={handleNavigate(
                      `/categories/${id}/editsub/${sub.id}`
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data?.length && !isLoading && <EmptyList />}
      </div>
    </Card>
  );
};

export default ShowSubCategory;
