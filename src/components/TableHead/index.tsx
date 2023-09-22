import { FC, PropsWithChildren } from "react";

import styles from "./index.module.scss";
import Typography, { TextSize, Weight } from "../Typography";

interface Props extends PropsWithChildren {
  column: { name: string; key: any }[];
  sort: (key: any) => void;
  sortKey: any;
  sortOrder: "asc" | "desc";
}

const TableHead: FC<Props> = ({
  column,
  sort,
  sortKey,
  sortOrder,
  children,
}) => {
  return (
    <>
      <thead className="w-full border-b-mainGray border-b-2">
        <tr className={styles.row}>
          {column.map(({ name, key }) => {
            return (
              <th onClick={() => sort(key)} key={name}>
                <Typography size={TextSize.L} weight={Weight.medium}>
                  {name} {sortKey === key && (sortOrder === "asc" ? "▲" : "▼")}
                </Typography>
              </th>
            );
          })}
        </tr>
        {children && <tr>{children}</tr>}
      </thead>
    </>
  );
};

export default TableHead;
