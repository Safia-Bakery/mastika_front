import React, { ChangeEvent, useMemo, useState } from "react";
import Typography, { TextSize } from "../Typography";
import Button from "../Button";
import Modal from "../Modal";
import MainInput from "../BaseInputs/MainInput";
import useProductGroup from "src/hooks/UseProductGroup";
import useQueryString from "src/hooks/useQueryString";
import useProducts from "src/hooks/useProducts";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useDebounce from "src/hooks/useDebounce";
import { CartItems } from "src/utils/types";

const AddProduct = () => {
  const navigate = useNavigateParams();
  const group_id = useQueryString("group_id");
  const [name, $name] = useDebounce("");
  const [cart, $cart] = useState<CartItems[]>([]);
  const removeParam = useRemoveParams();
  const modal = useQueryString("productModal");

  const { data: group } = useProductGroup({
    enabled: !group_id,
    ...(name && { name }),
  });
  const { data: product } = useProducts({
    enabled: !!group_id,
    group_id: group_id!,
    ...(name && { name }),
  });

  const handleModal = () =>
    removeParam(["productModal", "group_id", "product_id"]);
  const handleNavigate = (url: object) => navigate(url);
  const handleName = (e: ChangeEvent<HTMLInputElement>) =>
    $name(e.target.value);

  const renderModal = useMemo(() => {
    if (group_id)
      return (
        <div className="mt-4 max-h-96 h-full overflow-y-auto flex flex-wrap w-full">
          {!!product?.length &&
            product?.map((item) => (
              <div
                key={item.id}
                className="flex-col bg-mainGray p-4 border rounded w-[50%]"
              >
                <Typography>{item.name}</Typography>

                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div className="cursor-pointer">-</div>
                    <div className="">{2}</div>
                    <div className="cursor-pointer">+</div>
                  </div>
                  <Button
                    className="bg-darkBlue mt-4 !w-24 text-white text-sm"
                    type="button"
                    onClick={() => handleNavigate({ product_id: item.id })}
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
  }, [group_id, group, product]);

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
