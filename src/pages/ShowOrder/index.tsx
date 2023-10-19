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
import Header from "src/components/Header";
import Loading from "src/components/Loader";
import Modal from "src/components/Modal";
import Typography, { TextSize } from "src/components/Typography";
import orderMutation from "src/hooks/mutation/order";
import orderDynamic from "src/hooks/mutation/orderDynamic";
import useCategories from "src/hooks/useCategories";
import useCategoriesFull from "src/hooks/useCategoryFull";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useOrder from "src/hooks/useOrder";
import useQueryString from "src/hooks/useQueryString";
import { baseURL } from "src/main";
import { orderStatus, payments, systems } from "src/utils/helpers";
import { errorToast, successToast } from "src/utils/toast";

import {
  ContentType,
  FirstlyPayment,
  OrderStatus,
  OrderValueType,
  SubCategType,
} from "src/utils/types";

const ShowOrder = () => {
  const { id } = useParams();
  const [prepay, $prepay] = useState(true);
  const [activeCateg, $activeCateg] = useState<number>();
  const [phone, $phone] = useState("");
  const [extraPhone, $extraPhone] = useState("");
  const deny_modal = useQueryString("deny_modal");
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();

  const [uploadedImg, $uploadedImg] = useState<{ name: string; url: string }>();

  const { data: categories, isFetching: categoryLoading } = useCategories({});
  const { data: subCategories, isLoading: subLoading } = useCategoriesFull({
    id: activeCateg,
    enabled: !!activeCateg,
  });

  const { mutate } = orderMutation();
  const { mutate: dynamicVals } = orderDynamic();

  const [updated_at, $updated_at] = useState<string>();
  const [delivery_date, $delivery_date] = useState<Date>();
  const [created_at, $created_at] = useState<string>();

  const { register, handleSubmit, getValues, reset, setValue } = useForm();

  const { data, refetch } = useOrder({ id: Number(id), enabled: !!id });
  const order = data?.order?.[0];

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
        // return <UploadComponent name={subCateg.id} />;
        return (
          <input type="file" multiple={false} {...register(`${subCateg.id}`)} />

          // <div className="w-full max-w-xs mx-auto">
          //   <label
          //     htmlFor="fileInput"
          //     className="block text-gray-600 text-sm font-bold"
          //   >
          //     Choose a file:
          //   </label>
          //   <label className="w-full flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm cursor-pointer">
          //     <span className="text-sm">Select File</span>
          //     <input
          //       type="file"
          //       id="fileInput"
          //       name="fileInput"
          //       className="hidden"
          //     />
          //   </label>

          // </div>
        );
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

  const resetVals = (item: OrderValueType) => {
    switch (item.value_vs_subcat.contenttype_id) {
      case ContentType.image: {
        $uploadedImg({ name: item.value_vs_subcat.name, url: item.content });
        break;
      }

      case ContentType.string:
        return item.content;
      case ContentType.number:
        return item.content;
      case ContentType.select:
        return item.select_id;

      default:
        break;
    }
  };

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
            selected={created_at ? dayjs(created_at).toDate() : undefined}
            onChange={$created_at}
          />
        </BaseInput>
        <BaseInput label="Дата поставки" className="mb-2">
          <MainDatePicker
            selected={delivery_date ? dayjs(delivery_date).toDate() : undefined}
            onChange={$delivery_date}
          />
        </BaseInput>
      </>
    );
  }, [phone, extraPhone, created_at, delivery_date]);

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
    const dynamic = subCategories?.category_vs_subcategory.reduce(
      (acc: any, item) => {
        if (!!getValues(`${item.id}`))
          acc[`${item.id}`] =
            typeof getValues(`${item.id}`) == "object"
              ? getValues(`${item.id}`)[0]
              : getValues(`${item.id}`);
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
      { ...dynamic, ...{ order_id: Number(id) } },
      {
        onSuccess: () => successToast("dynamics submitted"),
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  const handleStatus = (status: OrderStatus) => {
    mutate(
      { status, id: Number(id), deny_reason: getValues("cancel_reason") },
      {
        onSuccess: () => {
          successToast("status changed");
          refetch();
        },
      }
    );
  };

  const renderImg = useMemo(() => {
    if (uploadedImg?.url)
      return (
        <div className="flex gap-4 mt-4">
          <div className="">
            <Typography className="mb-3 flex">{uploadedImg.name}:</Typography>
            <img src={baseURL + uploadedImg.url} height={100} width={100} />
          </div>
        </div>
      );
  }, [uploadedImg?.url]);

  useEffect(() => {
    if (order) {
      if (order.order_vs_category?.id) $activeCateg(order.order_vs_category.id);
      $phone(order.phone_number);
      $extraPhone(order.extra_number);
      $delivery_date(order.deliver_date);
      $updated_at(order.updated_at);
      $created_at(order.created_at);

      reset({
        oder_type: !order.is_delivery ? "Самовывоз" : "Доставка",
        client: order.order_user,
        address: order.address,
        payment_type: order.payment_type,
        system: "",
        operator: order.order_vs_user.username,
        comment: order.comment,
        ...(!order.is_delivery && { branch: order.order_br.name }),
      });
    }
  }, [order]);

  const renderModal = useMemo(() => {
    return (
      <Modal
        isOpen={!!deny_modal && order?.status === OrderStatus.new}
        onClose={() => removeParams(["deny_modal"])}
      >
        <form className="p-3 h-full">
          <div className="flex w-full justify-between items-center">
            <Typography size={TextSize.XXL}>Причина отклонении</Typography>
            <CloseIcon onClick={() => removeParams(["deny_modal"])} />
          </div>

          <div className="flex flex-col justify-between h-full">
            {/* <BaseInput label="Выберите причину">
          <MainSelect
            register={register("fixedReason", {
              required: "Обязательное поле",
            })}
          >
            <option value={undefined} />

            {Object.keys(CancelReason).map((item) => (
              <option key={item} value={item}>
                {CancelReason[+item]}
              </option>
            ))}
          </MainSelect>
        </BaseInput>

        {getValues("fixedReason") == 4 && ( */}
            <BaseInput label="Комментарии" className="mt-4">
              <MainTextArea register={register("cancel_reason")} />
            </BaseInput>
            {/* )} */}

            <Button
              className="bg-primary text-white absolute bottom-2 right-2 left-2 w-[initial]"
              onClick={() => handleStatus(OrderStatus.rejected)}
            >
              Отправить
            </Button>
          </div>
        </form>
      </Modal>
    );
  }, [deny_modal, order?.status]);

  useEffect(() => {
    setTimeout(() => {
      if (!!data?.value && !!subCategories?.category_vs_subcategory?.length) {
        data.value.map((item) => {
          setValue(`${item.subcat_id}`, `${resetVals(item)}`);
        });
      }
    }, 200);
  }, [subCategories?.category_vs_subcategory, data?.value]);

  return (
    <>
      <Header />

      <Card title={`Заказ №${id}`} className="px-8 pt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Typography size={TextSize.S}>
              Статус: {orderStatus(order?.status)}
            </Typography>
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
              {order?.is_delivery ? (
                <BaseInput label="Адрес доставки" className="mb-2">
                  <MainInput register={register("address")} />
                </BaseInput>
              ) : (
                <BaseInput label="Филиал" className="mb-2">
                  <MainInput register={register("branch")} />
                </BaseInput>
              )}
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
                  selected={updated_at ? dayjs(updated_at).toDate() : undefined}
                  onChange={$updated_at}
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
          {renderImg}

          <div className="border-b w-full mt-4" />
        </form>
        <AddProduct />

        {order?.status === OrderStatus.new && (
          <div className="flex gap-[15px] justify-end mt-8 ">
            <Button
              onClick={() => navigateParams({ deny_modal: 1 })}
              className="bg-danger mt-4 w-40 text-white"
              type="submit"
            >
              Отклонить
            </Button>
            <Button
              onClick={() => handleStatus(OrderStatus.accepted)}
              className="bg-darkBlue mt-4 w-40 text-white"
              type="submit"
            >
              Принять
            </Button>
          </div>
        )}
      </Card>

      {renderModal}
    </>
  );
};

export default ShowOrder;
