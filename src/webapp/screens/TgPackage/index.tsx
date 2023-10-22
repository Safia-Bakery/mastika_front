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

const packageArr = [
  { id: 1, name: "Премиум" },
  { id: 2, name: "Бесплатная" },
];

const TgPackage = () => {
  const navigate = useNavigate();
  const [selected, $selected] = useState<number>();

  const { register, handleSubmit, watch, getValues } = useForm();

  const handleNavigate = (url: string) => () => navigate(url);

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

  return (
    <TgContainer>
      <form>
        <div className="border-b border-b-tgBorder pb-2">
          <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
            Выберите упаковку
          </Texts>
          <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
            {packageArr.map((item) => {
              const active = item.id === selected;
              return (
                <div className="flex-1" key={item.id}>
                  <TgBtn
                    key={item.id}
                    onClick={() => $selected(item.id)}
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
                    active={!!selected}
                  >{`Стоимость: ${selected} сум`}</Selected>
                </div>
              );
            })}
          </div>
        </div>

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
            {[...Array(4)].map((item, idx) => (
              <div className="flex justify-between" key={idx}>
                <Texts size={TextSize.L}>Топпер</Texts>
                <Texts size={TextSize.L}>50 000 сум</Texts>

                {/* <TgBtn className="!bg-tgGray !h-5 !w-20 " onClick={() => null}>
              <Texts size={TextSize.XS}>Добавить</Texts>
            </TgBtn> */}

                <div className="flex items-center justify-center gap-4 w-20 bg-tgGray rounded-2xl text-white ">
                  <div className="font-bold">-</div>
                  <div>
                    <Texts weight={Weight.bold} size={TextSize.XS}>
                      12
                    </Texts>
                  </div>
                  <div className="font-bold">+</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 border-b border-b-tgBorder pb-4 mb-5">
          <Texts size={TextSize.L}>
            Отправьте примерный вариант вашего торта
          </Texts>

          {renderImageUpload}
          {/* <TgBtn
            onClick={() => null}
            className={cl("!bg-tgGray mt-3 !rounded-2xl relative !w-40")}
          >
            <Texts size={TextSize.M} weight={Weight.bold}>
              Загрузить фотографии
            </Texts>

            <input
              type="file"
              className="h-full w-full absolute opacity-0"
              {...register("image")}
            />
          </TgBtn> */}
        </div>

        <Texts size={TextSize.L} alignCenter>
          Если у вас есть пожелания по заказу, можете внизу написать комментарий
        </Texts>

        <MainTextArea
          placeholder={"Комментарий к торту"}
          inputStyle={InputStyle.white}
          register={register("comment")}
          className="border border-tgBorder rounded-xl mt-4"
        />

        {/* <input type="color" /> */}

        <TgBtn
          onClick={handleNavigate("/tg/details")}
          className={cl("mt-4 font-bold")}
        >
          Перейти к деталям заказа
        </TgBtn>
      </form>
    </TgContainer>
  );
};

export default TgPackage;
