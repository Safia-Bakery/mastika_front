import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AddProduct from "src/components/AddProducts";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainRadioBtns from "src/components/BaseInputs/MainRadioBtns";
import MainSelect from "src/components/BaseInputs/MainSelect";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import PhoneInput from "src/components/BaseInputs/PhoneInput";
import Button from "src/components/Button";
import Card from "src/components/Card";
import UploadComponent, { FileItem } from "src/components/FileUpload";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Typography, { TextSize } from "src/components/Typography";
import useCategories from "src/hooks/useCategories";
import useCategoriesFull from "src/hooks/useCategoryFull";
import useOrder from "src/hooks/useOrder";

import {
  ContentType,
  PaymentTypes,
  SubCategType,
  SystemTypes,
} from "src/utils/types";

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

const ShowOrder = () => {
  const { id } = useParams();
  const [prepay, $prepay] = useState(true);
  const [activeCateg, $activeCateg] = useState<number>();
  const [files, $files] = useState<FormData>();
  const [images, $images] = useState<FileItem[]>();

  const { data } = useOrder({ id: Number(id), enabled: !!id });
  const order = data?.order;

  const handleFilesSelected = (data: FileItem[]) => {
    const formData = new FormData();
    data.forEach((item) => {
      formData.append("files", item.file, item.file.name);
    });
    $files(formData);
    $images(data);
  };

  console.log(files, "files");

  const contentTypes = (subCateg: SubCategType) => {
    switch (subCateg.contenttype_id) {
      case ContentType.number: {
        return (
          <MainInput type="number" register={register(`${subCateg.id}`)} />
        );
      }
      case ContentType.select: {
        return (
          <MainSelect
            inputStyle={InputStyle.primary}
            register={register(`${subCateg.id}`)}
          >
            {subCateg.subcat_vs_selval.map((val) => (
              <option key={val.id} value={val.id}>
                {val.content}
              </option>
            ))}
          </MainSelect>
        );
      }

      case ContentType.image: {
        return <UploadComponent onFilesSelected={handleFilesSelected} />;
      }
      case ContentType.string: {
        return (
          <MainInput type="string" register={register(`${subCateg.id}`)} />
        );
      }

      default:
        break;
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const { data: categories } = useCategories({});
  const { data: subCategories, isLoading: subLoading } = useCategoriesFull({
    id: activeCateg,
    enabled: !!activeCateg,
  });

  const renderCategories = useMemo(() => {
    if (subLoading && !!activeCateg) return <Loading />;
    return subCategories?.category_vs_subcategory?.map((sub) => (
      <BaseInput
        key={sub.id}
        label={sub.name}
        className="mb-2 flex flex-col w-60"
      >
        {contentTypes(sub)}
      </BaseInput>
    ));
  }, [activeCateg, subLoading, subCategories]);

  const onSubmit = () => {
    console.log(
      subCategories?.category_vs_subcategory.reduce((acc: any, item) => {
        acc[item.id] = getValues(`${item.id}`);
        return acc;
      }, {}),
      "ids"
    );
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
                register={register("oder_type")}
              />
            </BaseInput>
            <BaseInput label="Клиент" className="mb-2">
              <MainInput
                placeholder={"Введите номер"}
                register={register("client")}
              />
            </BaseInput>
            <BaseInput label="Номер телефона" className="mb-2">
              <PhoneInput
                placeholder={"Введите номер"}
                register={register("phone")}
              />
            </BaseInput>
            <BaseInput label="Доп. Номер" className="mb-2">
              <PhoneInput
                placeholder={"Введите номер"}
                register={register("extra_phone")}
              />
            </BaseInput>
            <BaseInput label="Дата оформления" className="mb-2">
              <MainInput register={register("issue_date")} />
            </BaseInput>
            <BaseInput label="Дата поставки" className="mb-2">
              <MainInput register={register("delivery_date")} />
            </BaseInput>
            <BaseInput label="Адрес доставки" className="mb-2">
              <MainInput register={register("address")} />
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
                register={register("payment_type")}
              />
            </BaseInput>

            <BaseInput label="Система" className="mb-2">
              <MainSelect
                values={systems}
                inputStyle={InputStyle.primary}
                register={register("system")}
              />
            </BaseInput>
            <BaseInput label="Оператор" className="mb-2">
              <MainInput register={register("operator")} />
            </BaseInput>
            <BaseInput label="Дата изменения" className="mb-2">
              <MainDatePicker register={register("operator")} />
            </BaseInput>

            <BaseInput label="Комментарии" className="mb-2">
              <MainTextArea register={register("comment")} />
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
          <div className="w-full mt-4">
            <BaseInput
              className={
                "flex w-full gap-10 bg-mainGray p-3 rounded-md flex-1 overflow-x-auto flex-wrap "
              }
            >
              {categories?.map((item, idx) => {
                return (
                  <label
                    onClick={() => $activeCateg(item.id)}
                    key={idx}
                    className="flex gap-2"
                  >
                    <input
                      type="radio"
                      onChange={() => null}
                      checked={item.id === activeCateg}
                    />
                    {item.name}
                  </label>
                );
              })}
            </BaseInput>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 min-h-[150px] h-full">
          {renderCategories}
        </div>
        <div className="flex gap-4 mt-4">
          {!!images?.length &&
            images.map((img) => {
              if (img.file.type.startsWith("image/"))
                return (
                  <img
                    key={img.id}
                    src={URL.createObjectURL(img.file)}
                    height={100}
                    width={100}
                  />
                );
            })}
        </div>

        <div className="border-b w-full mt-4" />

        <AddProduct />
      </Card>
    </form>
  );
};

export default ShowOrder;
