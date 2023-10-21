import { TextSize } from "src/components/Typography";
import Texts from "../Texts";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useDebounce from "src/hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
import useBranches from "src/hooks/useBranches";
import { BranchJsonType, BranchesType } from "src/utils/types";
import useQueryString from "src/hooks/useQueryString";
import cl from "classnames";
import useUpdateEffect from "src/hooks/useUpdateEffect";
import useInfiniteScroll from "src/hooks/useInfiniteScroll";

const TgBranchSelect = () => {
  const navigate = useNavigateParams();
  const removeParam = useRemoveParams();
  const [query, $query] = useDebounce("");
  const [search, $search] = useState("");
  const [page, $page] = useState(1);
  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const { data, isFetching, isLoading, refetch } = useBranches({
    page,
    ...(!!query && { name: query }),
    enabled: true,
  });

  const [items, $items] = useState<BranchesType["items"]>([]);
  const lastBookElementRef = useInfiniteScroll({
    isLoading: isLoading || isFetching,
    data,
    page,
    $page,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    $query(e.target.value);
    $search(e.target.value);
    $page(1);
  };

  const close = () => {
    removeParam(["branch", "modal"]);
    $search("");
  };

  useEffect(() => {
    if (branch?.name) {
      $search(branch.name);
    }
  }, [branch?.name]);

  useUpdateEffect(() => {
    refetch();
  }, [query]);

  const handleProduct = (product: BranchJsonType) => {
    navigate({
      branch: JSON.stringify(product),
      modal: 0,
    });
  };

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
      <div className="relative">
        <div
          onClick={close}
          className="rounded-full h-5 w-5 bg-[#C3D2DC] flex items-center justify-center absolute top-[50%] -translate-y-[50%]"
        >
          <img
            height={7}
            width={7}
            src="/assets/icons/backArrow.svg"
            alt="backArrow"
          />
        </div>
        <Texts size={TextSize.XL} uppercase alignCenter>
          ВЫБЕРИТЕ ФИЛИАЛ
        </Texts>
      </div>

      <MainInput
        inputStyle={InputStyle.white}
        className="border rounded-xl border-tgBorder mt-3"
        placeholder="Поиск"
        onChange={handleSearch}
        value={search}
      />

      <div className={"max-h-80 h-full  overflow-y-auto"}>
        <ul className={cl("rounded overflow-y-auto")}>
          {items?.map((item, idx) => {
            if (items.length === idx + 1 && !query)
              return (
                <li
                  key={item.id}
                  ref={lastBookElementRef}
                  onClick={() =>
                    handleProduct({ id: item.id, name: item.name })
                  }
                  className={cl("p-2 bg-white border-b border-b-tgBorder")}
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
                  className={cl("p-2 bg-white border-b border-b-tgBorder")}
                >
                  {item.name}
                </li>
              );
          })}
        </ul>
      </div>
    </>
  );
};

export default TgBranchSelect;
