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
  { palette: 7532, color: "#776245" },
  { palette: 7533, color: "#4A3806" },
  { palette: 7518, color: "#805439" },
  { palette: 476, color: "#552F18" },
  { palette: 7519, color: "#564319" },
  // { palette: 7519, color: "#564319" },
  { palette: "Black / Brown 4", color: "#402E00" },
  { palette: "Black / Brown 5", color: "#48282B" },
  { palette: 482, color: "#EFE0D1" },
  { palette: 481, color: "#E8CDBC" },
  { palette: 480, color: "#D9B59D" },
  { palette: 479, color: "#B98B73" },
  { palette: 4725, color: "#C5937C" },
  { palette: 4735, color: "#DAB3A2" },
  { palette: 486, color: "#F79C89" },
  { palette: 787, color: "#F9B6A6" },
  { palette: 488, color: "#F9C7BC" },
  { palette: 489, color: "#FBDDD5" },
  { palette: 493, color: "#EB999D" },
  { palette: 494, color: "#FAB9BF" },
  { palette: 495, color: "#F9CBCD" },
  { palette: 496, color: "#FDDBD9" },
  { palette: 507, color: "#DE9AA5" },
  { palette: 508, color: "#EFB5C1" },
  { palette: 5035, color: "#F5E1DA" },
  { palette: 1765, color: "#F9AFAE" },
  { palette: 1775, color: "#F59D99" },
  { palette: 1777, color: "#F28985" },
  { palette: 1785, color: "#F1796B" },
  { palette: 1787, color: "#F2645A" },
  { palette: 1795, color: "#F32F20" },
  { palette: 1935, color: "#E21354" },
  { palette: 1945, color: "#C40D45" },
  { palette: 195, color: "#840024" },
  { palette: 1807, color: "#B61219" },
  { palette: 1805, color: "#BF2D1F" },
  { palette: 1797, color: "#E11D21" },
  { palette: 194, color: "#AC0534" },
  { palette: 200, color: "#D21245" },
  { palette: 215, color: "#B6014E" },
  { palette: 216, color: "#900C3B" },
  { palette: 217, color: "#F9C5DC" },
  { palette: 237, color: "#EC9AC2" },
  { palette: 2375, color: "#DA88B6" },
  { palette: 2385, color: "#C959A5" },
  { palette: 2395, color: "#BB2B94" },
  { palette: 2405, color: "#AF1F91" },
  { palette: 2415, color: "#A31A83" },
  { palette: 2425, color: "#850D70" },
  { palette: 242, color: "#840054" },
  { palette: 249, color: "#7E0C6E" },
  { palette: 261, color: "#67045F" },
  { palette: 262, color: "#57004F" },
  { palette: 2622, color: "#55075B" },
  { palette: 2583, color: "#936EB1" },
  { palette: 265, color: "#8077B6" },
  { palette: 264, color: "#B9B3D9" },
  { palette: 263, color: "#E0D7EA" },
  { palette: 725, color: "#955404" },
  { palette: 724, color: "#AB650D" },
  { palette: 723, color: "#D48A1F" },
  { palette: 718, color: "#E37F1D" },
  { palette: 717, color: "#F38D1E" },
  { palette: 716, color: "#F89B37" },
  { palette: 1525, color: "#E77711" },
  { palette: 166, color: "#F67A20" },
  { palette: "Warm Red", color: "#F16533" },
  { palette: 1665, color: "#EF7426" },
  { palette: 1265, color: "#916C01" },
  { palette: 1255, color: "#B18906" },
  { palette: 1245, color: "#D29F17" },
  { palette: 117, color: "#DFB30A" },
  { palette: 112, color: "#A79904" },
  { palette: 111, color: "#CBA805" },
  { palette: 5575, color: "#ADC7BC" },
  { palette: 572, color: "#C2E5DE" },
  { palette: 570, color: "#82CDC0" },
  { palette: 5565, color: "#8CADA2" },
  { palette: 5625, color: "#6D8877" },
  { palette: 377, color: "#74A42F" },
  { palette: 378, color: "#556C12" },
  { palette: 5743, color: "#33470C" },
  { palette: 5753, color: "#55641F" },
  { palette: 576, color: "#5B8726" },
  { palette: 5767, color: "#949C4F" },
  { palette: 582, color: "#8B8D06" },
  { palette: 583, color: "#AFBD20" },
  { palette: 618, color: "#C1B02C" },
  { palette: 619, color: "#A49601" },
  { palette: 382, color: "#C1D72D" },
  { palette: 389, color: "#D9E8A3" },
  { palette: 110, color: "#F1CC01" },
  { palette: 108, color: "#FFE715" },
  { palette: 102, color: "#FFF217" },
  { palette: 113, color: "#FEE773" },
  { palette: 1205, color: "#FFEFBC" },
  { palette: 1215, color: "#FFE59E" },
  { palette: 1225, color: "#FFD478" },
  { palette: 128, color: "#FFDE73" },
  { palette: 131, color: "#E9A713" },
  { palette: 420, color: "#DCDDDF" },
  { palette: 421, color: "#C5C6C8" },
  { palette: 422, color: "#B6B7BB" },
  { palette: 423, color: "#A0A1A5" },
  { palette: 424, color: "#7F7F87" },
  { palette: 425, color: "#5F6062" },
  { palette: 430, color: "#939BA1" },
  { palette: 431, color: "#6B747D" },
  { palette: 432, color: "#44555D" },
  { palette: 443, color: "#A7B3A7" },
  { palette: 444, color: "#8E9B94" },
  { palette: 445, color: "#5E6E64" },
  { palette: 446, color: "#4B5B51" },
  { palette: 447, color: "#454B3F" },
  { palette: 532, color: "#173B47" },
  { palette: 7546, color: "#415A68" },
  { palette: "Rich Black", color: "#415A68" },
  { palette: 5463, color: "#013845" },
  { palette: 546, color: "#03324F" },
  { palette: 533, color: "#1D4163" },
  { palette: 5413, color: "#5E88A1" },
  { palette: 5425, color: "#80A3B5" },
  { palette: 550, color: "#7BB2D0" },
  { palette: 5503, color: "#9CC5C9" },
  { palette: 5513, color: "#C5E1E4" },
  { palette: 552, color: "#C2DCE9" },
  { palette: 276, color: "#0F034D" },
  { palette: 275, color: "#1D1060" },
  { palette: 2748, color: "#19388A" },
  { palette: 281, color: "#013E7D" },
  { palette: 280, color: "#004890" },
  { palette: 279, color: "#4F91CD" },
  { palette: 2925, color: "#0397D5" },
  { palette: 2935, color: "#0276C0" },
  { palette: 2945, color: "#006AAB" },
  { palette: 295, color: "#02447E" },
  { palette: 2955, color: "#025292" },
  { palette: 296, color: "#012D5C" },
  { palette: 2965, color: "#03395F" },
  { palette: 303, color: "#03405C" },
  { palette: 3025, color: "#025B87" },
  { palette: 307, color: "#0276B1" },
  { palette: 314, color: "#0184AC" },
  { palette: 3145, color: "#018FA3" },
  { palette: 3155, color: "#017688" },
  { palette: 323, color: "#016E70" },
  { palette: 3165, color: "#02515E" },
  { palette: 3282, color: "#009591" },
  { palette: 326, color: "#02B0AF" },
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
        $error({ filling: "Обязательное поле" });

      if (!selectFilling) $error({ filling_type: "Обязательное поле" });
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

        <div className="flex flex-wrap gap-4 max-h-[70vh] h-full overflow-y-auto justify-center">
          {paletteColors.map((item) => (
            <div onClick={handlePalette(item.palette)} key={item.palette}>
              <div
                className={cl(
                  "h-7 rounded-md  w-full border border-tgBorder min-w-[22vw] max-w-[95px]"
                )}
                style={{ background: item.color }}
              />
              <Texts size={TextSize.XS}>{item.palette}</Texts>
            </div>
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
