import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainRadioBtns from "src/components/BaseInputs/MainRadioBtns";
import MainSelect from "src/components/BaseInputs/MainSelect";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Header from "src/components/Header";
import Typography, { TextSize } from "src/components/Typography";

const payments = [
  { id: 1, name: "Payme" },
  { id: 2, name: "Uzum" },
  { id: 3, name: "click" },
];

const systems = [
  { id: 1, name: "Отдел Мастики" },
  { id: 2, name: "Телеграм бот" },
  { id: 3, name: "Сайт" },
];
const directions = [
  { id: 1, name: "Бенто" },
  { id: 2, name: "Кремовый" },
  { id: 3, name: "Мастика" },
  { id: 3, name: "Меренговый" },
  { id: 3, name: "Песочный" },
  { id: 3, name: "Кенди-бар" },
];

const ShowOrder = () => {
  const { id } = useParams();
  const [prepay, $prepay] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //   const handleDeliveryType = (id: number) => {
  //     $deliveryType(id);
  //   };

  const onSubmit = () => {
    console.log("first");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header />

      <Card title={`Заказ №${id}`} className="px-8 pt-4">
        <div className="flex flex-col">
          <Typography size={TextSize.S}>Статус: Новый</Typography>
        </div>
        <div className="flex flex-1">
          <div className="w-80 pr-10 border-r">
            <BaseInput label="Тип заказа" className="my-2">
              <MainInput
                placeholder={"Введите имя"}
                register={register("oder_type", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput label="Клиент" className="mb-2">
              <MainInput
                placeholder={"Введите номер"}
                register={register("client", { required: "Обязательное поле" })}
              />
            </BaseInput>
            <BaseInput label="Номер телефона" className="mb-2">
              <PhoneInput
                placeholder={"Введите номер"}
                register={register("phone", { required: "Обязательное поле" })}
              />
            </BaseInput>
            <BaseInput label="Доп. Номер" className="mb-2">
              <PhoneInput
                placeholder={"Введите номер"}
                register={register("extra_phone")}
              />
            </BaseInput>
            <BaseInput label="Дата оформления" className="mb-2">
              <MainInput
                register={register("issue_date", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput label="Дата поставки" className="mb-2">
              <MainInput
                register={register("delivery_date", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput label="Адрес доставки" className="mb-2">
              <MainInput
                register={register("address", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
          </div>
          <div className="p-4 ml-6 flex flex-1 flex-col ">
            <BaseInput label="Предоплата">
              <MainRadioBtns
                value={prepay}
                onChange={(e) => $prepay(e)}
                values={[
                  { id: 1, name: "Да" },
                  { id: 2, name: "Полностью" },
                ]}
              />
            </BaseInput>

            <BaseInput label="Способ оплаты" className="mb-2">
              <MainSelect
                values={payments}
                inputStyle={InputStyle.primary}
                register={register("payment_type", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>

            <BaseInput label="Система" className="mb-2">
              <MainSelect
                values={systems}
                inputStyle={InputStyle.primary}
                register={register("system", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput label="Оператор" className="mb-2">
              <MainInput
                register={register("operator", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
            <BaseInput label="Дата изменения" className="mb-2">
              <MainDatePicker
                register={register("operator", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>

            <BaseInput label="Комментарии" className="mb-2">
              <MainTextArea
                register={register("comment", {
                  required: "Обязательное поле",
                })}
              />
            </BaseInput>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-darkYellow mt-4 w-64" type="submit">
            Сохранить
          </Button>
        </div>

        <div className="border-b w-full mt-4" />
        <div className="mt-4">
          <Typography size={TextSize.XXL}>Направление / Оформление</Typography>

          <BaseInput
            className={"flex w-full gap-10 bg-mainGray py-1 px-2 rounded"}
          >
            {directions.map((item, idx) => {
              return (
                <label key={idx} className="flex gap-2">
                  <input
                    type="radio"
                    value={item.id}
                    name="radioGroup"
                    // checked={value === !!item.id}
                    // onChange={handleCheckboxChange}
                  />
                  {item.name}
                </label>
              );
            })}
          </BaseInput>
        </div>

        <div className="flex">
          <BaseInput label="Сложность" className="mb-2">
            <MainSelect
              values={systems}
              inputStyle={InputStyle.primary}
              register={register("system", {
                required: "Обязательное поле",
              })}
            />
          </BaseInput>
          <BaseInput label="Этажность" className="mb-2">
            <MainSelect
              values={systems}
              inputStyle={InputStyle.primary}
              register={register("system", {
                required: "Обязательное поле",
              })}
            />
          </BaseInput>
          <BaseInput label="Тип начинки:" className="mb-2">
            <MainSelect
              values={systems}
              inputStyle={InputStyle.primary}
              register={register("system", {
                required: "Обязательное поле",
              })}
            />
          </BaseInput>
          <BaseInput label="Тип начинки 1 этаж:" className="mb-2">
            <MainSelect
              values={systems}
              inputStyle={InputStyle.primary}
              register={register("system", {
                required: "Обязательное поле",
              })}
            />
          </BaseInput>
        </div>
      </Card>
    </form>
  );
};

export default ShowOrder;
