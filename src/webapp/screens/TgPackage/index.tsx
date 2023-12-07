import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";
import cl from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import { InputStyle } from "src/components/BaseInputs/MainInput";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import {
  tgAddItem,
  tgAddToCart,
  tgCartSelector,
  tgHandleCount,
  tgItemsSelector,
} from "src/store/reducers/tgWebReducer";
import { HandleCount } from "src/utils/types";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import useProducts from "src/hooks/useProducts";
import tgUploadImage from "src/hooks/mutation/tgUploadImage";
import { getFillingType, packagesID, productsID } from "src/utils/helpers";
import Loading from "src/components/Loader";
import { TelegramApp } from "src/webapp/tgHelpers";
interface ValueType {
  value?: string | number;
  name?: string;
  price?: number;
}

const TgPackage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutate: uploadImage, isLoading: imageLoading } = tgUploadImage();
  const { orderPackage, examplePhoto, filling_type } =
    useAppSelector(tgItemsSelector);
  const { data: products, isLoading: productLoading } = useProducts({
    group_id: productsID,
  });
  const { data: packages, isLoading: packLoading } = useProducts({
    group_id: packagesID,
  });
  const packageRef = useRef<any>();
  const [itemPackage, $itemPackage] = useState<ValueType>();

  const { refetch } = useProducts({
    id: getFillingType(+filling_type?.value!)?.val,
    enabled: false,
  });

  useEffect(() => {
    if (!!packages) {
      const { id: value, name, price } = packages[1];
      $itemPackage({ value, name, price });
    }
  }, [packages]);

  const cart = useAppSelector(tgCartSelector);

  const { register, watch, getValues, handleSubmit } = useForm();

  const onSubmit = () => {
    const { image, comments } = getValues();
    refetch();
    if (!!image.length) {
      const filesArray = Array.from(image);
      const formData = new FormData();
      filesArray.forEach((file: any) => {
        formData.append("image", file);
      });
      uploadImage(formData, {
        onSuccess: (data: any) => {
          if (!!data?.images?.length) {
            dispatch(
              tgAddItem({
                examplePhoto: data.images,
                comments,
                orderPackage: itemPackage,
              })
            );
            navigate("/tg/details");
          } else {
            const confirmation = confirm(
              "Ваши фотографии не были загружены, продолжить?"
            );
            if (confirmation) navigate("/tg/details");
          }
        },
      });
    } else {
      dispatch(tgAddItem({ comments, orderPackage: itemPackage }));
      navigate("/tg/details");
    }
  };

  const renderImageUpload = useMemo(() => {
    const imageLength = !!examplePhoto?.length || watch("image")?.length;
    return (
      <TgBtn
        onClick={() => null}
        className={cl("!bg-tgGray mt-3 !rounded-2xl relative !w-48", {
          ["!bg-tgPrimary"]: !!imageLength,
        })}
      >
        <Texts size={TextSize.M} weight={Weight.bold}>
          {!imageLength
            ? "Загрузить фотографии"
            : `Загружено ${examplePhoto?.length} фото`}
        </Texts>

        <input
          type="file"
          multiple
          className="h-full w-full absolute opacity-0"
          {...register("image")}
        />
      </TgBtn>
    );
  }, [watch("image")]);

  const renderPackage = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder pb-2" ref={packageRef}>
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите упаковку
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
          {packages &&
            packages?.map(({ price, id: value, name }) => {
              const active = value === itemPackage?.value;
              return (
                <div className="flex-1" key={value}>
                  <TgBtn
                    onClick={() => $itemPackage({ name, value, price })}
                    className={cl("px-3 !h-[35px]", {
                      ["shadow-selected !bg-tgSelected"]: active,
                    })}
                  >
                    <Texts
                      size={TextSize.L}
                      weight={active ? Weight.bold : Weight.regular}
                      className="inline-block !w-min whitespace-nowrap"
                    >
                      {name}
                    </Texts>
                  </TgBtn>
                  <Selected
                    className={cl("!opacity-0 !delay-0", {
                      ["!opacity-100"]: active,
                    })}
                    active={!!itemPackage?.price?.toString()}
                  >{`Стоимость: ${itemPackage?.price} сум`}</Selected>
                </div>
              );
            })}
        </div>
      </div>
    );
  }, [itemPackage, packages]);

  const prenderAdditions = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder pb-4 gap-2">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Дополнительно к заказу
        </Texts>

        <Selected
          className={cl(
            "!delay-0 mt-0 !text-left text-[rgba(102,_102,_102,_0.53)]"
          )}
          active={true}
        >
          Не обязательный пункт
        </Selected>
        <div className="mt-3 flex flex-col gap-2">
          {products
            ?.filter((st) => !!st.status)
            .map((item, idx) => (
              <div className="flex justify-between" key={item.id}>
                <Texts className="flex flex-1" alignCenter size={TextSize.L}>
                  {item.name}
                </Texts>
                <Texts className="!flex flex-1 items-center" size={TextSize.L}>
                  {item.price} сум
                </Texts>

                {!cart?.[item.id] ? (
                  <TgBtn
                    className="!bg-tgGray !h-5 !w-20 flex my-auto"
                    onClick={() =>
                      dispatch(
                        tgAddToCart({
                          value: item.id,
                          name: item.name,
                          count: 1,
                          price: item.price,
                        })
                      )
                    }
                  >
                    <Texts size={TextSize.XS}>Добавить</Texts>
                  </TgBtn>
                ) : (
                  <div className="flex items-center justify-center gap-4 w-20 bg-tgGray rounded-2xl text-white !h-5 my-auto">
                    <div
                      onClick={() =>
                        dispatch(
                          tgHandleCount({
                            operation: HandleCount.decrement,
                            id: item.id,
                          })
                        )
                      }
                      className="font-bold"
                    >
                      -
                    </div>
                    <div>
                      <Texts weight={Weight.bold} size={TextSize.XS}>
                        {cart[item.id].count}
                      </Texts>
                    </div>
                    <div
                      className="font-bold"
                      onClick={() =>
                        dispatch(
                          tgHandleCount({
                            operation: HandleCount.increment,
                            id: item.id,
                          })
                        )
                      }
                    >
                      +
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }, [cart, products]);

  useEffect(() => {
    if (orderPackage) $itemPackage(orderPackage);
    TelegramApp?.confirmClose();
  }, []);

  if (productLoading || packLoading || imageLoading)
    return <Loading absolute />;

  return (
    <TgContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TgBackBtn link="fillings" />
        {renderPackage}
        {prenderAdditions}

        <div className="mt-2 border-b border-b-tgBorder pb-4 mb-5">
          <Texts size={TextSize.L}>
            Отправьте примерный вариант вашего торта
          </Texts>

          {renderImageUpload}
        </div>

        <Texts size={TextSize.L} alignCenter>
          Если у вас есть пожелания по заказу, можете внизу написать комментарий
        </Texts>

        <MainTextArea
          placeholder={"Комментарий к торту"}
          inputStyle={InputStyle.white}
          register={register("comments")}
          className="border border-tgBorder rounded-xl mt-4"
        />

        <TgBtn onClick={() => null} className={cl("mt-4 font-bold relative")}>
          <button
            type="submit"
            className="absolute bottom-0 left-0 top-0 right-0"
          />
          Перейти к деталям заказа
        </TgBtn>
      </form>
    </TgContainer>
  );
};

export default TgPackage;
