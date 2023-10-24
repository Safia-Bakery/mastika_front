import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import { TextSize } from "src/components/Typography";
import useBranches from "src/hooks/useBranches";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { orderArray } from "src/pages/AddOrder";
import { tgAddItem, tgItemsSelector } from "src/redux/reducers/tgWebReducer";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import { OrderingType } from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import TgBranchSelect from "src/webapp/componets/TgBranchSelect";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";

const TgDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();
  const modal = Number(useQueryString("modal"));
  const items = useAppSelector(tgItemsSelector);
  useBranches({ enabled: items.delivery_type?.value === OrderingType.pickup });

  console.log(items, "items");
  const handleNavigate = (url: string) => navigate(url);
  const onClose = () => removeParams(["modal", "branch"]);

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
            />
          </BaseInput>
          <BaseInput labelClassName="!text-base" label="Адрес">
            <MainInput
              inputStyle={InputStyle.white}
              className="!h-12"
              placeholder={"Введите адрес доставки"}
            />
          </BaseInput>
          <TgBtn
            onClick={() => handleNavigate("/tg/fillings")}
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
            onClick={() => navigateParams({ modal: 1 })}
            className="font-bold mt-2"
          >
            {items.branch?.name ? items.branch.name : "ВЫБЕРИТЕ ФИЛИАЛ"}
          </TgBtn>

          <TgModal onClose={onClose} isOpen={!!modal}>
            <TgBranchSelect />
          </TgModal>
        </>
      );
  }, [items?.delivery_type, modal, items.branch?.name]);

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
          className="!h-6 border !bg-tgGray rounded-md !w-24 !p-0 text-xs !mb-0"
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
      </>
    );
  }, [items]);

  useEffect(() => {
    if (branch?.id)
      dispatch(
        tgAddItem({ branch: { name: branch?.name, value: branch?.id } })
      );
  }, [branch?.id]);

  return (
    <TgContainer>
      <div className="flex justify-between items-center w-full">
        <TgBackBtn link="package" />
        {/* <div className="flex gap-2">
          <div
            onClick={() => navigate(-1)}
            className="rounded-full h-5 w-5 bg-tgGray flex items-center justify-center "
          >
            <img
              height={7}
              width={7}
              src="/assets/icons/backArrow.svg"
              alt="backArrow"
            />
          </div>
          <Texts size={TextSize.M}>Назад</Texts>
        </div> */}
        {renderOrderType}
      </div>

      <Texts className="my-4 " size={TextSize.XL} uppercase>
        Детали заказа
      </Texts>

      {renderType}
      <div className="border-b border-b-tgBorder mt-4" />

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
        />
      </BaseInput>

      <div className="flex justify-between items-center mt-7 mb-4">
        <Texts size={TextSize.XL} uppercase>
          Ваш торт
        </Texts>

        <TgBtn
          onClick={() => null}
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
        onClick={() => handleNavigate("/tg/success")}
        className="font-bold mt-20"
      >
        Подтвердить / Заказать
      </TgBtn>
    </TgContainer>
  );
};

export default TgDetails;
