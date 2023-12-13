import Container from "src/components/Container";
import OrdersFilter from "./filter";
import { FC, useState } from "react";
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
import { MainPermissions, OrderStatus, OrdersType } from "src/utils/types";
import { orderStatus } from "src/utils/helpers";
import useToken from "src/hooks/useToken";
import useQueryString from "src/hooks/useQueryString";
import cl from "classnames";

interface Props {
  edit: MainPermissions;
  add: MainPermissions;
  status?: OrderStatus;
}

const column = [
  { name: "Все заявки", key: "" },
  { name: "Сфера", key: "id" },
  { name: "Дата поступления", key: "created_at" },
  { name: "Тип", key: "is_delivery" },
  { name: "Филиал / Адрес", key: "category.name" },
  { name: "Статус", key: "status" },
];

const Orders: FC<Props> = ({ edit, add, status }) => {
  const { data } = useToken({});
  const perms = data?.permissions;
  const page = Number(useQueryString("page")) || 1;
  const [sort, $sort] = useState<OrdersType[]>();

  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const sphere = useQueryString("sphere") || undefined;
  const order_status = Number(useQueryString("status"));
  const orderType = useQueryString("orderType") || undefined;
  const created_at = useQueryString("created_at") || undefined;

  const { data: orders, isLoading } = useOrders({
    page,
    sphere,
    status: !!order_status ? order_status : status,
    ...(!!branch?.id && { branch_id: branch?.id }),
    ...(!!orderType && { is_delivery: Number(orderType) }),
    ...(!!created_at && { created_at: dayjs(created_at).format("YYYY-MM-DD") }),
  });

  return (
    <Container>
      <OrdersFilter add={add} />
      <Card>
        <table>
          <TableHead
            column={column}
            onSort={(data) => $sort(data)}
            data={orders?.items}
          />

          <tbody className={styles.tableBody}>
            {!!orders?.items.length &&
              (sort?.length ? sort : orders?.items)?.map((order, idx) => (
                <tr
                  key={idx}
                  className={cl(
                    "border-b-mainGray border-b-2",
                    orderStatus(order.status)?.color
                  )}
                >
                  <td className="text-start">
                    {perms?.[edit] ? (
                      <Link to={`${order.id}?view=1`}>№ {order.id}</Link>
                    ) : (
                      <span>№ {order.id}</span>
                    )}
                    <div className="flex gap-2 mt-2">
                      <div className="flex items-center">
                        {!!order.is_bot ? (
                          <>
                            <img src="/assets/icons/tg.svg" alt="bot-img" />
                            <Typography className="ml-1" size={TextSize.XS}>
                              Телеграм-бот
                            </Typography>
                          </>
                        ) : (
                          <>
                            <img
                              src="/assets/icons/web.svg"
                              width={14}
                              height={14}
                              alt="web-img"
                            />
                            <Typography className="ml-1" size={TextSize.XS}>
                              Веб-сайт
                            </Typography>
                          </>
                        )}
                      </div>
                      <div className="flex items-center">
                        <img src="/assets/icons/users.svg" alt="users" />
                        <Typography className="ml-1" size={TextSize.XS}>
                          {order?.order_user}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>{order?.order_vs_category?.name}</td>
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
                  <td>
                    <div className="text-ellipsis max-w-xs w-full overflow-hidden whitespace-nowrap mx-auto">
                      {order.is_delivery
                        ? order.address
                        : order?.order_br?.branch_dr?.name}
                    </div>
                  </td>
                  <td>{orderStatus(order.status).text}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {isLoading && <Loading className="py-4" />}
        {!isLoading && !orders?.items.length && <EmptyList />}

        {!!orders?.items.length && <Pagination totalPages={orders.pages} />}
      </Card>
    </Container>
  );
};

export default Orders;
