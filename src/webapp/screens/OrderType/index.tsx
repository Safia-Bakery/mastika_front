import React from "react";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import WebSelected from "src/webapp/componets/WebSelected";

const WebOrderType = () => {
  return (
    <div>
      <Texts size={TextSize.XXL} alignCenter uppercase>
        Построй торт
      </Texts>
      <Texts size={TextSize.XL} weight={Weight.bold} uppercase alignCenter>
        выберите Тип заказа
      </Texts>

      <div className="flex">
        <div className="flex flex-1">
          <div className="h-[150px] w-[150px] rounded-full shadow-[0px 4px 4px 0px #00000040] relative">
            <img src="/assets/images/delivery.png" alt="delivery" />
            <WebSelected />
          </div>

          <Texts size={TextSize.L} weight={Weight.bold} uppercase alignCenter>
            Доставка
          </Texts>
        </div>

        <div className="flex flex-1">
          <div className="h-[150px] w-[150px] rounded-full shadow-[0px 4px 4px 0px #00000040] relative">
            <img src="/assets/images/delivery.png" alt="delivery" />
            <WebSelected />
          </div>

          <Texts size={TextSize.L} weight={Weight.bold} uppercase alignCenter>
            Доставка
          </Texts>
        </div>
      </div>
    </div>
  );
};

export default WebOrderType;
