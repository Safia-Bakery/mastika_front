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
import { itemsPerPage } from "src/utils/helpers";
import Loading from "src/components/Loader";

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

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState();

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleIdx = (index: number) => {
    if (currentPage === 1) return index + 1;
    else return index + 1 + itemsPerPage * (currentPage - 1);
  };

  const handleNavigate = (url: string) => navigate(url);
  return (
    <>
      <BranchFilter />

      <Card>
        <Header title="Филиалы">
          {/* <Button
            className="bg-yellow ml-2 w-24"
            textClassName="text-black"
            textSize={TextSize.L}
            onClick={() => handleNavigate("add")}
          >
            Создать
          </Button> */}
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

              <tbody>
                {!!branches?.items?.length &&
                  !isFetching &&
                  branches.items.map((branch, idx) => (
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
            {!!branches && (
              <Pagination className="ml-8 mt-4" totalPages={branches.pages} />
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Branches;
