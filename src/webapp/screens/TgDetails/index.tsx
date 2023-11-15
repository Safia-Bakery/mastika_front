import dayjs from "dayjs";
import { lazy, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import Suspend from "src/components/Suspend";
import Typography, { TextSize, Weight } from "src/components/Typography";
import orderMutation from "src/hooks/mutation/order";
import orderDynamic from "src/hooks/mutation/orderDynamic";
import orderProducts from "src/hooks/mutation/orderProducts";
import useBranches from "src/hooks/useBranches";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useProducts from "src/hooks/useProducts";
import useQueryString from "src/hooks/useQueryString";
import { orderArray } from "src/pages/AddOrder";
import {
  tgAddItem,
  tgCartSelector,
  tgClearCart,
  tgClearItems,
  tgItemsSelector,
} from "src/store/reducers/tgWebReducer";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import {
  deliveryPrice,
  getFillingType,
  numberWithCommas,
} from "src/utils/helpers";
import { errorToast, successToast } from "src/utils/toast";
import { ModalType, OrderingType } from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import TgBranchSelect from "src/webapp/componets/TgBranchSelect";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import TgMap from "../TgMap";
import CloseIcon from "src/components/CloseIcon";

const TgSwiper = lazy(() => import("src/webapp/componets/TgSwiper"));

interface Errortypes {
  date?: string;
}

const TgDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();
  const dateRef = useRef<any>();
  const modal = useQueryString("modal");
  const address_name = useQueryString("address_name");
  const lat = useQueryString("lat");
  const long = useQueryString("long");
  const items = useAppSelector(tgItemsSelector);
  const is_delivery = items.delivery_type?.value === OrderingType.delivery;
  const [delivery_date, $delivery_date] = useState<Date>();
  const [error, $error] = useState<Errortypes>();
  const { mutate } = orderMutation();
  const { mutate: dynamicVals } = orderDynamic();
  const { mutate: productMutation } = orderProducts();
  const cart = useAppSelector(tgCartSelector);
  const [phone, $phone] = useState("");
  const [extraPhone, $extraPhone] = useState("" || items.manager);

  const { data: product } = useProducts({
    id: getFillingType(+items.filling_type?.value!)?.val,
    enabled: !!items.filling_type?.value,
  });

  const { register, reset, getValues, setValue } = useForm();
  useBranches({ enabled: items.delivery_type?.value === OrderingType.pickup });

  const handleDate = (e: Date) => $delivery_date(e);
  const handleNavigateParams = (value: object) => () => navigateParams(value);

  useEffect(() => {
    $delivery_date(items.date);
    if (address_name) setValue("address_name", address_name);
    if (items.client || items.manager)
      reset({
        client_phone: items.client,
        manager_phone: items.manager,
      });
  }, [address_name, items.client, items.manager, items.date]);

  const handleNavigate = (url: string) => navigate(url);
  const onClose = () => removeParams(["modal", "branch"]);

  const onSubmit = () => {
    const { address_name } = getValues();
    if (!delivery_date) {
      dateRef?.current.scrollIntoView();
      $error({ date: "Обязательное поле" });
    } else {
      dispatch(tgClearCart());
      const filler = items.filling
        ? Object.keys(items.filling!)?.reduce((acc: any, item) => {
            if (!!items.filling?.[item].value?.toString()) {
              acc[`${item}`] = `${items.filling?.[item].value}`;
            }
            return acc;
          }, {})
        : null;

      mutate(
        {
          order_user: "name",
          is_delivery,
          ...(phone && { phone_number: phone }),
          ...(extraPhone && { extra_number: extraPhone }),
          ...(address_name && !!is_delivery && { address: address_name }),
          ...(!is_delivery && {
            department_id: branch?.id ? branch.id : items.branch?.value,
          }),

          ...(lat && !!is_delivery && { lat }),
          ...(long && !!is_delivery && { long }),
          comment: items.comments,
          deliver_date: delivery_date,
          category_id: items.direction?.value,
          complexity: items.complexity?.value,
          portion: items.portion,
          is_bot: 1,

          ...(!!items.examplePhoto?.length && { images: items.examplePhoto }),
          ...(!!filler && { filler }),
          color_details: items.palette_details,
          color: items.palette,
        },
        {
          onSuccess: (data: any) => {
            if (data.id) {
              const products = Object.keys(cart)?.map((item) => {
                return {
                  order_id: data.id,
                  product_id: cart?.[item].value?.toString()!,
                  amount: cart?.[item].count!,
                };
              });
              productMutation(
                [
                  ...products,
                  {
                    order_id: data.id,
                    product_id: String(items.orderPackage?.value),
                    amount: 1,
                  },
                ],

                {
                  onSuccess: () => {
                    dispatch(tgClearCart());
                    successToast("products submitted");
                  },
                }
              );

              dynamicVals(
                { ...items.dynamic, ...{ order_id: Number(data.id) } },
                {
                  onError: (e: any) => errorToast(e.message),
                  onSuccess: () => {
                    dispatch(tgClearItems());
                    successToast("dynamics submitted");
                    handleNavigate(`/tg/success?id=${data.id}`);
                  },
                }
              );
            }
          },
          onError: (e: any) => errorToast(e.message),
        }
      );
    }
  };

  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const calculateVals = useMemo(() => {
    const addedProds = Object.values(cart).reduce(
      (acc, item) => acc + item.count! * item.price!,
      0
    );

    const productsPrice = product
      ? items?.portion! * product?.[0].price! + items.orderPackage?.price!
      : 0;

    const cakePrice = productsPrice + addedProds;

    return {
      cakePrice,
      total: is_delivery ? cakePrice + deliveryPrice : cakePrice,
    };
  }, [product]);

  const renderPhone = useMemo(() => {
    return (
      <BaseInput
        labelClassName="!text-base"
        label="Гость / Клиент"
        className="mb-2"
      >
        <PhoneInput
          className="!h-12"
          placeholder={"Введите номер телефона"}
          inputStyle={InputStyle.white}
          onChange={$phone}
          value={phone}
        />
      </BaseInput>
    );
  }, [phone]);
  const renderExtraPhone = useMemo(() => {
    return (
      <BaseInput
        labelClassName="!text-base"
        className="mb-2"
        label="Менеджер / Управляющий магазина"
      >
        <PhoneInput
          className="!h-12"
          placeholder={"Введите номер телефона"}
          inputStyle={InputStyle.white}
          onChange={$extraPhone}
          value={extraPhone}
        />
      </BaseInput>
    );
  }, [extraPhone]);

  const renderType = useMemo(() => {
    if (is_delivery)
      return (
        <>
          <BaseInput labelClassName="!text-base" label="Адрес">
            <MainInput
              inputStyle={InputStyle.white}
              className="!h-12"
              register={register("address_name", {
                required: "Обязательное поле",
              })}
              placeholder={"Введите адрес доставки"}
            />
          </BaseInput>
          <TgBtn
            onClick={handleNavigateParams({ modal: ModalType.map })}
            className="font-bold"
          >
            указать на карте
            <img src="/assets/icons/map.svg" className="ml-2" alt="map" />
          </TgBtn>
        </>
      );
    else
      return (
        <>
          <Texts size={TextSize.L}>Филиал</Texts>

          <TgBtn
            onClick={handleNavigateParams({ modal: ModalType.branch })}
            className="font-bold mt-2"
          >
            {items.branch?.name ? items.branch.name : "ВЫБЕРИТЕ ФИЛИАЛ"}
          </TgBtn>
        </>
      );
  }, [items?.delivery_type, items.branch?.name]);

  const renderOrderType = useMemo(() => {
    return (
      <MainSelect
        values={orderArray}
        value={items.delivery_type?.value}
        onChange={(e) =>
          dispatch(
            tgAddItem({ delivery_type: { value: Number(e.target.value) } })
          )
        }
        inputStyle={InputStyle.white}
        className="!h-6 border !bg-tgGray rounded-md !max-w-[90px] !p-0 text-xs !mb-0"
      />
    );
  }, [items.delivery_type?.value]);

  const renderDetails = useMemo(() => {
    return (
      <>
        <div className="flex justify-between items-center">
          <Texts size={TextSize.L}>Направление</Texts>

          <Texts size={TextSize.L}>{items.direction?.name}</Texts>
        </div>
        <div className="flex justify-between items-center">
          <Texts size={TextSize.L}>Степень сложности</Texts>

          <Texts size={TextSize.L}>{items.complexity?.name}</Texts>
        </div>
        <div className="flex justify-between items-center">
          <Texts size={TextSize.L}>Этажность</Texts>

          <Texts size={TextSize.L}>{items.floors}</Texts>
        </div>
        <div className="flex justify-between items-center">
          <Texts size={TextSize.L}>Порции</Texts>

          <Texts size={TextSize.L}>{items.portion}</Texts>
        </div>
        <div className="flex justify-between items-center">
          <Texts size={TextSize.L}>Тип начинки</Texts>

          <Texts size={TextSize.L}>{items.filling_type?.name}</Texts>
        </div>
        {items?.filling &&
          Object.keys(items?.filling)?.map((item) => (
            <div className="flex justify-between items-center" key={item}>
              <Texts size={TextSize.L}>Начинка {item} этаж</Texts>

              <Texts size={TextSize.L}>{items.filling?.[item].name}</Texts>
            </div>
          ))}
        {items?.palette &&
          Object.keys(items?.palette)?.map((item) => (
            <div className="flex justify-between items-center" key={item}>
              <Texts size={TextSize.L}>Номер палитры {item} этаж</Texts>

              <Texts size={TextSize.L}>{items.palette?.[item]}</Texts>
            </div>
          ))}

        <div className="flex justify-between items-center">
          <Texts size={TextSize.L}>Упаковка</Texts>

          <Texts size={TextSize.L}>{items.orderPackage?.name}</Texts>
        </div>

        <div className="flex justify-between items-center mt-2">
          <Texts size={TextSize.L} weight={Weight.bold}>
            Продукты:
          </Texts>

          <Texts size={TextSize.L}>{""}</Texts>
        </div>

        {Object.keys(cart)?.map((item) => (
          <div
            className="flex justify-between items-center"
            key={cart?.[item].value}
          >
            <Texts size={TextSize.L}>{cart?.[item].name}</Texts>

            <Texts size={TextSize.L}>x{cart?.[item].count}</Texts>
          </div>
        ))}
      </>
    );
  }, [items]);

  const renderDate = useMemo(() => {
    return (
      <div ref={dateRef}>
        <BaseInput
          labelClassName="!text-base"
          className="mt-4"
          label="Дата / Время"
        >
          <MainDatePicker
            inputStyle={InputStyle.white}
            className="!h-12"
            showTimeInput
            placeholder={"Введите адрес доставки"}
            selected={delivery_date ? dayjs(delivery_date).toDate() : undefined}
            onChange={handleDate}
          />

          {error?.date && (
            <Typography
              className="text-red-600 w-full my-2"
              size={TextSize.M}
              alignCenter
            >
              {error?.date}
            </Typography>
          )}
        </BaseInput>
      </div>
    );
  }, [delivery_date, error?.date]);

  useEffect(() => {
    if (branch?.id)
      dispatch(
        tgAddItem({ branch: { name: branch?.name, value: branch?.id } })
      );
  }, [branch?.id]);

  const renderModal = useMemo(() => {
    switch (modal) {
      case ModalType.branch:
        return <TgBranchSelect />;
      case ModalType.image:
        return (
          <Suspend>
            <TgSwiper />
          </Suspend>
        );
      case ModalType.map:
        return <TgMap />;
      default:
        break;
    }
  }, [modal]);

  return (
    <TgContainer>
      <form>
        <div className="flex justify-between items-center w-full">
          <TgBackBtn link="package" />
          {renderOrderType}
        </div>

        <Texts className="my-4 " size={TextSize.XL} uppercase>
          Детали заказа
        </Texts>
        {renderPhone}
        {renderExtraPhone}

        {renderType}
        <div className="border-b border-b-tgBorder mt-4" />
        {renderDate}

        <div className="flex justify-between items-center mt-7 mb-4">
          <Texts size={TextSize.XL} uppercase>
            Ваш торт
          </Texts>

          <TgBtn
            onClick={handleNavigateParams({ modal: ModalType.image })}
            className={"!bg-tgPrimary !rounded-2xl relative !w-32 !h-7"}
          >
            <Texts size={TextSize.S}>Посмотреть фото</Texts>
          </TgBtn>
        </div>
        {renderDetails}
        <div className="border-b border-b-tgBorder mt-5" />

        <div className="flex justify-between items-center">
          <Texts size={TextSize.L}>Стоимость торта</Texts>

          <Texts size={TextSize.L}>
            {numberWithCommas(calculateVals.cakePrice)} сум
          </Texts>
        </div>
        {is_delivery && (
          <div className="flex justify-between items-center mt-1">
            <Texts size={TextSize.L}>Доставка</Texts>

            <Texts size={TextSize.L}>
              {numberWithCommas(deliveryPrice)} сум
            </Texts>
          </div>
        )}

        <div className="flex justify-between items-center mt-5">
          <Texts size={TextSize.L}>Общее</Texts>

          <Texts size={TextSize.L}>
            {numberWithCommas(calculateVals.total)} сум
          </Texts>
        </div>

        <TgBtn onClick={onSubmit} className="font-bold mt-20">
          Подтвердить / Заказать
        </TgBtn>

        <TgModal
          onClose={onClose}
          isOpen={!!modal && modal !== "0"}
          className="relative  pb-2"
        >
          <div className="absolute top-4 right-4 z-50">
            <CloseIcon onClick={onClose} />
          </div>
          <div className="overflow-hidden max-h-[80vh]">{renderModal}</div>
        </TgModal>
      </form>
    </TgContainer>
  );
};

export default TgDetails;
