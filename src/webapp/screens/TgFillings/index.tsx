import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";
import cl from "classnames";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography, { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { tgAddItem, tgItemsSelector } from "src/store/reducers/tgWebReducer";
import { useForm } from "react-hook-form";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import useFillings from "src/hooks/useFillings";
import { FillingArr } from "src/utils/helpers";
import { CustomObj } from "src/utils/types";
import Loading from "src/components/Loader";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import useProducts from "src/hooks/useProducts";

const paletteColors = [
  { palette: "white", color: "#FFFFFF" },
  { palette: 454, color: "#E8E7D5" },
  { palette: 453, color: "#DCD8BD" },
  { palette: 452, color: "#C5C19C" },
  { palette: 451, color: "#B2AA7C" },
  { palette: 4675, color: "#F1D9BF" },
  { palette: 466, color: "#DFC298" },
  { palette: 465, color: "#CFAB79" },
  { palette: 7500, color: "#F8F2D8" },
  { palette: 7501, color: "#F1E6C8" },
  { palette: 7502, color: "#E8D4A2" },
  { palette: 7503, color: "#C9B18B" },
  { palette: 7504, color: "#A78562" },
  { palette: 7505, color: "#A78562" },
  { palette: 871, color: "#A29060" },
  { palette: 872, color: "#B6985A" },
  { palette: 876, color: "#BA8748" },
  { palette: "Warm Grey 2", color: "#EAE5DF" },
  { palette: "Warm Grey 3", color: "#D9D2C8" },
  { palette: "Warm Grey 4", color: "#CAC3B9" },
  { palette: "Warm Grey 5", color: "#BEB7AD" },
  { palette: "Warm Grey 6", color: "#BBB1A5" },
  { palette: "Warm Grey 7", color: "#ABA197" },
  { palette: "Warm Grey 8", color: "#A3958A" },
  { palette: "Warm Grey 10", color: "#877C6A" },
  { palette: "Warm Grey 11", color: "#7B6B56" },
  { palette: 7530, color: "#B7AC96" },
  { palette: 7531, color: "#988670" },
];

interface Errortypes {
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  filling_type?: string;
  filling?: string;
}

const TgFillings = () => {
  const navigate = useNavigate();
  const modal = useQueryString("modal");
  const { register, getValues, setValue } = useForm();
  const [selectFilling, $selectFilling] = useState<{
    name?: string;
    value?: number | string;
  }>();
  const [filling, $filling] = useState<CustomObj>();
  const [error, $error] = useState<Errortypes>();
  const items = useAppSelector(tgItemsSelector);
  const navigateParams = useNavigateParams();
  const removeParams = useRemoveParams();

  useEffect(() => {
    if (items.filling) {
      $filling(items.filling);
    }
  }, []);

  const { data: fillings, isFetching } = useFillings({
    ptype: Number(selectFilling?.value),
    enabled: String(selectFilling?.value) !== "undefined",
  });

  const dispatch = useAppDispatch();

  const { filling_type, floors, palette } = useAppSelector(tgItemsSelector);

  const closeModal = () => removeParams(["modal"]);

  const handleModal = (modal: string | number) => () =>
    navigateParams({ modal });

  const handleFilling = (val: CustomObj) => () =>
    $filling((prev) => ({ ...prev, ...val }));

  const handleSubmit = () => {
    if (!filling || Object.keys(filling).length !== floors || !selectFilling) {
      if (!filling || Object.keys(filling).length !== floors)
        $error({ filling: "fillings are required" });

      if (!selectFilling) $error({ filling_type: "filling type is required" });
    } else {
      const paletteVals = [...Array(floors)].reduce((acc, _, idx) => {
        acc[`${idx + 1}`] = getValues(`${idx + 1}`).toString();
        return acc;
      }, {});

      dispatch(
        tgAddItem({
          palette: paletteVals,
          palette_details: getValues("details").toString(),
          filling_type: selectFilling,
          filling,
        })
      );
      navigate("/tg/package");
    }
  };

  const handlePalette = (num: number | string) => () => {
    setValue(`${modal}`, num);
    closeModal();
  };

  const renderModal = useMemo(() => {
    return (
      <TgModal
        isOpen={!!modal}
        onClose={closeModal}
        className="overflow-y-auto"
      >
        <div className="relative">
          <div
            onClick={closeModal}
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

        <div className="flex flex-wrap gap-4">
          {paletteColors.map((item) => (
            <div
              key={item.palette}
              onClick={handlePalette(item.palette)}
              className={cl("w-[90px] h-7 rounded-md")}
              style={{ background: item.color }}
            />
          ))}
        </div>
      </TgModal>
    );
  }, [modal]);

  const renderFillingType = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите тип начинки
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
          {FillingArr.map((item) => {
            const active = item.id === selectFilling?.value;
            return (
              <TgBtn
                key={item.id}
                onClick={() =>
                  $selectFilling({ value: item.id, name: item.name })
                }
                className={cl("px-3 max-w-[85px] !h-[30px]", {
                  ["shadow-selected !bg-tgSelected"]: active,
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
        {selectFilling?.name ? (
          <Selected
            active={!!selectFilling?.name}
          >{`Выбрано: ${selectFilling?.name}`}</Selected>
        ) : (
          <Typography
            className="text-red-600 w-full my-2"
            size={TextSize.M}
            alignCenter
          >
            {error?.filling_type}
          </Typography>
        )}
      </div>
    );
  }, [selectFilling?.value, error?.filling_type]);

  const renderFillingFloors = useMemo(() => {
    return (
      <div>
        {<Selected active={!selectFilling}>{"Выберите тип начинки"}</Selected>}
        {[...Array(floors)].map((_, idx) => {
          if (!!fillings?.length)
            return (
              <div className="border-b border-b-tgBorder mt-6" key={idx}>
                <Texts
                  className="mt-4"
                  size={TextSize.XL}
                  alignCenter
                  uppercase
                >
                  Выберите начинку: {idx + 1} этаж
                </Texts>
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {fillings?.map((item, childIdx) => {
                    const active = item.id === filling?.[idx + 1]?.value;
                    return (
                      <TgBtn
                        key={childIdx}
                        onClick={handleFilling({
                          [idx + 1]: { name: item.name, value: item.id },
                        })}
                        className={cl(
                          "px-3 max-w-min min-w-[80px] !h-[30px] overflow-hidden",
                          {
                            ["shadow-selected !bg-tgSelected"]: active,
                          }
                        )}
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

                <Selected active={!!filling?.[idx + 1]?.name}>{`Выбрано: ${
                  filling?.[idx + 1]?.name
                }`}</Selected>
              </div>
            );
        })}
        {isFetching && <Loading />}
        {error?.filling && (
          <Typography
            className="text-red-600 w-full my-2"
            size={TextSize.M}
            alignCenter
          >
            {error?.filling}
          </Typography>
        )}
        {!isFetching && selectFilling && (
          <Selected active={!fillings?.length}>{"Начинки не найдены"}</Selected>
        )}
      </div>
    );
  }, [filling, fillings, error?.filling, selectFilling, isFetching]);

  const renderPaletteFloors = useMemo(() => {
    return (
      <>
        {[...Array(floors)].map((_, idx) => {
          return (
            <Fragment key={idx}>
              <div className="flex justify-between items-center">
                {/* <div className="flex justify-between "> */}
                <Texts size={TextSize.XL} className="mt-4" uppercase>
                  Введите номер палитры для:{" "}
                  <Texts weight={Weight.bold} size={TextSize.XL} uppercase>
                    этаж {idx + 1}
                  </Texts>
                </Texts>
                <div onClick={handleModal(idx + 1)}>
                  <img src="/assets/icons/info.svg" alt="info" />
                </div>
              </div>
              <div className="relative">
                <MainInput
                  inputStyle={InputStyle.white}
                  placeholder="№"
                  className="border rounded-xl border-tgBorder mt-3 !h-12"
                  register={register(`${idx + 1}`)}
                />
              </div>
            </Fragment>
          );
        })}
        <div className="flex justify-between items-center">
          <Texts size={TextSize.XL} className="mt-4" uppercase>
            Введите номер палитры для:{" "}
            <Texts weight={Weight.bold} size={TextSize.XL} uppercase>
              Деталей
            </Texts>
          </Texts>
          <div onClick={handleModal("details")}>
            <img src="/assets/icons/info.svg" alt="info" />
          </div>
        </div>
        <div className="relative">
          <MainInput
            inputStyle={InputStyle.white}
            className="border rounded-xl border-tgBorder mt-3 !h-12"
            placeholder="№"
            register={register("details")}
          />
        </div>
      </>
    );
  }, [palette]);

  useEffect(() => {
    if (filling_type) $selectFilling(filling_type);
  }, [filling_type]);

  return (
    <TgContainer>
      <TgBackBtn link="complexity" />
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
