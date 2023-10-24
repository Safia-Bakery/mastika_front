import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";
import cl from "classnames";
import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import { tgAddItem, tgItemsSelector } from "src/redux/reducers/tgWebReducer";
import { useForm } from "react-hook-form";

const fillingArr = [
  { id: 1, name: "Стандартная" },
  { id: 2, name: "Премиум" },
  { id: 3, name: "ПП" },
];

const TgFillings = () => {
  const navigate = useNavigate();

  const [colorModal, $colorModal] = useState(false);
  const dispatch = useAppDispatch();

  const { register, getValues, reset, watch } = useForm();

  const { filling_type, floors, filling, palette } =
    useAppSelector(tgItemsSelector);

  const handleSubmit = () => {
    const paletteVals = [...Array(floors)].reduce((acc, _, idx) => {
      acc[idx + 1] = getValues(`${idx + 1}`);
      return acc;
    }, {});
    dispatch(
      tgAddItem({ palette: paletteVals, palette_details: getValues("details") })
    );
    navigate("/tg/package");
  };

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
            className="rounded-full h-5 w-5 bg-tgGray flex items-center justify-center absolute top-[50%] -translate-y-[50%]"
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

  const renderFillingType = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Укажите степень сложности
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
          {fillingArr.map((item) => {
            const active = item.id === filling_type?.value;
            return (
              <TgBtn
                key={item.id}
                onClick={() =>
                  dispatch(
                    tgAddItem({
                      filling_type: { name: item.name, value: item.id },
                    })
                  )
                }
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

        <Selected
          active={!!filling_type?.value}
        >{`Выбрано: ${filling_type?.name}`}</Selected>
      </div>
    );
  }, [filling_type]);

  const renderFillingFloors = useMemo(() => {
    return [...Array(floors)].map((_, idx) => {
      return (
        <div className="border-b border-b-tgBorder mt-6" key={idx}>
          <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
            Выберите начинку: {idx + 1} этаж
          </Texts>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {[...Array(6)].map((_, childIdx) => {
              const active = childIdx === filling?.[idx + 1]?.value;
              return (
                <TgBtn
                  key={childIdx}
                  onClick={() =>
                    dispatch(
                      tgAddItem({
                        filling: {
                          ...filling,
                          ...{ [idx + 1]: { name: "Радуга", value: childIdx } },
                        },
                      })
                    )
                  }
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

          <Selected active={!!filling?.[idx + 1]?.name}>{`Выбрано: ${
            filling?.[idx + 1]?.value
          }`}</Selected>
        </div>
      );
    });
    // return (
    //   // <div className="border-b border-b-tgBorder mt-6">
    //   //   <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
    //   //     Выберите начинку: 1 этаж
    //   //   </Texts>
    //   //   <div className="flex flex-wrap gap-3 justify-center mt-4">
    //   //     {[...Array(6)].map((_, idx) => {
    //   //       const active = idx === 1;
    //   //       return (
    //   //         <TgBtn
    //   //           key={idx}
    //   //           onClick={() => $filling(idx)}
    //   //           className={cl("px-3 max-w-[85px] !h-[30px]", {
    //   //             ["shadow-selected"]: active,
    //   //           })}
    //   //         >
    //   //           <Texts
    //   //             weight={active ? Weight.bold : Weight.regular}
    //   //             className="inline-block !w-min whitespace-nowrap"
    //   //           >
    //   //             {"Радуга"}
    //   //           </Texts>
    //   //         </TgBtn>
    //   //       );
    //   //     })}
    //   //   </div>

    //   //   <Selected active={!!filling}>{`Выбрано: ${filling}`}</Selected>
    //   // </div>
    // );
  }, [filling]);

  const renderPaletteFloors = useMemo(() => {
    return (
      <>
        {[...Array(floors)].map((_, idx) => {
          return (
            <Fragment key={idx}>
              {/* <div className="flex justify-between "> */}
              <Texts size={TextSize.XL} className="mt-4" uppercase>
                Введите номер палитры для:{" "}
                <Texts weight={Weight.bold} size={TextSize.XL} uppercase>
                  этаж {idx + 1}
                </Texts>
              </Texts>
              <div className="relative">
                <MainInput
                  inputStyle={InputStyle.white}
                  className="border rounded-xl border-tgBorder mt-3 !h-12"
                  type="color"
                  register={register(`${idx + 1}`)}
                />
              </div>
            </Fragment>
          );
        })}

        <Texts size={TextSize.XL} className="mt-4" uppercase>
          Введите номер палитры для:{" "}
          <Texts weight={Weight.bold} size={TextSize.XL} uppercase>
            Деталей
          </Texts>
        </Texts>
        <div className="relative">
          <MainInput
            inputStyle={InputStyle.white}
            className="border rounded-xl border-tgBorder mt-3 !h-12"
            type="color"
            placeholder="№"
            register={register("details")}
          />
        </div>
      </>
    );
  }, [palette]);

  return (
    <TgContainer>
      <form>
        {renderFillingType}
        {renderFillingFloors}
        {renderPaletteFloors}
        <TgBtn onClick={handleSubmit} className="mt-7">
          <Texts
            weight={Weight.bold}
            className="inline-block !w-min whitespace-nowrap font-bold"
          >
            Далее
          </Texts>
        </TgBtn>
        {renderModal}
      </form>
    </TgContainer>
  );
};

export default TgFillings;
