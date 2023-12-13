import { FC, PropsWithChildren, useCallback, useState } from "react";

import styles from "./index.module.scss";
import Typography, { TextSize, Weight } from "../Typography";
import useUpdateEffect from "src/hooks/useUpdateEffect";

interface Props extends PropsWithChildren {
  column: { name: string; key: any }[];
  data?: any[];
  onSort?: (arg: any[] | undefined) => void;
}

const TableHead: FC<Props> = ({ column, children, data, onSort }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState();

  const handleSort = (key: any) => () => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortData = useCallback(() => {
    if (data && sortKey) {
      const sortedData = [...data].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
        else return 0;
      });
      return onSort?.(sortedData);
    }
  }, [sortKey, sortOrder]);

  useUpdateEffect(() => {
    sortData();
  }, [sortKey, sortOrder]);
  return (
    <>
      <thead className="w-full border-b-mainGray border-b-2">
        <tr className={styles.row}>
          {column.map(({ name, key }) => {
            return (
              <th onClick={handleSort(key)} key={name}>
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
