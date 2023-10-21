import cl from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgContainer from "src/webapp/componets/TgContainer";
import Selected from "src/webapp/componets/TgSelectedLabel";

const complexityArr = [
  { id: 1, name: "Средний" },
  { id: 2, name: "Сложный" },
  { id: 3, name: "Гравитационный Свадебдный" },
];

const TgOrderComplexity = () => {
  const navigate = useNavigate();
  const [complexity, $complexity] = useState<number>();
  const [floors, $floors] = useState<number>();
  const [portion, $portion] = useState<number>();

  const handleNavigate = (url: string) => navigate(url);

  return (
    <TgContainer>
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Укажите степень сложности
        </Texts>
        <div className="flex flex-wrap gap-5 justify-center mt-4">
          {complexityArr.map((item) => {
            const active = item.id === complexity;
            return (
              <TgBtn
                onClick={() => $complexity(item.id)}
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

        <Selected active={!!complexity}>{`Выбрано: ${complexity}`}</Selected>
      </div>
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Выберите этажность
        </Texts>

        <div className="flex justify-between">
          {[...Array(4)].map((_, idx) => {
            const active = idx === floors;
            return (
              <div
                onClick={() => $floors(idx)}
                className={cl(
                  "rounded-full bg-tgPrimary w-12 h-12 flex items-center justify-center transition duration-[0.6s]",
                  {
                    ["shadow-selected"]: active,
                  }
                )}
              >
                <Texts
                  weight={active ? Weight.bold : Weight.regular}
                  className="text-white"
                >
                  {idx}
                </Texts>
              </div>
            );
          })}
        </div>
        <Selected active={!!floors}>{`Выбрано: ${floors}`}</Selected>
      </div>
      <div className="border-b border-b-tgBorder">
        <Texts className="mt-4" size={TextSize.XL} alignCenter uppercase>
          Введите нужное количество порций
        </Texts>

        <div className="flex max-w-[300px] gap-3 flex-wrap mx-auto">
          {[...Array(12)].map((_, idx) => {
            const active = idx === portion;
            return (
              <div
                onClick={() => $portion(idx)}
                className={cl(
                  "rounded-full bg-tgPrimary w-10 h-10 flex items-center justify-center transition duration-[0.6s]",
                  {
                    ["shadow-selected"]: active,
                  }
                )}
              >
                <Texts
                  weight={active ? Weight.bold : Weight.regular}
                  className="text-white"
                >
                  {idx}
                </Texts>
              </div>
            );
          })}
        </div>

        <Selected active={!!portion}>{`Выбрано: ${portion}`}</Selected>
      </div>

      <TgBtn onClick={() => handleNavigate("/tg/fillings")} className="mt-16">
        Далее
      </TgBtn>
    </TgContainer>
  );
};

export default TgOrderComplexity;
