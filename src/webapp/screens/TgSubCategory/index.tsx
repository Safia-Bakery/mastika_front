import cl from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MainInput, { InputStyle } from "src/components/BaseInputs/MainInput";
import Typography, { TextSize, Weight } from "src/components/Typography";
import useCategoriesFull from "src/hooks/useCategoryFull";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { tgAddItem, tgItemsSelector } from "src/redux/reducers/tgWebReducer";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import { complexityArr, imageConverter } from "src/utils/helpers";
import {
  ContentType,
  CustomObj,
  ModalType,
  SubCategType,
} from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";

interface Errortypes {
  complexity?: string;
  floors?: string;
  portion?: string;
}

const numberArr: { [key: number]: number[] } = {
  1: [7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
  2: [17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37],
  3: [37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57],
  4: [72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92],
};

const TgSubCategory = () => {
  const navigate = useNavigate();
  const removeParam = useRemoveParams();
  const navigateParam = useNavigateParams();
  const dispatch = useAppDispatch();
  const [selects, $selects] = useState<CustomObj>();
  const [complexity, $complexity] = useState<{
    value?: number | string;
    name?: string;
  }>();
  const [floors, $floors] = useState<number>();
  const [portion, $portion] = useState<number>();
  const [img, $img] = useState<number>();
  const items = useAppSelector(tgItemsSelector);

  const complexityRef = useRef<any>();
  const floorsRef = useRef<any>();
  const portionRef = useRef<any>();

  const [error, $error] = useState<Errortypes>();

  const modal = useQueryString("modal");
  const { register, getValues, watch } = useForm();
  const { direction } = useAppSelector(tgItemsSelector);
  const { data } = useCategoriesFull({
    id: Number(direction?.value)!,
    enabled: !!direction?.value,
  });

  const handleSubmit = () => {
    if (!floors || !portion || !complexity?.value) {
      if (!portion) {
        portionRef?.current.scrollIntoView();
        $error({ portion: "portions are required" });
      }
      if (!floors) {
        floorsRef?.current.scrollIntoView();
        $error({ floors: "floors are required" });
      }
      if (!complexity?.value) {
        complexityRef?.current.scrollIntoView();
        $error({ complexity: "complexity is required" });
      }
    } else {
      const dynamic = data?.category_vs_subcategory.reduce((acc: any, item) => {
        if (!!getValues(`${item.id}`))
          acc[`${item.id}`] =
            typeof getValues(`${item.id}`) == "object"
              ? getValues(`${item.id}`)[0]
              : getValues(`${item.id}`);
        return acc;
      }, {});

      const select =
        selects &&
        Object.keys(selects).reduce((acc: any, item) => {
          acc[item] = selects[item].value;
          return acc;
        }, {});
      dispatch(
        tgAddItem({
          complexity,
          floors,
          portion,
          dynamic: { ...dynamic, ...select },
        })
      );
      navigate("/tg/fillings");
    }
  };

  const contentTypes = (subCateg: SubCategType) => {
    switch (subCateg.contenttype_id) {
      case ContentType.number: {
        return (
          <div className="border-b border-b-tgBorder pb-4" key={subCateg.id}>
            <Texts className="my-4" size={TextSize.XL} alignCenter uppercase>
              {subCateg.name}
            </Texts>
            <MainInput type="number" register={register(`${subCateg.id}`)} />
          </div>
        );
      }
      case ContentType.select: {
        return (
          <div className="border-b border-b-tgBorder" key={subCateg.id}>
            <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
              {subCateg.name}
            </Texts>
            <div className="flex flex-wrap gap-5 justify-center mt-4">
              {subCateg.subcat_vs_selval.map((item) => {
                const active = item.id === selects?.[subCateg.id]?.value;
                return (
                  <TgBtn
                    key={item.id}
                    onClick={() =>
                      $selects((prev) => ({
                        ...prev,
                        ...{
                          [subCateg.id]: { name: item.content, value: item.id },
                        },
                      }))
                    }
                    className={cl("px-3 !min-w-[140px] max-w-[250px] !w-min", {
                      ["shadow-selected !bg-tgSelected"]: active,
                    })}
                  >
                    <Texts
                      weight={active ? Weight.bold : Weight.regular}
                      className="inline-block !w-min whitespace-nowrap"
                    >
                      {item.content}
                    </Texts>
                  </TgBtn>
                );
              })}
            </div>

            <Selected active={!!selects?.[subCateg.id]?.name}>{`Выбрано: ${
              selects?.[subCateg.id]?.name
            }`}</Selected>
          </div>
        );
      }

      case ContentType.image: {
        const imageLength = watch(`${subCateg.id}`)?.length;
        $img(subCateg.id);
        return (
          <div className="border-b border-b-tgBorder pb-4" key={subCateg.id}>
            <Texts className="my-4" size={TextSize.XL} alignCenter uppercase>
              {subCateg.name}
            </Texts>
            <div className=" flex gap-2">
              <TgBtn
                onClick={() => null}
                className={cl("!bg-tgGray !rounded-2xl relative !w-40", {
                  ["!bg-tgPrimary"]: !!imageLength,
                })}
              >
                <Texts size={TextSize.M} weight={Weight.bold}>
                  {!imageLength
                    ? "Загрузить фотографии"
                    : `Загружено ${imageLength} фото`}
                </Texts>

                <input
                  type="file"
                  multiple
                  className="h-full w-full absolute opacity-0"
                  {...register(`${subCateg.id}`)}
                />
              </TgBtn>

              {!!imageLength && (
                <TgBtn
                  className="!w-40 !rounded-2xl"
                  onClick={() => navigateParam({ modal: ModalType.image })}
                >
                  Смотреть
                </TgBtn>
              )}
            </div>
          </div>
        );
      }
      case ContentType.string: {
        return (
          <div className="border-b border-b-tgBorder pb-4" key={subCateg.id}>
            <Texts className="my-4" size={TextSize.XL} alignCenter uppercase>
              {subCateg.name}
            </Texts>
            <MainInput type="string" register={register(`${subCateg.id}`)} />
          </div>
        );
      }

      default:
        break;
    }
  };

  const renderComplexity = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder" ref={complexityRef}>
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

        {complexity?.name ? (
          <Selected
            active={!!complexity?.name}
          >{`Выбрано: ${complexity?.name}`}</Selected>
        ) : (
          <Typography
            className="text-red-600 w-full my-2"
            size={TextSize.M}
            alignCenter
          >
            {error?.complexity}
          </Typography>
        )}
      </div>
    );
  }, [complexity, error?.complexity]);

  const renderFloors = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder " ref={floorsRef}>
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
                    ["shadow-selected !bg-tgSelected"]: active,
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
        {!floors ? (
          <Typography
            className="text-red-600 w-full my-2"
            size={TextSize.M}
            alignCenter
          >
            {error?.floors}
          </Typography>
        ) : (
          <Selected active={!!floors}>{`Выбрано: ${floors}`}</Selected>
        )}
      </div>
    );
  }, [floors, error?.floors]);

  const renderContents = useMemo(() => {
    return data?.category_vs_subcategory.map((item) => {
      if (item.contenttype_id !== ContentType.image) return contentTypes(item);
    });
  }, [data?.category_vs_subcategory, selects]);

  const renderImg = useMemo(() => {
    return data?.category_vs_subcategory.map((item) => {
      if (item.contenttype_id === ContentType.image) return contentTypes(item);
    });
  }, [data?.category_vs_subcategory, watch(`${img}`)]);

  const renderModal = useMemo(() => {
    const handleManulaPortion = () => {
      $portion(Number(getValues("portionManual")));
      removeParam(["modal"]);
    };
    switch (modal) {
      case ModalType.image: {
        return (
          <img
            src={imageConverter(watch(`${img}`)?.[0])}
            alt="uploaded-image"
          />
        );
      }
      case ModalType.portion:
        return (
          <>
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
          </>
        );

      default:
        break;
    }
  }, [modal]);

  const renderPortions = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder" ref={portionRef}>
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Введите нужное количество порций
        </Texts>

        <div className="flex max-w-[300px] gap-3 flex-wrap mx-auto mt-4">
          {floors &&
            numberArr[floors].map((item) => {
              const active = item === portion;
              return (
                <div
                  key={item}
                  onClick={() => $portion(item)}
                  className={cl(
                    "rounded-full bg-tgPrimary w-10 h-10 flex items-center justify-center transition duration-[0.6s]",
                    {
                      ["shadow-selected !bg-tgSelected"]: active,
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
            onClick={() => navigateParam({ modal: ModalType.portion })}
            className={cl(
              "rounded-full bg-tgGray w-10 h-10 flex items-center justify-center transition"
            )}
          >
            <Texts className="text-white">+</Texts>
          </div>
        </div>
        {!portion ? (
          <Typography
            className="text-red-600 w-full my-2"
            size={TextSize.M}
            alignCenter
          >
            {error?.portion}
          </Typography>
        ) : (
          <Selected active={!!portion}>{`Выбрано: ${portion}`}</Selected>
        )}
      </div>
    );
  }, [portion, error?.portion, floors]);

  const closeModal = () => removeParam(["modal"]);

  useEffect(() => {
    if (items.complexity) $complexity(items.complexity);
    if (items.floors) $floors(items.floors);
    if (items.portion) $portion(items.portion);
  }, [items.complexity, items.floors, items.portion]);

  return (
    <TgContainer>
      <form>
        <TgBackBtn link="order-directions" />
        {renderComplexity}
        {renderFloors}
        {renderPortions}
        {renderImg}
        {renderContents}
        <TgModal onClose={closeModal} isOpen={!!modal}>
          {renderModal}
        </TgModal>
        <TgBtn onClick={handleSubmit} className="mt-16 font-bold">
          Далее
        </TgBtn>
      </form>
    </TgContainer>
  );
};

export default TgSubCategory;
