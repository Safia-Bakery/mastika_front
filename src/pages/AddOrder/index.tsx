import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
import useQueryString from "src/hooks/useQueryString";
import useUser from "src/hooks/useUser";
import { errorToast, successToast } from "src/utils/toast";
import { OrderType, PaymentTypes } from "src/utils/types";

const orderArray = [
  {
    id: OrderType.delivery,
    name: "Доставка",
  },
  {
    id: OrderType.pickup,
    name: "Самовывоз",
  },
];

const AddOrder = () => {
  const [deliveryType, $deliveryType] = useState(OrderType.delivery);
  const address_name = useQueryString("address_name");
  const phoneStr = useQueryString("phone");

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
    const { address, house, home, refAddr, name } = getValues();
    mutate(
      {
        order_user: name,
        phone_number: phone,

        // payment_type: PaymentTypes.cash,
        firstly_payment: 1,
        is_delivery: Number(deliveryType === OrderType.delivery),
        // comment: "",
        deliver_date: new Date(),
        department_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        // category_id: 1,
        ...(phone2 && { extra_number: phone2 }),
        ...(address_name &&
          deliveryType === OrderType.delivery && { location: address_name }),
        ...(address_name &&
          deliveryType === OrderType.delivery && { address: address_name }),
        ...(house &&
          deliveryType === OrderType.delivery && { apartment: house }),
        ...(refAddr &&
          deliveryType === OrderType.delivery && { near_to: refAddr }),
        ...(home && { home }),
      },
      {
        onSuccess: () => successToast("created"),
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

        <BaseInput label="Адрес" className="mb-2">
          <MainInput
            value={address_name || ""}
            register={register("address", {
              required: "Обязательное поле",
            })}
          />
        </BaseInput>
        {deliveryType === OrderType.delivery ? (
          <>
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
          <BranchSelect enabled label="Выберите филиал" />
        )}

        {/* {deliveryType === OrderType.pickup && (
          <BranchSelect enabled label="Выберите филиал" />
        )} */}
      </>
    );
  }, [deliveryType, address_name]);

  const renderMap = useMemo(() => {
    if (deliveryType === OrderType.delivery)
      return (
        <div className="h-[400px] z-10  flex-1 p-4 bg-mainGray rounded-2xl ml-6 ">
          <Typography size={TextSize.XL}>Укажите адрес доставки</Typography>
          <YandexMap />
        </div>
      );
  }, [deliveryType]);

  useEffect(() => {
    setValue("address", address_name);
  }, [address_name]);

  useEffect(() => {
    if (isSuccess)
      reset({
        name: user.username,
      });
  }, [user, isSuccess]);

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
