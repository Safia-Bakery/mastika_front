import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import { TextSize, Weight } from "src/components/Typography";
import orderMutation from "src/hooks/mutation/order";
import orderDynamic from "src/hooks/mutation/orderDynamic";
import orderProducts from "src/hooks/mutation/orderProducts";
import useBranches from "src/hooks/useBranches";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { orderArray } from "src/pages/AddOrder";
import {
  tgAddItem,
  tgCartSelector,
  tgClearCart,
  tgClearItems,
  tgItemsSelector,
} from "src/redux/reducers/tgWebReducer";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import { errorToast, successToast } from "src/utils/toast";
import { ModalType, OrderingType } from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import TgBranchSelect from "src/webapp/componets/TgBranchSelect";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import TgSwiper from "src/webapp/componets/TgSwiper";

const TgDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();
  const modal = useQueryString("modal");
  const address_name = useQueryString("address_name");
  const lat = useQueryString("lat");
  const long = useQueryString("long");
  const items = useAppSelector(tgItemsSelector);
  const is_delivery = items.delivery_type?.value === OrderingType.delivery;
  const [delivery_date, $delivery_date] = useState<Date>();
  const { mutate } = orderMutation();
  const { mutate: dynamicVals } = orderDynamic();
  const { mutate: productMutation } = orderProducts();
  const cart = useAppSelector(tgCartSelector);

  console.log(items, "items");

  const { register, reset, getValues, setValue, handleSubmit } = useForm();
  useBranches({ enabled: !is_delivery });

  const handleDate = (e: any) => $delivery_date(e);
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
    const { client_phone, manager_phone, address_name } = getValues();
    dispatch(tgClearCart());
    const filler = Object.keys(items.filling!)?.reduce((acc: any, item) => {
      if (!!items.filling?.[item].value?.toString()) {
        acc[item] = `${items.filling?.[item].value}`;
      }
      return acc;
    }, {});

    console.log(filler, "filler");
    mutate(
      {
        order_user: "name",
        is_delivery,
        ...(client_phone && !!is_delivery && { phone_number: client_phone }),
        ...(manager_phone && !!is_delivery && { extra_number: manager_phone }),
        // ...(address_name && !!is_delivery && { location: address_name }),
        ...(address_name && !!is_delivery && { address: address_name }),
        // ...(house && !!is_delivery && { apartment: house }),
        // ...(refAddr && !!is_delivery && { near_to: refAddr }),
        ...(!is_delivery && {
          department_id: branch?.id ? branch.id : items.branch?.value,
        }),

        // ...(home && !!is_delivery && { home }),
        ...(lat && !!is_delivery && { lat }),
        ...(long && !!is_delivery && { long }),
        comment: items.comments,
        deliver_date: delivery_date,
        category_id: items.direction?.value,
        packaging: items.orderPackage?.value,
        complexity: items.complexity?.value,
        filler,
        ...(!!items.examplePhoto?.length && { images: items.examplePhoto }),
        color_details: items.palette_details,
        color: items.palette,
      },
      {
        onSuccess: (data: any) => {
          if (data.id) {
            if (!!Object.keys(cart)?.length) {
              const products = Object.keys(cart)?.map((item) => {
                return {
                  order_id: data.id,
                  product_id: cart?.[item].value?.toString()!,
                  // comment: getValues(`${item.id}`),
                  amount: cart?.[item].count!,
                };
              });
              productMutation(products, {
                onSuccess: () => {
                  dispatch(tgClearCart());
                  successToast("products submitted");
                },
              });
            }
            dynamicVals(
              { ...items.dynamic, ...{ order_id: Number(data.id) } },
              {
                onError: (e: any) => errorToast(e.message),
                onSuccess: () => {
                  successToast("dynamics submitted");
                  handleNavigate(`/tg/success?id=${data.id}`);
                  dispatch(tgClearItems());
                },
              }
            );
          }
        },
      }
    );
  };

  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const renderType = useMemo(() => {
    if (items?.delivery_type?.value === OrderingType.delivery)
      return (
        <>
          <BaseInput
            labelClassName="!text-base"
            label="Гость / Клиент"
            className="mb-2"
          >
            <MainInput
              inputStyle={InputStyle.white}
              className="!h-12"
              register={register("client_phone")}
              placeholder={"Введите номер телефона"}
            />
          </BaseInput>
          <BaseInput
            labelClassName="!text-base"
            className="mb-2"
            label="Менеджер / Управляющий магазина"
          >
            <MainInput
              inputStyle={InputStyle.white}
              className="!h-12"
              placeholder={"Введите номер телефона"}
              register={register("manager_phone")}
            />
          </BaseInput>
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
            onClick={() => handleNavigate("/tg/map")}
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
    if (items.delivery_type?.value)
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
      </BaseInput>
    );
  }, [delivery_date]);

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
        return <TgSwiper />;

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

          <Texts size={TextSize.L}>371 000 сум</Texts>
        </div>
        <div className="flex justify-between items-center mt-1">
          <Texts size={TextSize.L}>Доставка</Texts>

          <Texts size={TextSize.L}>100 000 сум</Texts>
        </div>

        <div className="flex justify-between items-center mt-5">
          <Texts size={TextSize.L}>Общее</Texts>

          <Texts size={TextSize.L}>471 000 сум</Texts>
        </div>

        <TgBtn
          // onClick={() => handleNavigate("/tg/success")}
          onClick={onSubmit}
          className="font-bold mt-20"
        >
          Подтвердить / Заказать
        </TgBtn>

        <TgModal onClose={onClose} isOpen={!!modal && modal !== "0"}>
          {renderModal}
        </TgModal>
      </form>
    </TgContainer>
  );
};

export default TgDetails;
