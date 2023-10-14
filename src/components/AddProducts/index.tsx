import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Typography, { TextSize } from "../Typography";
import Button from "../Button";
import Modal from "../Modal";
import MainInput from "../BaseInputs/MainInput";
import useProductGroup from "src/hooks/useProductGroup";
import useQueryString from "src/hooks/useQueryString";
import useProducts from "src/hooks/useProducts";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useDebounce from "src/hooks/useDebounce";
import { CartItems, ProductType } from "src/utils/types";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import {
  addToCart,
  decrement,
  increment,
  itemsSelector,
  selectItem,
  selectedItemsSelector,
} from "src/redux/reducers/cart";

const group = [
  { id: "768798", name: "string", code: "string", status: 1 },
  { id: "8787", name: "string1", code: "string", status: 1 },
  { id: "876572", name: "string2", code: "string", status: 1 },
];

const product: ProductType[] = [
  {
    id: "768798",
    name: "string",
    status: 1,
    group_id: "1",
    price: 10000,
    productType: "swsw",
  },
  {
    id: "8787",
    name: "string1",
    status: 1,
    group_id: "1",
    price: 10000,
    productType: "swsw",
  },
  {
    id: "876572",
    name: "string2",
    status: 1,
    group_id: "1",
    price: 10000,
    productType: "swsw",
  },
];

const AddProduct = () => {
  const navigate = useNavigateParams();
  const group_id = useQueryString("group_id");
  const [name, $name] = useDebounce("");
  const [cart, $cart] = useState<CartItems[]>([]);
  const removeParam = useRemoveParams();
  const modal = useQueryString("productModal");
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);

  const selected = useAppSelector(selectedItemsSelector);

  console.log(selected, "selected");

  // const { data: group } = useProductGroup({
  //   enabled: !group_id,
  //   ...(name && { name }),
  // });
  // const { data: product } = useProducts({
  //   enabled: !!group_id,
  //   group_id: group_id!,
  //   ...(name && { name }),
  // });

  useEffect(() => {
    if (product.length > 0) dispatch(addToCart(product));
  }, [product]);

  const handleModal = () =>
    removeParam(["productModal", "group_id", "product_id"]);
  const handleNavigate = (url: object) => navigate(url);
  const handleName = (e: ChangeEvent<HTMLInputElement>) =>
    $name(e.target.value);

  const renderModal = useMemo(() => {
    if (group_id && !!items.length)
      return (
        <div className="mt-4 max-h-96 h-full overflow-y-auto flex flex-wrap w-full">
          {!!items?.length &&
            items?.map((item, idx) => (
              <div
                key={item.id}
                className="flex-col bg-mainGray p-4 border rounded w-[50%]"
              >
                <Typography>{item.name}</Typography>

                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="cursor-pointer"
                      onClick={() => dispatch(decrement(idx))}
                    >
                      -
                    </div>
                    <div className="">{item.count}</div>
                    <div
                      className="cursor-pointer"
                      onClick={() => dispatch(increment(idx))}
                    >
                      +
                    </div>
                  </div>
                  <Button
                    className="bg-darkBlue mt-4 !w-24 text-white text-sm"
                    type="button"
                    onClick={() => dispatch(selectItem(item))}
                  >
                    Добавить
                  </Button>
                </div>
                {/* <img
                  src="/assets/icons/folder.svg"
                  alt="file-img"
                  height={35}
                  width={35}
                />
                <span className="text-xl text-darkBlue underline">
                  {item.name}
                </span> */}
              </div>
            ))}
        </div>
      );
    else
      return (
        <div className="mt-4  max-h-96 h-full overflow-y-auto">
          {!!group?.length &&
            group?.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-2 gap-2 cursor-pointer "
                onClick={() => handleNavigate({ group_id: item.id })}
              >
                <img
                  src="/assets/icons/folder.svg"
                  alt="file-img"
                  height={35}
                  width={35}
                />
                <span className="text-xl text-darkBlue underline">
                  {item.name}
                </span>
              </div>
            ))}
        </div>
      );
  }, [group_id, group, product, items]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography size={TextSize.XXL}>Товары</Typography>
        <Button
          className="bg-darkBlue mt-4 w-64 text-white"
          type="button"
          onClick={() => handleNavigate({ productModal: 1 })}
        >
          Добавить блюдо
        </Button>
      </div>
      <Modal
        isOpen={!!modal}
        onClose={handleModal}
        className="!w-[815px] max-w-none"
      >
        <div className="rounded-md bg-white p-4">
          <Typography size={TextSize.XXL}>Товары</Typography>

          <MainInput
            placeholder={"Поиск продукции"}
            onChange={handleName}
            className="mt-3"
          />
          {renderModal}
        </div>
      </Modal>
    </div>
  );
};

export default AddProduct;
