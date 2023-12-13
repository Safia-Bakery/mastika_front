import { useFillings } from "src/hooks/useFillings";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Header from "src/components/Header";
import Button from "src/components/Button";
import { TextSize } from "src/components/Typography";
import useQueryString from "src/hooks/useQueryString";
import EmptyList from "src/components/EmptyList";
import Loading from "src/components/Loader";
import { FillingTypes, MainPermissions } from "src/utils/types";
import useToken from "src/hooks/useToken";
import { getFillingType } from "src/utils/helpers";

const column = [
  { name: "№", key: "" },
  { name: "Категория", key: "name" },
  { name: "тип", key: "ptype" },
  { name: "", key: "" },
];

const Fillings = () => {
  const { data: fillings, refetch, isLoading } = useFillings({});

  const navigate = useNavigate();
  const update = useQueryString("update");
  const { data } = useToken({});
  const perms = data?.permissions;
  const [sort, $sort] = useState<FillingTypes[]>();

  const handleNavigate = (url: string) => navigate(url);

  useEffect(() => {
    if (update) refetch();
  }, [update]);

  return (
    <Card className="mt-8">
      <Header title="Начинки">
        <div className="flex gap-3">
          {perms?.[MainPermissions.filling] && (
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
          {/* <ItemsCount data={categories} /> */}
          <table className="table table-hover">
            <TableHead
              column={column}
              onSort={(data) => $sort(data)}
              data={fillings}
            />

            {!!fillings?.length && (
              <tbody>
                {(sort?.length ? sort : fillings)?.map((filling, idx) => (
                  <tr key={idx} className="bg-blue">
                    <td className="first:pl-16" width="40">
                      {idx + 1}
                    </td>
                    <td className="text-center">{filling?.name}</td>
                    <td className="text-center">
                      {getFillingType(filling.ptype)?.name}
                    </td>
                    <td className="text-center" width={40}>
                      {perms?.[MainPermissions.filling] && (
                        <TableViewBtn
                          onClick={() => handleNavigate(`${filling.id}`)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {isLoading && <Loading />}
          {!fillings?.length && !isLoading && <EmptyList />}
        </div>
      </div>
    </Card>
  );
};

export default Fillings;
