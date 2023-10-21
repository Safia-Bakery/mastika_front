import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";
import cl from "classnames";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";

const fillingArr = [
  { id: 1, name: "Стандартная" },
  { id: 2, name: "Премиум" },
  { id: 3, name: "ПП" },
];

const TgFillings = () => {
  const navigate = useNavigate();
  const [filling, $filling] = useState<number>();
  const [colorModal, $colorModal] = useState(false);

  const handleNavigate = (url: string) => () => navigate(url);

  const toggleModal = () => $colorModal((prev) => !prev);

  const renderModal = useMemo(() => {
    return (
      <TgModal
        isOpen={colorModal}
        onClose={toggleModal}
        className="overflow-auto"
      >
        <div className="relative">
          <div
            onClick={toggleModal}
            className="rounded-full h-5 w-5 bg-[#C3D2DC] flex items-center justify-center absolute top-[50%] -translate-y-[50%]"
          >
            <img
              height={7}
              width={7}
              src="/assets/icons/backArrow.svg"
              alt="backArrow"
              className="transition-all"
            />
          </div>
          <Texts size={TextSize.M} weight={Weight.bold} alignCenter uppercase>
            Таблица цветов
          </Texts>
        </div>
        <img
          src="/assets/images/colors.png"
          className="max-h-[580px] h-full w-full"
          alt="color-palette"
        />
      </TgModal>
    );
  }, [colorModal]);
  return (
    <TgContainer>
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Укажите степень сложности
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
          {fillingArr.map((item) => {
            const active = item.id === filling;
            return (
              <TgBtn
                key={item.id}
                onClick={() => $filling(item.id)}
                className={cl("px-3 max-w-[85px] !h-[30px]", {
                  ["shadow-selected"]: active,
                })}
              >
                <Texts
                  size={TextSize.S}
                  weight={active ? Weight.bold : Weight.regular}
                  className="inline-block !w-min whitespace-nowrap"
                >
                  {item.name}
                </Texts>
              </TgBtn>
            );
          })}
        </div>

        <Selected active={!!filling}>{`Выбрано: ${filling}`}</Selected>
      </div>

      <div className="border-b border-b-tgBorder mt-6">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите начинку: 1 этаж
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {[...Array(6)].map((_, idx) => {
            const active = idx === 1;
            return (
              <TgBtn
                key={idx}
                onClick={() => $filling(idx)}
                className={cl("px-3 max-w-[85px] !h-[30px]", {
                  ["shadow-selected"]: active,
                })}
              >
                <Texts
                  weight={active ? Weight.bold : Weight.regular}
                  className="inline-block !w-min whitespace-nowrap"
                >
                  {"Радуга"}
                </Texts>
              </TgBtn>
            );
          })}
        </div>

        <Selected active={!!filling}>{`Выбрано: ${filling}`}</Selected>
      </div>
      <div className="border-b border-b-tgBorder mt-6">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите начинку: 2 этаж
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {[...Array(6)].map((_, idx) => {
            const active = idx === 1;
            return (
              <TgBtn
                key={idx}
                onClick={() => $filling(idx)}
                className={cl("px-3 max-w-[85px] !h-[30px]", {
                  ["shadow-selected"]: active,
                })}
              >
                <Texts
                  weight={active ? Weight.bold : Weight.regular}
                  className="inline-block !w-min whitespace-nowrap"
                >
                  {"Радуга"}
                </Texts>
              </TgBtn>
            );
          })}
        </div>

        <Selected active={!!filling}>{`Выбрано: ${filling}`}</Selected>
      </div>
      <div className="flex justify-between mt-4">
        <Texts size={TextSize.XL} uppercase>
          Введите номер палитры для:{" "}
          <Texts weight={Weight.bold} size={TextSize.XL} uppercase>
            этаж 1
          </Texts>
        </Texts>
        <div onClick={toggleModal}>
          <img src="/assets/icons/info.svg" alt="info" />
        </div>
      </div>

      <MainInput
        inputStyle={InputStyle.white}
        className="border rounded-xl border-tgBorder mt-3 !h-12"
        placeholder="№"
      />

      <TgBtn onClick={handleNavigate("/tg/package")} className="mt-7">
        <Texts
          weight={Weight.bold}
          className="inline-block !w-min whitespace-nowrap"
        >
          Далее
        </Texts>
      </TgBtn>

      {renderModal}
    </TgContainer>
  );
};

export default TgFillings;
