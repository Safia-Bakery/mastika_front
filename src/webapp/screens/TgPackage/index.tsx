import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";
import cl from "classnames";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";

const packageArr = [
  { id: 1, name: "Премиум" },
  { id: 2, name: "Бесплатная" },
];

const TgPackage = () => {
  const navigate = useNavigate();
  const [selected, $selected] = useState<number>();

  const handleNavigate = (url: string) => () => navigate(url);

  return (
    <TgContainer>
      <div className="border-b border-b-tgBorder pb-2">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите упаковку
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
          {packageArr.map((item) => {
            const active = item.id === selected;
            return (
              <div className="flex-1">
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

      <div className="border-b border-b-tgBorder pb-2">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Дополнительно к заказу
        </Texts>
        <div className="flex flex-wrap gap-3 justify-center mt-4 transition-all">
          {packageArr.map((item) => {
            const active = item.id === selected;
            return (
              <div className="flex-1">
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
    </TgContainer>
  );
};

export default TgPackage;
