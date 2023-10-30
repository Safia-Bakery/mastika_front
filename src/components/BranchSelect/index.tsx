import { ChangeEvent, FC, useEffect } from "react";
import styles from "./index.module.scss";
import { useState } from "react";
import BaseInput from "../BaseInputs";
import MainInput, { InputStyle } from "../BaseInputs/MainInput";
import useDebounce from "src/hooks/useDebounce";
import cl from "classnames";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { BranchJsonType, BranchesType } from "src/utils/types";
import useBranches from "src/hooks/useBranches";
import useUpdateEffect from "src/hooks/useUpdateEffect";
import useInfiniteScroll from "src/hooks/useInfiniteScroll";

interface Props {
  label?: string;
  inputStyle?: InputStyle;
  enabled?: boolean;
}

const BranchSelect: FC<Props> = ({ label, inputStyle, enabled }) => {
  const navigate = useNavigateParams();
  const removeParam = useRemoveParams();
  const [query, $query] = useDebounce("");
  const [search, $search] = useState("");
  const [page, $page] = useState(1);
  const [focused, $focused] = useState(false);

  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const { data, isFetching, refetch, isLoading } = useBranches({
    enabled,
    page,
    ...(!!query && { body: { name: query } }),
  });

  const [items, $items] = useState<BranchesType["items"]>([]);
  const lastItem = useInfiniteScroll({
    isLoading: isFetching || isLoading,
    data,
    page,
    $page,
  });

  const onClose = () => {
    $focused(false);
    removeParam(["choose_fillial"]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    $query(e.target.value);
    $search(e.target.value);
    $page(1);
  };

  const close = () => {
    removeParam(["branch"]);
    $search("");
    $focused(false);
  };

  useEffect(() => {
    if (branch?.name) {
      $search(branch.name);
    }
  }, [branch?.name]);

  const handleProduct = (product: BranchJsonType) => {
    navigate({ branch: JSON.stringify(product), choose_fillial: false });
    $focused(false);
  };

  const handleFocus = () => {
    if (!enabled) refetch();
    $focused(true);
  };

  useUpdateEffect(() => {
    refetch();
  }, [query]);

  useEffect(() => {
    if (data?.items.length) {
      $items((prev) => [...prev, ...data?.items]);
    }
    if (!!query && data?.items) {
      $items(data?.items);
    }
  }, [data?.items]);

  return (
    <>
      {focused && <div className={styles.overlay} onClick={onClose} />}
      <div className={styles.drop}>
        <BaseInput label={label} className="mb-0 relative">
          {focused && (
            <img
              onClick={close}
              src="/assets/icons/clear.svg"
              alt="clear"
              width={15}
              height={15}
              className={styles.close}
            />
          )}
          <MainInput
            inputStyle={inputStyle}
            onChange={handleSearch}
            value={search}
            placeholder={"Филиал"}
            onFocus={handleFocus}
          />
        </BaseInput>
        {focused && (
          <ul className={cl("list-group", styles.list)}>
            {items?.map((item, idx) => {
              if (items.length === idx + 1 && !query)
                return (
                  <li
                    key={item.id}
                    ref={lastItem}
                    onClick={() =>
                      handleProduct({ id: item.id, name: item.name })
                    }
                    className={cl("p-2 bg-gray-300 hover:bg-gray-400")}
                  >
                    {item.name}
                  </li>
                );
              else
                return (
                  <li
                    key={item.id}
                    onClick={() =>
                      handleProduct({ id: item.id, name: item.name })
                    }
                    className={cl("p-2 bg-gray-300 hover:bg-gray-400")}
                  >
                    {item.name}
                  </li>
                );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default BranchSelect;
