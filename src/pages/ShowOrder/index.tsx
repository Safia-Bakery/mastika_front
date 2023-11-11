import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AddProduct from "src/components/AddProducts";
import AddSampleImages from "src/components/AddSampleImages";
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
import tgUploadImage from "src/hooks/mutation/tgUploadImage";
import useCategories from "src/hooks/useCategories";
import useCategoriesFull from "src/hooks/useCategoryFull";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useFillings from "src/hooks/useFillings";
import useOrder from "src/hooks/useOrder";
import useQueryString from "src/hooks/useQueryString";
import { baseURL } from "src/main";
import {
  FillingArr,
  PortonNumbers,
  complexityArr,
  floorsArr,
  orderStatus,
  packageArr,
  payments,
  systems,
} from "src/utils/helpers";
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
  const [images, $images] = useState<string[]>();
  const [extraPhone, $extraPhone] = useState("");
  const deny_modal = useQueryString("deny_modal");
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { data, refetch, isLoading } = useOrder({
    id: Number(id),
    enabled: !!id,
  });
  const order = data?.order?.[0];
  const floors = Number(watch("floors"));
  const { mutate: uploadImage } = tgUploadImage();

  const { data: filling } = useFillings({
    ptype: watch("filling_type"),
    enabled: !!watch("filling_type")?.toString(),
  });
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
        return <input type="file" {...register(`${subCateg.id}`)} />;
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
    if (!subCategories?.category_vs_subcategory?.length && !activeCateg)
      return <EmptyList title="Выберите категорию выше" />;

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
        return "";
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
        <BaseInput label="Гость / Клиент" className="mb-2">
          <PhoneInput
            placeholder={"Введите номер"}
            onChange={$phone}
            disabled
            value={phone}
          />
        </BaseInput>
        <BaseInput label="Менеджер / Управляющий магазина" className="mb-2">
          <PhoneInput
            placeholder={"Введите номер"}
            onChange={$extraPhone}
            disabled
            value={extraPhone}
          />
        </BaseInput>
        <BaseInput label="Дата оформления" className="mb-2">
          <MainDatePicker
            placeholder={"Не задано"}
            disabled
            selected={created_at ? dayjs(created_at).toDate() : undefined}
            onChange={$created_at}
          />
        </BaseInput>
        <BaseInput label="Дата поставки" className="mb-2">
          <MainDatePicker
            placeholder={"Не задано"}
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
      payment_type,
      complexity,
      packaging,
      color_details,
      portion,
      sample_img,
    } = getValues();

    const filler = [...Array(floors)].reduce((acc: any, _, idx) => {
      acc[idx + 1] = getValues(`filling${idx + 1}`)?.toString();
      return acc;
    }, {});
    const color = [...Array(floors)].reduce((acc: any, _, idx) => {
      acc[idx + 1] = getValues(`color${idx + 1}`);
      return acc;
    }, {});
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
        payment_type: Number(payment_type),
        firstly_payment: Number(prepay),
        comment,
        deliver_date: delivery_date,
        address,
        id: Number(id),
        portion: Number(portion),
        category_id: activeCateg,
        complexity: Number(complexity),
        packaging: Number(packaging),
        color,
        color_details,
        is_bot: 0,
        filler,
        ...(extraPhone && { extra_number: extraPhone }),
        ...(images && { images }),
      },
      {
        onSuccess: () => {
          refetch();
          successToast("Изменено");
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
    if (sample_img?.length) {
      const filesArray = Array.from(sample_img);
      const formData = new FormData();
      filesArray.forEach((file: any, index) => {
        formData.append("image", file);
      });
      uploadImage(formData, {
        onSuccess: () => {
          successToast("image uploaded");
        },
      });
    }

    dynamicVals(
      { ...dynamic, ...{ order_id: Number(id) } },
      {
        onSuccess: () => successToast("dynamics submitted"),
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  const handleStatus = (status: OrderStatus) => {
    if (!order?.order_vs_category?.id) {
      return alert("Выберите направление");
    } else {
      mutate(
        { status, id: Number(id), reject_reason: getValues("cancel_reason") },
        {
          onSuccess: () => {
            successToast("status changed");
            refetch();
          },
        }
      );
    }
  };

  const renderImg = useMemo(() => {
    if (uploadedImg?.url)
      return (
        <div className="flex gap-4 mt-4">
          <div className="">
            <Typography className="mb-3 flex">{uploadedImg.name}:</Typography>
            <img
              src={`${baseURL}/files/${uploadedImg.url}`}
              height={100}
              width={100}
            />
          </div>
        </div>
      );
  }, [uploadedImg?.url]);

  const resetFillings = useCallback(() => {
    setTimeout(() => {
      if (!!order?.order_fill?.length) {
        order.order_fill.map((item) => {
          setValue(`filling${item.floor}`, item.filling_id);
        });
      }
    }, 300);
  }, [order?.order_fill]);

  const resetColors = useCallback(() => {
    if (!!order?.color) {
      setTimeout(() => {
        Object.keys(order?.color).map((item) => {
          setValue(`color${item}`, order?.color?.[item]);
        });
      }, 300);
    }
  }, [order?.color, order?.color_details]);

  //#reset
  useEffect(() => {
    if (order) {
      if (order.order_vs_category?.id) $activeCateg(order.order_vs_category.id);
      $phone(order.phone_number);
      $extraPhone(order.extra_number);
      $delivery_date(order.deliver_date);
      $updated_at(order.updated_at);
      $created_at(order.created_at);
      $prepay(!!order.firstly_payment);
      resetColors();
      resetFillings();
      reset({
        order_type: !order.is_delivery ? "Самовывоз" : "Доставка",
        client: order.order_user,
        address: order.address,
        payment_type: order.payment_type,
        operator: order.order_vs_user?.username,
        comment: order.comment,
        system: !order.is_bot ? 2 : 1,
        complexity: order.complexity,
        packaging: order.packaging,
        portion: order.portion,
        house: order.apartment,
        home: order.home,
        refAddr: order.near_to,
        color_details: order.color_details,
        floors: order.order_fill.length,
        reject_reason: order.reject_reason,

        filling_type: order?.order_fill?.[0]?.filler?.ptype,
        ...(!order.is_delivery && { branch: order.order_br?.branch_dr?.name }),
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
            <BaseInput label="Комментарии" className="mt-4">
              <MainTextArea register={register("cancel_reason")} />
            </BaseInput>

            <Button
              className="bg-primary text-white absolute bottom-2 w-[initial]"
              onClick={() => handleStatus(OrderStatus.rejected)}
            >
              Отправить
            </Button>
          </div>
        </form>
      </Modal>
    );
  }, [deny_modal, order?.status]);

  const renderStatus = useMemo(() => {
    return (
      <div className="flex flex-col">
        <Typography size={TextSize.S}>
          Статус: {orderStatus(order?.status).text}
        </Typography>
      </div>
    );
  }, [order?.status]);

  const renderSampleImage = useMemo(() => {
    if (!!order?.images?.length)
      return (
        <div className="mt-6">
          <Typography size={TextSize.XXL}>Примерный вариант торта</Typography>
          <div className="max-w-md w-full flex flex-wrap gap-4 mt-4">
            {order?.images.map((item) => (
              <img
                src={`${baseURL}/${item}`}
                className="object-contain"
                alt="uploaded-image"
                key={item}
              />
            ))}
          </div>
        </div>
      );
    return null;
  }, [order?.images]);

  const renderFloors = useMemo(() => {
    return (
      <>
        <BaseInput label="Этажность" className="mb-2 flex flex-col w-60">
          <MainSelect
            values={floorsArr}
            inputStyle={InputStyle.primary}
            register={register("floors")}
          />
        </BaseInput>
        <BaseInput
          label="Количество порции"
          className="mb-2 flex flex-col w-60"
        >
          <MainSelect register={register("portion")}>
            <option value={undefined} />
            {!!floors &&
              PortonNumbers[floors].map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
          </MainSelect>
        </BaseInput>
        {!!floors &&
          [...Array(floors)].map((_, item) => (
            <BaseInput
              label={`Начинка ${item + 1} этаж`}
              className="mb-2 flex flex-col w-60"
              key={item}
            >
              <MainSelect
                values={filling}
                inputStyle={InputStyle.primary}
                register={register(`filling${item + 1}`)}
              />
            </BaseInput>
          ))}
        {!!floors &&
          [...Array(floors)].map((_, item) => (
            <BaseInput
              label={`Палитра ${item + 1} этаж`}
              className="mb-2 flex flex-col w-60"
              key={item}
            >
              <MainInput register={register(`color${item + 1}`)} />
            </BaseInput>
          ))}
      </>
    );
  }, [watch("floors"), filling, order?.order_fill, order?.portion]);

  const renderPrepay = useMemo(() => {
    return (
      <BaseInput label="Предоплата" className="mb-2">
        <MainRadioBtns
          value={prepay}
          onChange={(e) => $prepay(e)}
          values={[
            { id: FirstlyPayment.yes, name: "Да" },
            { id: FirstlyPayment.no, name: "Полностью" },
          ]}
        />
      </BaseInput>
    );
  }, [prepay]);

  const renderChangedDate = useMemo(() => {
    if (updated_at)
      return (
        <BaseInput label="Дата изменения" className="mb-2">
          <MainDatePicker
            placeholder={"Не задано"}
            disabled
            selected={dayjs(updated_at).toDate()}
            onChange={$updated_at}
          />
        </BaseInput>
      );
    return null;
  }, [updated_at]);

  useEffect(() => {
    setTimeout(() => {
      if (!!data?.value && !!subCategories?.category_vs_subcategory?.length) {
        data.value.map((item) => {
          setValue(`${item.subcat_id}`, `${resetVals(item)}`);
        });
      }
    }, 100);
  }, [subCategories?.category_vs_subcategory, data?.value]);

  if (isLoading) return <Loading absolute />;

  return (
    <>
      {/* <Header /> */}

      <Card title={`Заказ №${id}`} className="px-8 pt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStatus}
          <div className="flex flex-1">
            <div className="p-2 flex flex-1 gap-4">
              <div className="w-80 pr-10 border-r">
                <BaseInput label="Тип заказа" className="my-2">
                  <MainInput
                    disabled
                    placeholder={"Введите имя"}
                    register={register("order_type")}
                  />
                </BaseInput>
                <BaseInput label="Клиент" className="mb-2">
                  <MainInput
                    placeholder={"Введите номер"}
                    disabled
                    register={register("client")}
                  />
                </BaseInput>
                {renderStates}
                {order?.is_delivery ? (
                  <>
                    <BaseInput label="Адрес доставки" className="mb-2">
                      <MainInput register={register("address")} disabled />
                    </BaseInput>

                    <div className="flex gap-3">
                      <BaseInput label="Дом" className="mb-2 flex-1">
                        <MainInput register={register("house")} />
                      </BaseInput>
                      <BaseInput label="Квартира" className="mb-2 flex-1">
                        <MainInput register={register("home")} />
                      </BaseInput>
                    </div>
                    <BaseInput label="Ориентир" className="mb-2">
                      <MainInput register={register("refAddr")} />
                    </BaseInput>
                  </>
                ) : (
                  <BaseInput label="Филиал" className="mb-2">
                    <MainInput register={register("branch")} disabled />
                  </BaseInput>
                )}
              </div>

              <div className="flex flex-1 flex-col">
                {renderPrepay}

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
                    disabled
                  />
                </BaseInput>
                <BaseInput label="Оператор" className="mb-2">
                  <MainInput register={register("operator")} disabled />
                </BaseInput>
                {renderChangedDate}
                {order?.reject_reason && (
                  <BaseInput label="Причина отклонении" className="mb-2">
                    <MainInput register={register("reject_reason")} disabled />
                  </BaseInput>
                )}

                <BaseInput label="Комментарии" className="mb-2">
                  <MainTextArea register={register("comment")} />
                </BaseInput>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <Button className="bg-darkYellow mt-4 w-64" type="submit">
              Сохранить
            </Button>
          </div>

          <div className="border-b w-full mt-4" />
          {renderCategs}
          {!!activeCateg && (
            <>
              <div className="mt-6 flex flex-wrap gap-4 min-h-[150px] h-full">
                <BaseInput
                  label="Сложность"
                  className="mb-2 flex flex-col w-60"
                >
                  <MainSelect
                    values={complexityArr}
                    inputStyle={InputStyle.primary}
                    register={register("complexity")}
                  />
                </BaseInput>

                <BaseInput
                  label="Тип начинки"
                  className="mb-2 flex flex-col w-60"
                >
                  <MainSelect
                    values={FillingArr}
                    inputStyle={InputStyle.primary}
                    register={register("filling_type")}
                  />
                </BaseInput>
                {renderFloors}

                <BaseInput
                  label={"Цвет деталей"}
                  className="mb-2 flex flex-col w-60"
                >
                  <MainInput
                    inputStyle={InputStyle.primary}
                    register={register("color_details")}
                  />
                </BaseInput>
              </div>
              {renderImg}
            </>
          )}
          {renderSubCategs}
          <div className="border-b w-full mt-4" />

          {!order?.images.length && <AddSampleImages setImages={$images} />}
        </form>

        <AddProduct />

        {order?.status === OrderStatus.new && (
          <div className="flex gap-[15px] justify-end mt-8">
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
        {renderSampleImage}
      </Card>

      {renderModal}
    </>
  );
};

export default ShowOrder;
