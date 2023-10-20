import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import MainSelectBtn from "src/components/BaseInputs/MainSelectBtn";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import BranchSelect from "src/components/BranchSelect";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Typography, { TextSize } from "src/components/Typography";
import YandexMap from "src/components/YandexMap";
import orderMutation from "src/hooks/mutation/order";
import useOrders from "src/hooks/useOrders";
import useQueryString from "src/hooks/useQueryString";
import useUser from "src/hooks/useUser";
import { errorToast, successToast } from "src/utils/toast";
import { BranchJsonType, OrderingType, PaymentTypes } from "src/utils/types";

const orderArray = [
  {
    id: OrderingType.delivery,
    name: "Доставка",
  },
  {
    id: OrderingType.pickup,
    name: "Самовывоз",
  },
];

const AddOrder = () => {
  const navigate = useNavigate();
  const [deliveryType, $deliveryType] = useState(OrderingType.delivery);
  const address_name = useQueryString("address_name");
  const phoneStr = useQueryString("phone");
  const lat = useQueryString("lat");
  const long = useQueryString("long");
  const { refetch: ordersRefetch } = useOrders({});

  const branchJson = useQueryString("branch");
  const branch: BranchJsonType = branchJson && JSON.parse(branchJson);

  const { mutate, isLoading } = orderMutation();

  const [phone, $phone] = useState(phoneStr || "");
  const [phone2, $phone2] = useState("");

  const {
    data: user,
    isSuccess,
    isLoading: userLoading,
  } = useUser({ phone_number: phoneStr!, enabled: !!phoneStr });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
  } = useForm();

  const handlePhone = (val: string) => $phone(val);
  const handlePhone2 = (val: string) => $phone2(val);

  const handleDeliveryType = (id: number) => {
    $deliveryType(id);
  };

  const onSubmit = () => {
    const { house, home, refAddr, name } = getValues();
    const is_delivery = Number(deliveryType === OrderingType.delivery);
    mutate(
      {
        order_user: name,
        phone_number: phone,
        firstly_payment: 1,
        is_delivery,
        deliver_date: new Date(),
        ...(phone2 && { extra_number: phone2 }),
        ...(address_name && !!is_delivery && { location: address_name }),
        ...(address_name && !!is_delivery && { address: address_name }),
        ...(house && !!is_delivery && { apartment: house }),
        ...(refAddr && !!is_delivery && { near_to: refAddr }),
        ...(branch &&
          deliveryType === OrderingType.pickup && { department_id: branch.id }),
        ...(home && !!is_delivery && { home }),
        ...(lat && !!is_delivery && { lat }),
        ...(long && !!is_delivery && { long }),
      },
      {
        onSuccess: () => {
          ordersRefetch();
          navigate("/orders");
          successToast("created");
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  const renderPhones = useMemo(() => {
    return (
      <>
        <BaseInput label="Номер телефона" className="mb-2">
          <PhoneInput
            placeholder={"Введите номер"}
            value={phone}
            onChange={handlePhone}
          />
        </BaseInput>
        <BaseInput label="Доп. номер" className="mb-2">
          <PhoneInput
            placeholder={"Введите номер"}
            value={phone2}
            onChange={handlePhone2}
          />
        </BaseInput>
      </>
    );
  }, [phone, phone2]);

  const renderOrderType = useMemo(() => {
    return (
      <>
        <div className="border-b w-full mb-10" />
        <BaseInput label="Тип заказа" className="mb-2">
          <MainSelectBtn
            value={deliveryType}
            onChange={(val) => handleDeliveryType(val.id)}
            values={orderArray}
          />
        </BaseInput>

        {deliveryType === OrderingType.delivery ? (
          <>
            <BaseInput label="Адрес" className="mb-2">
              <MainInput
                value={address_name || ""}
                register={register("address", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <div className="flex gap-3">
              <BaseInput label="Дом" className="mb-2 flex-1">
                <MainInput
                  register={register("house", {
                    required: "Обязательное поле",
                  })}
                />
              </BaseInput>
              <BaseInput label="Квартира" className="mb-2 flex-1">
                <MainInput
                  register={register("home", { required: "Обязательное поле" })}
                />
              </BaseInput>
            </div>
            <BaseInput label="Ориентир" className="mb-2">
              <MainInput
                register={register("refAddr", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
          </>
        ) : (
          <BranchSelect label="Выберите филиал" />
        )}
      </>
    );
  }, [deliveryType, address_name]);

  const renderMap = useMemo(() => {
    if (deliveryType === OrderingType.delivery)
      return (
        <div className="h-[550px] z-10  flex-1 p-4 bg-mainGray rounded-2xl ml-6 ">
          <Typography size={TextSize.XL}>Укажите адрес доставки</Typography>
          <YandexMap />
        </div>
      );
    else return null;
  }, [deliveryType]);

  useEffect(() => {
    setValue("address", address_name);
  }, [address_name]);

  useEffect(() => {
    if (isSuccess && phoneStr) {
      $phone(phoneStr);
      reset({
        name: user.username,
      });
    }
  }, [user, isSuccess, phoneStr]);

  if (userLoading) return <Loading absolute />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header title="Детали заказа" />

      <Card className="p-8" title="Новый заказ">
        <div className="flex flex-1">
          <div className="w-80 pr-10 border-r">
            <BaseInput label="Имя" className="my-2">
              <MainInput
                placeholder={"Введите имя"}
                register={register("name", { required: "Обязательное поле" })}
              />
            </BaseInput>
            {renderPhones}
            {renderOrderType}
          </div>
          {renderMap}
        </div>
        <div className="flex flex-1 justify-end">
          <Button
            isLoading={isLoading}
            className="bg-darkYellow mt-4 w-64"
            type="submit"
          >
            Создать заказ
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default AddOrder;
