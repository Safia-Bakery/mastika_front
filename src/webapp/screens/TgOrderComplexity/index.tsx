import cl from "classnames";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import { TextSize, Weight } from "src/components/Typography";
import { tgAddItem } from "src/redux/reducers/tgWebReducer";
import { useAppDispatch } from "src/redux/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";

const complexityArr = [
  { id: 1, name: "Средний" },
  { id: 2, name: "Сложный" },
  { id: 3, name: "Гравитационный Свадебдный" },
];

const numberArr = [7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27];

const TgOrderComplexity = () => {
  const navigate = useNavigate();
  const [complexity, $complexity] = useState<{ value: number; name: string }>();
  const [floors, $floors] = useState<number>();
  const [portion, $portion] = useState<number>();
  const [modal, $modal] = useState(false);
  const { register, getValues } = useForm();

  const toggleModal = () => $modal((prev) => !prev);

  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    dispatch(
      tgAddItem({
        complexity,
        floors,
        portion,
      })
    );
    navigate("/tg/fillings");
  };

  const renderComplexity = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Укажите степень сложности
        </Texts>
        <div className="flex flex-wrap gap-5 justify-center mt-4">
          {complexityArr.map((item) => {
            const active = item.id === complexity?.value;
            return (
              <TgBtn
                key={item.id}
                onClick={() => $complexity({ name: item.name, value: item.id })}
                className={cl("px-3 !min-w-[140px] max-w-[250px] !w-min", {
                  ["shadow-selected"]: active,
                })}
              >
                <Texts
                  weight={active ? Weight.bold : Weight.regular}
                  className="inline-block !w-min whitespace-nowrap"
                >
                  {item.name}
                </Texts>
              </TgBtn>
            );
          })}
        </div>

        <Selected active={!!complexity}>{`Выбрано: ${complexity}`}</Selected>
      </div>
    );
  }, [complexity]);

  const renderFloors = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder ">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите этажность
        </Texts>

        <div className="flex justify-between mt-4">
          {[...Array(4)].map((_, idx) => {
            const active = idx + 1 === floors;
            return (
              <div
                key={idx}
                onClick={() => $floors(idx + 1)}
                className={cl(
                  "rounded-full bg-tgPrimary w-12 h-12 flex items-center justify-center transition duration-[0.6s]",
                  {
                    ["shadow-selected"]: active,
                  }
                )}
              >
                <Texts
                  weight={active ? Weight.bold : Weight.regular}
                  className="text-white"
                >
                  {idx + 1}
                </Texts>
              </div>
            );
          })}
        </div>
        <Selected active={!!floors}>{`Выбрано: ${floors}`}</Selected>
      </div>
    );
  }, [floors]);

  const renderModal = useMemo(() => {
    const handleManulaPortion = () => {
      $portion(Number(getValues("portionManual")));
      toggleModal();
    };

    return (
      <TgModal isOpen={modal}>
        <form>
          <Texts className="my-4" size={TextSize.XL} uppercase>
            Введите этажность
          </Texts>

          <MainInput
            type="number"
            inputStyle={InputStyle.white}
            register={register("portionManual")}
          />

          <TgBtn onClick={handleManulaPortion} className="mt-4 font-bold">
            OK
          </TgBtn>
        </form>
      </TgModal>
    );
  }, [modal]);

  const renderPortions = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Введите нужное количество порций
        </Texts>

        <div className="flex max-w-[300px] gap-3 flex-wrap mx-auto mt-4">
          {numberArr.map((item) => {
            const active = item === portion;
            return (
              <div
                key={item}
                onClick={() => $portion(item)}
                className={cl(
                  "rounded-full bg-tgPrimary w-10 h-10 flex items-center justify-center transition duration-[0.6s]",
                  {
                    ["shadow-selected"]: active,
                  }
                )}
              >
                <Texts
                  weight={active ? Weight.bold : Weight.regular}
                  className="text-white"
                >
                  {item}
                </Texts>
              </div>
            );
          })}
          <div
            onClick={toggleModal}
            className={cl(
              "rounded-full bg-tgGray w-10 h-10 flex items-center justify-center transition"
            )}
          >
            <Texts className="text-white">+</Texts>
          </div>
        </div>

        <Selected active={!!portion}>{`Выбрано: ${portion}`}</Selected>
      </div>
    );
  }, [portion]);

  return (
    <TgContainer>
      <TgBackBtn link="order-directions" />
      {renderComplexity}
      {renderFloors}
      {renderPortions}

      {renderModal}

      <TgBtn onClick={handleSubmit} className="mt-16 font-bold">
        Далее
      </TgBtn>
    </TgContainer>
  );
};

export default TgOrderComplexity;
