import cl from "classnames";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import useBranches from "src/hooks/useBranches";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { OrderingType } from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBranchSelect from "src/webapp/componets/TgBranchSelect";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import WebSelected from "src/webapp/componets/TgSelected";

const TgOrderDirections = () => {
  const navigateParam = useNavigateParams();
  const navigate = useNavigate();
  const modal = Number(useQueryString("modal"));
  const removeParams = useRemoveParams();

  // const handleType = (val: OrderingType) => () => $orderType(val);
  const handleNavigate = () => navigate("/tg/complexity");

  return (
    <TgContainer>
      <div className="flex justify-between items-start">
        <Texts size={TextSize.XXL} uppercase>
          Выберите направление торта
        </Texts>
        <img src="/assets/icons/info.svg" alt="info" />
      </div>
      <div className="flex mt-8 border-b border-tgBorder pb-8 items-baseline flex-wrap gap-2">
        {[...Array(6)].map((item, idx) => {
          const active = true;
          return (
            <div
              key={idx}
              className="flex flex-1 flex-col justify-center items-center"
            >
              <div
                onClick={() => null}
                className={cl(
                  "h-[150px] w-[150px] rounded-full relative transition-shadow duration-[0.6s]",
                  { ["shadow-[0px_4px_4px_0px_#00000040]"]: active }
                )}
              >
                <img src={"/assets/images/pickup.png"} alt={"item.title"} />
                <WebSelected className={cl({ ["opacity-100"]: active })} />
              </div>

              <Texts
                className="mt-4"
                size={TextSize.L}
                weight={active ? Weight.bold : Weight.regular}
                alignCenter
              >
                Мастичный
              </Texts>
            </div>
          );
        })}
      </div>

      <TgBtn onClick={handleNavigate} className="mt-9">
        Перейти к деталям оформления
      </TgBtn>
    </TgContainer>
  );
};

export default TgOrderDirections;
