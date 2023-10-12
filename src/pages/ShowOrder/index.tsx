import { useMemo, useState } from "react";
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
import Loading from "src/components/Loader";
import Typography, { TextSize } from "src/components/Typography";
import useCategories from "src/hooks/useCategories";
import useSubCategories from "src/hooks/useSubCategories";
import { PaymentTypes, SystemTypes } from "src/utils/types";

const payments = [
  { id: PaymentTypes.payme, name: "Payme" },
  { id: PaymentTypes.cash, name: "Наличные" },
  { id: PaymentTypes.click, name: "click" },
];

const systems = [
  { id: SystemTypes.mastika, name: "Отдел Мастики" },
  { id: SystemTypes.tg, name: "Телеграм бот" },
  { id: SystemTypes.web, name: "Сайт" },
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
  const [activeCateg, $activeCateg] = useState<number>();

  const contentTypes = (key: number) => {
    console.log(key, "key");
    switch (key) {
      case 1: {
        return 1;
      }
      case 2: {
        return 2;
      }

      default:
        break;
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: categories } = useCategories({});
  const { data: subCategories, isLoading: subLoading } = useSubCategories({
    category_id: activeCateg,
    enabled: !!activeCateg,
  });

  const renderCategories = useMemo(() => {
    if (subLoading && !!activeCateg) return <Loading />;
    // if (subCategories)
    return subCategories?.map((sub) => {
      return <div>{contentTypes(sub.contenttype_id)}</div>;
    });

    // return (
    //   <>
    //     <div className="flex flex-[4] gap-4 mt-8">
    //       <div className="flex flex-col flex-[3]">
    //         <div className="flex flex-wrap gap-3">
    //           <BaseInput
    //             label="Сложность"
    //             className="mb-2 flex flex-1 flex-col"
    //           >
    //             <MainSelect
    //               values={systems}
    //               inputStyle={InputStyle.primary}
    //               register={register("system", {
    //                 required: "Обязательное поле",
    //               })}
    //             />
    //           </BaseInput>
    //           <BaseInput
    //             label="Этажность"
    //             className="mb-2 flex flex-1 flex-col"
    //           >
    //             <MainSelect
    //               values={systems}
    //               inputStyle={InputStyle.primary}
    //               register={register("system", {
    //                 required: "Обязательное поле",
    //               })}
    //             />
    //           </BaseInput>
    //           <BaseInput
    //             label="Тип начинки:"
    //             className="mb-2 flex flex-1 flex-col"
    //           >
    //             <MainSelect
    //               values={systems}
    //               inputStyle={InputStyle.primary}
    //               register={register("system", {
    //                 required: "Обязательное поле",
    //               })}
    //             />
    //           </BaseInput>
    //         </div>
    //         <BaseInput label="Палитра" className="mb-2 flex flex-1 flex-col">
    //           <input
    //             type="color"
    //             className="w-[210px] flex bg-white text-white border-2 border-black"
    //             defaultValue={"#FFFFFF"}
    //             placeholder="Введите номер палитры"
    //           />
    //         </BaseInput>
    //       </div>
    //       <div className="flex flex-col flex-1">
    //         <BaseInput
    //           label="Тип начинки 1 этаж:"
    //           className="mb-2 flex flex-1 flex-col"
    //         >
    //           <MainSelect
    //             values={systems}
    //             inputStyle={InputStyle.primary}
    //             register={register("system", {
    //               required: "Обязательное поле",
    //             })}
    //           />
    //         </BaseInput>
    //         <BaseInput
    //           label="Тип начинки 2 этаж:"
    //           className="mb-2 flex flex-1 flex-col"
    //         >
    //           <MainSelect
    //             values={systems}
    //             inputStyle={InputStyle.primary}
    //             register={register("system", {
    //               required: "Обязательное поле",
    //             })}
    //           />
    //         </BaseInput>
    //       </div>
    //     </div>
    //   </>
    // );
  }, [activeCateg, subLoading, subCategories]);

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
            {/* <MainSelect values={categories} value={activeCateg} onChange={(e) => $activeCateg(Number(e.target.value))} /> */}
            {categories?.map((item, idx) => {
              return (
                <label
                  onClick={() => $activeCateg(item.id)}
                  key={idx}
                  className="flex gap-2"
                >
                  <input
                    type="radio"
                    // onChange={() => null}
                    checked={item.id === activeCateg}
                    // checked={value === !!item.id}
                    // onChange={handleCheckboxChange}
                  />
                  {item.name}
                </label>
              );
            })}
          </BaseInput>
        </div>
        {renderCategories}
      </Card>
    </form>
  );
};

export default ShowOrder;
