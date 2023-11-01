import { ChangeEvent, useEffect, useMemo } from "react";
import Typography, { TextSize } from "../Typography";
import Button from "../Button";
import Modal from "../Modal";
import MainInput from "../BaseInputs/MainInput";
import useQueryString from "src/hooks/useQueryString";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useDebounce from "src/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import {
  addToCart,
  clearCart,
  decrement,
  decrementSelected,
  increment,
  incrementSelected,
  itemsSelector,
  selectItem,
  selectedItemsSelector,
} from "src/store/reducers/cart";
import cl from "classnames";
import { useForm } from "react-hook-form";
import EmptyList from "../EmptyList";
import CloseIcon from "../CloseIcon";
import useProductGroup from "src/hooks/useProductGroup";
import useProducts from "src/hooks/useProducts";
import orderProducts from "src/hooks/mutation/orderProducts";
import { useParams } from "react-router-dom";
import { successToast } from "src/utils/toast";
import useOrder from "src/hooks/useOrder";
import ProductRow from "./ProductRow";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigateParams();
  const group_id = useQueryString("group_id");
  const [name, $name] = useDebounce("");
  const removeParam = useRemoveParams();
  const modal = useQueryString("productModal");
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);

  const { data, refetch } = useOrder({ id: Number(id), enabled: !!id });
  const order = data?.order?.[0];

  const { mutate } = orderProducts();

  const selected = useAppSelector(selectedItemsSelector);

  const emptySelected = useMemo(() => {
    return Object.keys(selected).length === 0;
  }, [selected]);

  const { register, getValues } = useForm();

  const { data: group } = useProductGroup({
    enabled: !group_id,
    ...(name && { name }),
  });
  const { data: product } = useProducts({
    enabled: !!group_id,
    group_id: group_id!,
    ...(name && { name }),
  });

  useEffect(() => {
    if (!!product?.length) dispatch(addToCart(product));
  }, [product]);

  const closeModal = () =>
    removeParam(["productModal", "group_id", "product_id"]);
  const handleNavigate = (url: object) => navigate(url);
  const handleName = (e: ChangeEvent<HTMLInputElement>) =>
    $name(e.target.value);

  const renderModal = useMemo(() => {
    if (group_id && !!items.length)
      return (
        <div className="mt-4 max-h-96 h-full overflow-y-auto flex flex-wrap w-full">
          {items?.map((item, idx) => (
            <div
              key={item.id}
              className="flex-col bg-mainGray p-4 border rounded w-[50%] relative"
            >
              <div
                className={cl(
                  { ["opacity-[0.5]"]: selected[item.id] },
                  "absolute top-0 bottom-0 z-0 left-0 right-0 rounded bg-darkGray opacity-0 transition"
                )}
              />
              <Typography>{item.name}</Typography>

              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-3 z-10">
                  <div
                    className="cursor-pointer w-8 text-center"
                    onClick={() => dispatch(decrement(idx))}
                  >
                    -
                  </div>
                  <div className="w-8 text-center">{item.count}</div>
                  <div
                    className="cursor-pointer w-8 text-center"
                    onClick={() => dispatch(increment(idx))}
                  >
                    +
                  </div>
                </div>
                <Button
                  className="bg-darkBlue !w-24 text-white text-sm"
                  type="button"
                  onClick={() => dispatch(selectItem(item))}
                >
                  Добавить
                </Button>
              </div>
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
                onClick={() =>
                  handleNavigate({ group_id: item.id, productModal: 1 })
                }
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
  }, [group_id, group, product, items, selected]);

  const reduceVal = useMemo(() => {
    if (!emptySelected) {
      return Object.values(selected).reduce((acc, item) => {
        acc += item.price * item.count;
        return acc;
      }, 0);
    }
  }, [selected]);

  const renderTable = useMemo(() => {
    return (
      <tbody>
        {Object.values(selected).map((item, idx) => (
          <tr key={item?.id} className=" hover:bg-hoverGray transition-colors">
            <td width={50}>{idx + 1}</td>
            <td>{item?.name}</td>
            <td>
              <MainInput
                placeholder={"(не задано)"}
                register={register(`${item.id}`)}
              />
            </td>
            <td>
              <div className="flex justify-center gap-3 z-10">
                <div
                  className="cursor-pointer w-8 text-center"
                  onClick={() => dispatch(decrementSelected(item.id))}
                >
                  -
                </div>
                <div className="w-8 text-center">{item.count}</div>
                <div
                  className="cursor-pointer w-8 text-center"
                  onClick={() => dispatch(incrementSelected(item.id))}
                >
                  +
                </div>
              </div>
            </td>
            <td>{item.price}</td>
            <td>{item.count * item.price}</td>
          </tr>
        ))}

        <tr>
          <td />
          <td />
          <td />
          <td />
          <td>Итого:</td>
          <td>{reduceVal}</td>
        </tr>
      </tbody>
    );
  }, [selected]);

  const handleSave = () => {
    const products = Object.values(selected).map((item) => {
      return {
        order_id: Number(id),
        product_id: item.id,
        comment: getValues(`${item.id}`),
        amount: item.count,
      };
    });
    mutate(products, {
      onSuccess: () => {
        dispatch(clearCart());
        refetch();

        successToast("products submitted");
      },
    });
  };

  // if (!items.length) return;

  return (
    <form>
      <div className="flex justify-between items-center">
        <Typography size={TextSize.XXL}>Товары</Typography>
        <div>
          <Button
            className="bg-darkBlue mt-4 w-64 text-white mr-2"
            type="button"
            onClick={() => handleNavigate({ productModal: 1 })}
          >
            Добавить блюдо
          </Button>

          {!emptySelected && (
            <Button
              className="bg-yellow mt-4 w-64 "
              type="button"
              onClick={handleSave}
            >
              Сохранить
            </Button>
          )}
        </div>
      </div>

      {!emptySelected ? (
        <table>
          <ProductRow />
          {renderTable}
        </table>
      ) : (
        <EmptyList />
      )}
      <div className="w-full bg-yellow">
        <Typography size={TextSize.XXL} alignCenter>
          Добавленные продукты
        </Typography>
      </div>

      <table>
        <ProductRow />

        <tbody>
          {!!order?.product_order.length &&
            order?.product_order.map((item, idx) => (
              <tr
                key={item?.id}
                className=" hover:bg-hoverGray transition-colors"
              >
                <td width={50}>{idx + 1}</td>
                <td>{item?.order_vs_product.name}</td>
                <td>
                  <MainInput
                    placeholder={"(не задано)"}
                    // onChange={() => null}
                    disabled
                    value={item?.comment}
                  />
                </td>
                <td>
                  <div className="flex justify-center gap-3 z-10">
                    <div className="w-8 text-center">{item.amount}</div>
                  </div>
                </td>
                <td>{item?.order_vs_product?.price}</td>
                <td>{item.amount * item?.order_vs_product?.price}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal
        isOpen={!!modal}
        onClose={closeModal}
        className="!w-[815px] max-w-none"
      >
        <div className="rounded-md bg-white p-4">
          <div className="flex w-full justify-between items-center">
            <Typography size={TextSize.XXL}>Товары</Typography>

            <CloseIcon onClick={closeModal} />
          </div>
          <MainInput
            placeholder={"Поиск продукции"}
            onChange={handleName}
            className="mt-3"
          />
          {renderModal}
        </div>
      </Modal>
    </form>
  );
};

export default AddProduct;
