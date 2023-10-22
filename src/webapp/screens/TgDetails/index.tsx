import BaseInput from "src/components/BaseInputs";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import MainSelect from "src/components/BaseInputs/MainSelect";
import { TextSize } from "src/components/Typography";
import { orderArray } from "src/pages/AddOrder";
import Texts from "src/webapp/componets/Texts";
import TgContainer from "src/webapp/componets/TgContainer";

const TgDetails = () => {
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

      <BaseInput labelClassName="!text-base" label="Гость / Клиент">
        <MainInput
          inputStyle={InputStyle.white}
          className="!h-12"
          placeholder={"Введите номер телефона"}
        />
      </BaseInput>
      <BaseInput
        labelClassName="!text-base"
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
    </TgContainer>
  );
};

export default TgDetails;
