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
import useQueryString from "src/hooks/useQueryString";
import useUser from "src/hooks/useUser";
import { OrderType } from "src/utils/types";

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
  const phone = useQueryString("phone");

  const {
    data: user,
    isSuccess,
    isLoading: userLoading,
  } = useUser({ phone_number: phone!, enabled: !!phone });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
  } = useForm();

  const handleDeliveryType = (id: number) => {
    $deliveryType(id);
  };

  const onSubmit = () => {
    console.log(getValues("address"), "adress");
  };

  useEffect(() => {
    setValue("address", address_name);
  }, [address_name]);

  useEffect(() => {
    if (isSuccess)
      reset({
        name: user.username,
        phone,
      });
  }, []);

  const renderAddressName = useMemo(() => {
    return (
      <MainInput
        value={address_name || ""}
        register={register("address", {
          required: "Обязательное поле",
        })}
      />
    );
  }, [address_name]);

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
            <BaseInput label="Номер телефона" className="mb-2">
              <PhoneInput
                placeholder={"Введите номер"}
                register={register("phone", { required: "Обязательное поле" })}
              />
            </BaseInput>
            <BaseInput label="Доп. номер" className="mb-2">
              <PhoneInput
                placeholder={"Введите номер"}
                register={register("phone")}
              />
            </BaseInput>
            <div className="border-b w-full mb-10" />
            <BaseInput label="Тип заказа" className="mb-2">
              <MainSelectBtn
                value={deliveryType}
                onChange={(val) => handleDeliveryType(val.id)}
                values={orderArray}
              />
            </BaseInput>

            <BaseInput label="Адрес" className="mb-2">
              {/* <MainInput
                register={register("address", {
                  required: "Обязательное поле",
                  value: address_name,
                })}
              /> */}
              {renderAddressName}
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

            {deliveryType === OrderType.pickup && (
              <BranchSelect enabled label="Выберите филиал" />
            )}
          </div>
          {deliveryType === OrderType.delivery && (
            <div className="h-[400px] z-10  flex-1 p-4 bg-mainGray rounded-2xl ml-6 ">
              <Typography size={TextSize.XL}>Укажите адрес доставки</Typography>
              <YandexMap />
            </div>
          )}
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 w-64" type="submit">
            Создать заказ
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default AddOrder;
