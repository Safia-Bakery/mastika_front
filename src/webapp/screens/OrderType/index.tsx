import cl from "classnames";
import React, { useState } from "react";
import { TextSize, Weight } from "src/components/Typography";
import { OrderingType } from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBranchSelect from "src/webapp/componets/TgBranchSelect";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import WebSelected from "src/webapp/componets/TgSelected";

const typeArr = [
  {
    id: OrderingType.delivery,
    title: "Доставка",
    img: "/assets/images/delivery.png",
  },
  {
    id: OrderingType.pickup,
    title: "Самовывоз",
    img: "/assets/images/pickup.png",
  },
];

const TgOrderType = () => {
  const [orderType, $orderType] = useState<OrderingType>(OrderingType.delivery);
  const [confirmModal, $confirmModal] = useState(false);

  const handleType = (val: OrderingType) => () => $orderType(val);

  return (
    <TgContainer className="flex flex-col gap-2">
      <Texts alignCenter uppercase size={TextSize.XXL} className="mt-6 mb-7">
        Построй торт
      </Texts>
      <Texts size={TextSize.XL} weight={Weight.bold} uppercase alignCenter>
        выберите Тип заказа
      </Texts>

      <div className="flex mt-8 border-b border-tgBorder pb-8">
        {typeArr.map((item) => {
          const active = item.id === orderType;
          return (
            <div
              key={item.id}
              className="flex flex-1 flex-col justify-center items-center"
            >
              <div
                onClick={handleType(item.id)}
                className={cl(
                  "h-[150px] w-[150px] rounded-full relative transition-shadow duration-[0.6s]",
                  { ["shadow-[0px_4px_4px_0px_#00000040]"]: active }
                )}
              >
                <img src={item.img} alt={item.title} />
                <WebSelected className={cl({ ["opacity-100"]: active })} />
              </div>

              <Texts className="mt-4" size={TextSize.L} uppercase alignCenter>
                {item.title}
              </Texts>
            </div>
          );
        })}
      </div>
      <TgBtn onClick={() => $confirmModal(true)} className="mt-9">
        Далее
      </TgBtn>

      <TgModal isOpen={confirmModal}>
        <Texts size={TextSize.M} alignCenter>
          Стоимость доставки по городу Ташкент
          <Texts
            alignCenter
            weight={Weight.bold}
            size={TextSize.M}
            className="inline"
          >
            {" "}
            100.000 сум.
          </Texts>{" "}
          Доставка будет осуществляться с фабрики🚘 Доставка за пределы города
          не осуществляется. Спасибо за ваш выбор❤️
        </Texts>

        <TgBtn onClick={() => $confirmModal(false)} className="mt-5">
          OK
        </TgBtn>
      </TgModal>

      <TgBranchSelect />
    </TgContainer>
  );
};

export default TgOrderType;
