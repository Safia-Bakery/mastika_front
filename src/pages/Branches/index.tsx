import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import TableViewBtn from "src/components/TableViewBtn";
import Header from "src/components/Header";
import BranchFilter from "./filter";
import EmptyList from "src/components/EmptyList";
import useBranches from "src/hooks/useBranches";
import useQueryString from "src/hooks/useQueryString";
import { handleIdx } from "src/utils/helpers";
import Loading from "src/components/Loader";
import { BranchType } from "src/utils/types";

const column = [
  { name: "№", key: "" },
  { name: "Наименование", key: "name" },
  { name: "Отдел", key: "department" },
  { name: "Статус", key: "status" },
  { name: "", key: "" },
];

const Branches = () => {
  const navigate = useNavigate();
  const currentPage = Number(useQueryString("page")) || 1;
  const { data: branches, isFetching } = useBranches({ page: currentPage });
  const [sort, $sort] = useState<BranchType[]>();

  const handleNavigate = (url: string) => navigate(url);
  return (
    <>
      <BranchFilter />

      <Card>
        <Header title="Филиалы"></Header>
        <div className="content">
          <div className="table-responsive grid-view">
            <table className="table table-hover">
              <TableHead
                column={column}
                onSort={(data) => $sort(data)}
                data={branches?.items}
              />

              <tbody>
                {!!branches?.items?.length &&
                  !isFetching &&
                  (sort?.length ? sort : branches?.items).map((branch, idx) => (
                    <tr key={idx} className="bg-blue">
                      <td className="first:pl-16" width="40">
                        {handleIdx(idx)}
                      </td>
                      <td className="text-center">{branch.name}</td>
                      <td className="text-center">{branch.is_fabrica}</td>
                      <td className="text-center">
                        {!!branch?.status ? "Активный" : "Неактивный"}
                      </td>
                      <td className="text-center" width={40}>
                        <TableViewBtn
                          onClick={() => handleNavigate(`${branch.id}`)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {isFetching && <Loading className="py-4" />}

            {!branches?.items?.length && !isFetching && <EmptyList />}
            {!!branches && <Pagination totalPages={branches.pages} />}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Branches;
