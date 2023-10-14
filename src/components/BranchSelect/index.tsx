import { ChangeEvent, FC, useCallback, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { useState } from "react";
import BaseInput from "../BaseInputs";
import MainInput from "../BaseInputs/MainInput";
import useDebounce from "src/hooks/useDebounce";
import cl from "classnames";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
// import useBranches from "src/hooks/useBranches";
import useQueryString from "src/hooks/useQueryString";
import { BranchJsonType, BranchesType } from "src/utils/types";
import useBranches from "src/hooks/useBranches";

interface Props {
  origin?: number;
  enabled?: boolean;
  label?: string;
}

const BranchSelect: FC<Props> = ({ origin = 0, enabled, label }) => {
  const navigate = useNavigateParams();
  const removeParam = useRemoveParams();
  const initialLoadRef = useRef(true);
  const [query, $query] = useDebounce("");
  const [search, $search] = useState("");
  const [page, $page] = useState(1);
  const [focused, $focused] = useState(false);

  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const { data, isFetching, isLoading } = useBranches({});

  // const { data, refetch, isFetching, isLoading } = useBranches({
  //   origin,
  //   page,
  //   enabled,
  //   ...(!!query && { body: { name: query } }),
  // });
  const [items, $items] = useState<BranchesType["items"]>([]);
  const observer: any = useRef();
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (isFetching || isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.pages && data?.pages >= page) {
          $page((prev) => prev + 1);
          // refetch();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, isLoading]
  );

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
    removeParam(["branch", "choose_fillial"]);
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
    // if (!enabled) refetch();
    $focused(true);
  };

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    const fetchData = async () => {
      // await refetch();
    };

    fetchData();
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
            onChange={handleSearch}
            value={search}
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
                    ref={lastBookElementRef}
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
