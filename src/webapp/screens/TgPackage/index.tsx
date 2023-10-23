import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";
import cl from "classnames";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import { InputStyle } from "src/components/BaseInputs/MainInput";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import {
  tgAddItem,
  tgAddToCart,
  tgCartSelector,
  tgHandleCount,
  tgItemsSelector,
} from "src/redux/reducers/tgWebReducer";
import { HandleCount } from "src/utils/types";

const packageArr = [
  { id: 1, name: "Премиум" },
  { id: 2, name: "Бесплатная" },
];

const additionsArr = [
  { id: 1, name: "Топпер", price: 10000 },
  { id: 2, name: "Свечка", price: 30000 },
  { id: 3, name: "Шоколад", price: 20000 },
];

const TgPackage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderPackage, additions } = useAppSelector(tgItemsSelector);

  const cart = useAppSelector(tgCartSelector);

  const { register, watch, getValues } = useForm();

  const handleSubmit = () => {
    const { image, comments } = getValues();
    const additions = Object.values(cart);
    dispatch(tgAddItem({ examplePhoto: image, comments, additions }));
    navigate("/tg/details");
  };

  const renderImageUpload = useMemo(() => {
    const imageLength = watch("image")?.length;
    return (
      <TgBtn
        onClick={() => null}
        className={cl("!bg-tgGray mt-3 !rounded-2xl relative !w-40", {
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
          {...register("image")}
        />
      </TgBtn>
    );
  }, [watch("image")]);

  const renderPackage = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder pb-2">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите упаковку
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
          {packageArr.map((item) => {
            const active = item.id === orderPackage?.value;
            return (
              <div className="flex-1" key={item.id}>
                <TgBtn
                  key={item.id}
                  onClick={() =>
                    dispatch(
                      tgAddItem({
                        orderPackage: { name: item.name, value: item.id },
                      })
                    )
                  }
                  className={cl("px-3 !h-[35px]", {
                    ["shadow-selected"]: active,
                  })}
                >
                  <Texts
                    size={TextSize.L}
                    weight={active ? Weight.bold : Weight.regular}
                    className="inline-block !w-min whitespace-nowrap"
                  >
                    {item.name}
                  </Texts>
                </TgBtn>
                <Selected
                  className={cl("!opacity-0 !delay-0", {
                    ["!opacity-100"]: active,
                  })}
                  active={!!orderPackage?.value}
                >{`Стоимость: ${orderPackage?.value} сум`}</Selected>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [orderPackage]);

  const prenderAdditions = useMemo(() => {
    return (
      <div className="border-b border-b-tgBorder pb-4">
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
          {additionsArr.map((item, idx) => (
            <div className="flex justify-between" key={item.id}>
              <Texts size={TextSize.L}>{item.name}</Texts>
              <Texts size={TextSize.L}>{item.price} сум</Texts>

              {!cart?.[item.id] ? (
                <TgBtn
                  className="!bg-tgGray !h-5 !w-20 "
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
                <div className="flex items-center justify-center gap-4 w-20 bg-tgGray rounded-2xl text-white ">
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
  }, [additions, cart]);

  return (
    <TgContainer>
      <form>
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

        <TgBtn onClick={handleSubmit} className={cl("mt-4 font-bold")}>
          Перейти к деталям заказа
        </TgBtn>
      </form>
    </TgContainer>
  );
};

export default TgPackage;
