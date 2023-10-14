import Container from "src/components/Container";
import OrdersFilter from "./filter";
import { useState } from "react";
import TableHead from "src/components/TableHead";
import styles from "./index.module.scss";
import dayjs from "dayjs";
import Typography, { TextSize } from "src/components/Typography";
import Card from "src/components/Card";
import { Link } from "react-router-dom";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import EmptyList from "src/components/EmptyList";
import useOrders from "src/hooks/useOrders";

const column = [
  { name: "Все заявки", key: "" },
  { name: "Сфера", key: "id" },
  { name: "Дата поступления", key: "type" },
  { name: "Тип", key: "fillial.name" },
  { name: "Филиал", key: "category.name" },
  { name: "Статус", key: "" },
];

const Orders = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState();

  const { data: orders } = useOrders({});

  const handleSort = (key: any) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  // const sortData = useMemo(() => {
  //   if (branches?.items && sortKey) {
  //     return [...branches?.items].sort((a, b) => {
  //       if (a[sortKey]! < b[sortKey]!) return sortOrder === "asc" ? -1 : 1;
  //       if (a[sortKey]! > b[sortKey]!) return sortOrder === "asc" ? 1 : -1;
  //       else return 0;
  //     });
  //   }
  //   return [];
  // }, [branches?.items, sortKey, sortOrder]);

  return (
    <Container>
      <OrdersFilter />
      <Card>
        <table>
          <TableHead
            column={column}
            sort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />

          <tbody className={styles.tableBody}>
            {/* {(sortData?.length ? sortData : branches.items)?.map( */}
            {orders?.items?.map((order, idx) => (
              <tr key={idx} className="bg-blue border-b-mainGray border-b-2">
                <td className="text-start">
                  <Link to={`${order.id}`}>№ {order.id}</Link>
                  <div className="flex gap-2 mt-2">
                    <div className="flex items-center">
                      <img src="/assets/icons/tg.svg" alt="order-image" />
                      <Typography className="ml-1" size={TextSize.XS}>
                        Telegram Bot
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <img src="/assets/icons/users.svg" alt="users" />
                      <Typography className="ml-1" size={TextSize.XS}>
                        {order?.order_user}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td>Бенто</td>
                <td>{dayjs(order?.created_at).format("DD.MM.YYYY HH:mm")}</td>
                <td>
                  {!!order.is_delivery ? (
                    <img
                      className="m-auto"
                      src="/assets/icons/car.svg"
                      alt="type-img"
                    />
                  ) : (
                    <img
                      className="m-auto"
                      src="/assets/icons/marker.svg"
                      alt="type-img"
                    />
                  )}
                </td>
                <td>{order?.order_br?.name}</td>
                <td>
                  {!order?.order_vs_user?.status ? "Не активный" : "Активный"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {false && <Loading className="py-4" />}
        {false && <EmptyList />}

        {false && <Pagination totalPages={1} />}
      </Card>
    </Container>
  );
};

export default Orders;
