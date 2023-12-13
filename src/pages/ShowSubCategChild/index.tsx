import Card from "src/components/Card";
import Header from "src/components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loading from "src/components/Loader";
import { FC, useEffect, useState } from "react";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useSubCategories from "src/hooks/useSubCategories";
import useQueryString from "src/hooks/useQueryString";
import EmptyList from "src/components/EmptyList";
import useSubCategsChild from "src/hooks/useSubCategsChild";
import { SubCategoryChildTypes } from "src/utils/types";

const column = [
  { name: "№", key: "" },
  { name: "Название", key: "name" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const ShowSubCategChild: FC = () => {
  const { id, subid } = useParams();
  const navigate = useNavigate();
  const update = useQueryString("update");
  const handleNavigate = (route: string) => () => navigate(route);

  const { data, isFetching: childLoading } = useSubCategsChild({
    selval_id: Number(subid),
  });

  const {
    data: parent,
    isLoading,
    refetch,
  } = useSubCategories({
    id: Number(subid),
  });
  const parentCategry = parent?.[0];

  const orderLoading = false;
  const [sort, $sort] = useState<SubCategoryChildTypes[]>();

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  if (orderLoading || childLoading) return <Loading />;

  return (
    // <div className="flex flex-col justify-end mr-4">
    <Card>
      <Header title={parentCategry?.name}>
        <div className="flex gap-2">
          <Button
            className="bg-yellow"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={handleNavigate(`/categories/${id}/${subid}/add`)}
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
                <td>
                  <Link
                    to={`/categories/${id}/${sub.id}/show`}
                    className="text-sky-600"
                  >
                    {sub?.content}
                  </Link>
                </td>
                <td>{sub?.value ? "Активный" : "Не активный"}</td>
                <td width={40}>
                  <TableViewBtn
                    onClick={handleNavigate(
                      `/categories/${id}/${subid}/${sub?.id}/edit`
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data?.length && !isLoading && <EmptyList />}
        {/* {!isLoading && (
          <div className="w-100 my-4">
            <Loading />
          </div>
        )} */}
      </div>
    </Card>
  );
};

export default ShowSubCategChild;
