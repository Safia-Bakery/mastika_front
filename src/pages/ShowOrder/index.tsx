import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
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
import CloseIcon from "src/components/CloseIcon";
import EmptyList from "src/components/EmptyList";
import UploadComponent, { FileItem } from "src/components/FileUpload";
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Typography, { TextSize } from "src/components/Typography";
import orderMutation from "src/hooks/mutation/order";
import orderDynamic from "src/hooks/mutation/orderDynamic";
import useCategories from "src/hooks/useCategories";
import useCategoriesFull from "src/hooks/useCategoryFull";
import useOrder from "src/hooks/useOrder";
import {
  deleteImg,
  imgFileSelector,
  imgSelector,
} from "src/redux/reducers/imageUpload";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import { payments, systems } from "src/utils/helpers";
import { errorToast, successToast } from "src/utils/toast";

import {
  ContentType,
  FirstlyPayment,
  PaymentTypes,
  SubCategType,
  SystemTypes,
} from "src/utils/types";

//_child before the key of subcateg

const ShowOrder = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [prepay, $prepay] = useState(true);
  const [activeCateg, $activeCateg] = useState<number>();
  const [files, $files] = useState<FormData>();
  // const [images, $images] = useState<FileItem[]>();
  const [phone, $phone] = useState("");
  const [extraPhone, $extraPhone] = useState("");
  const images = useAppSelector(imgSelector);
  const imgFiles = useAppSelector(imgFileSelector);

  const { mutate } = orderMutation();
  const { mutate: dynamicVals } = orderDynamic();

  const [issue_date, $issue_date] = useState<string>();
  const [delivery_date, $delivery_date] = useState<Date>();
  const [created_at, $created_at] = useState<string>();

  const { register, handleSubmit, getValues, reset } = useForm();

  const { data, refetch } = useOrder({ id: Number(id), enabled: !!id });
  const order = data?.order?.[0];

  // const handleFilesSelected = (data: FileItem[]) => {
  //   const formData = new FormData();
  //   data.forEach((item) => {
  //     formData.append("files", item.file, item.file.name);
  //   });
  //   $files(formData);
  //   $images(data);
  // };

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
            <option value={undefined}></option>
            {subCateg.subcat_vs_selval.map((val) => (
              <option key={val.id} value={val.id}>
                {val.content}
              </option>
            ))}
          </MainSelect>
        );
      }

      case ContentType.image: {
        return <UploadComponent name={subCateg.id} />;
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

  const { data: categories, isFetching: categoryLoading } = useCategories({});
  const { data: subCategories, isLoading: subLoading } = useCategoriesFull({
    id: activeCateg,
    enabled: !!activeCateg,
  });

  const renderSubCategs = useMemo(() => {
    if (subLoading && !!activeCateg) return <Loading />;
    if (!subCategories?.category_vs_subcategory.length && !activeCateg)
      return <EmptyList title="Выберите категорию выше" />;

    if (!subCategories?.category_vs_subcategory.length && !subLoading)
      return <EmptyList />;
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

  const renderCategs = useMemo(() => {
    return (
      <div className="mt-4">
        <Typography size={TextSize.XXL}>Направление / Оформление</Typography>
        <div className="w-full mt-4 flex items-center h-full relative">
          {!!categories?.length && !categoryLoading && (
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
          )}
          {!categories?.length && !categoryLoading && (
            <EmptyList title="Категории не найдены" />
          )}

          {categoryLoading && <Loading />}
        </div>
      </div>
    );
  }, [activeCateg, categories, categoryLoading]);

  const renderStates = useMemo(() => {
    return (
      <>
        <BaseInput label="Номер телефона" className="mb-2">
          <PhoneInput
            placeholder={"Введите номер"}
            onChange={$phone}
            value={phone}
          />
        </BaseInput>
        <BaseInput label="Доп. Номер" className="mb-2">
          <PhoneInput
            placeholder={"Введите номер"}
            onChange={$extraPhone}
            value={extraPhone}
          />
        </BaseInput>
        <BaseInput label="Дата оформления" className="mb-2">
          <MainDatePicker
            selected={dayjs(created_at || undefined).toDate()}
            onChange={$created_at}
          />
        </BaseInput>
        <BaseInput label="Дата поставки" className="mb-2">
          <MainDatePicker
            selected={dayjs(delivery_date || undefined).toDate()}
            onChange={$delivery_date}
          />
        </BaseInput>
      </>
    );
  }, [phone, extraPhone, created_at, delivery_date]);

  console.log(images, "images");
  console.log(imgFiles, "imgFiles");

  const onSubmit = () => {
    const {
      address,
      client,
      comment,
      oder_type,
      operator,
      payment_type,
      system,
    } = getValues();
    console.log(getValues(), "allValues");
    const dynamic = subCategories?.category_vs_subcategory.reduce(
      (acc: any, item) => {
        acc[`${item.id}`] = getValues(`${item.id}`);
        return acc;
      },
      {}
    );
    mutate(
      {
        order_user: client,
        phone_number: phone,
        ...(extraPhone && { extra_number: extraPhone }),
        payment_type: Number(payment_type),
        firstly_payment: Number(prepay),
        comment,
        deliver_date: delivery_date,
        address,
        // near_to: "",
        // department_id: "",
        category_id: activeCateg,
        // lat: "",
        // long: "",
        id: Number(id),
      },
      {
        onSuccess: () => {
          refetch();
          successToast("Изменено");
        },
        onError: (e: any) => errorToast(e.message),
      }
    );

    dynamicVals(
      { ...dynamic, ...{ order_id: Number(id) }, imgFiles },
      {
        onSuccess: () => successToast("dynamics submitted"),
        onError: (e: any) => errorToast(e.message),
      }
    );
    // console.log(
    //   subCategories?.category_vs_subcategory.reduce((acc: any, item) => {
    //     acc[`${item.id}_child`] = getValues(`${item.id}`);
    //     return acc;
    //   }, {}),
    //   "ids"
    // );
  };

  useEffect(() => {
    if (order) {
      if (order.order_vs_category?.id) $activeCateg(order.order_vs_category.id);
      $phone(order.phone_number);
      $extraPhone(order.extra_number);
      $delivery_date(order.deliver_date);
      $issue_date(order.created_at);
      $created_at(order.updated_at);

      reset({
        oder_type: !order.is_delivery ? "Самовывоз" : "Доставка",
        client: order.order_user,
        address: order.address,
        payment_type: order.payment_type,
        system: "",
        operator: order.order_vs_user.username,
        comment: order.comment,
      });
    }
  }, [order]);

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
            {renderStates}
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
                  { id: FirstlyPayment.yes, name: "Да" },
                  { id: FirstlyPayment.no, name: "Полностью" },
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
              <MainDatePicker
                selected={dayjs(issue_date || undefined).toDate()}
                onChange={$issue_date}
              />
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
        {renderCategs}
        <div className="mt-6 flex flex-wrap gap-4 min-h-[150px] h-full">
          {renderSubCategs}
        </div>
        <div className="flex gap-4 mt-4">
          {!!Object.values(images)?.length &&
            Object.keys(images).map((img) => {
              return images?.[img].map((item, index) => {
                if (item.file.type.startsWith("image/"))
                  return (
                    <div className="relative">
                      <div className="bg-white rounded-full p-2 absolute top-2 right-1">
                        <CloseIcon
                          onClick={() =>
                            dispatch(
                              deleteImg({
                                key: img,
                                index,
                              })
                            )
                          }
                          className="w-3 h-3 "
                        />
                      </div>
                      <img
                        key={item.id}
                        src={URL.createObjectURL(item.file)}
                        height={100}
                        width={100}
                      />
                    </div>
                  );
              });
            })}
        </div>

        <div className="border-b w-full mt-4" />

        <AddProduct />
      </Card>
    </form>
  );
};

export default ShowOrder;
