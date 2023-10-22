import { useMemo, useState } from "react";
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
import { OrderType, OrderingType } from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBranchSelect from "src/webapp/componets/TgBranchSelect";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";

const TgDetails = () => {
  const navigate = useNavigate();
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();
  const modal = Number(useQueryString("modal"));
  const [orderType, $orderType] = useState<OrderingType>();
  useBranches({ enabled: orderType === OrderingType.pickup });

  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const handleNavigate = (url: string) => navigate(url);
  const onClose = () => removeParams(["modal", "branch"]);

  const renderType = useMemo(() => {
    if (orderType === OrderingType.delivery)
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
            {branch?.name ? branch.name : "ВЫБЕРИТЕ ФИЛИАЛ"}
          </TgBtn>

          <TgModal onClose={onClose} isOpen={!!modal}>
            <TgBranchSelect />
          </TgModal>
        </>
      );
  }, [orderType, modal]);
  return (
    <TgContainer>
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2">
          <div
            onClick={close}
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
        </div>
        <MainSelect
          values={orderArray}
          inputStyle={InputStyle.white}
          className="!h-6 border !bg-tgGray rounded-md !w-24 !p-0 text-xs !mb-0"
        />
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

      <div className="flex justify-between items-center">
        <Texts size={TextSize.L}>Направление</Texts>

        <Texts size={TextSize.L}>Мастичный</Texts>
      </div>

      <div className="border-b border-b-tgBorder mt-5" />

      <div className="flex justify-between items-center">
        <Texts size={TextSize.L}>Стоимость торта</Texts>

        <Texts size={TextSize.L}>371 000 сум</Texts>
      </div>
      <div className="flex justify-between items-center mt-1">
        <Texts size={TextSize.L}>Доставка</Texts>

        <Texts size={TextSize.L}>100 000 сум</Texts>
      </div>

      {/* total */}

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
