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
import { tgAddItem, tgItemsSelector } from "src/redux/reducers/tgWebReducer";
import { useAppDispatch, useAppSelector } from "src/redux/utils/types";
import { OrderingType } from "src/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBranchSelect from "src/webapp/componets/TgBranchSelect";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import WebSelected from "src/webapp/componets/TgSelected";
import Selected from "src/webapp/componets/TgSelectedLabel";

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
    hasText: true,
  },
];

const TgOrderType = () => {
  const [orderType, $orderType] = useState<OrderingType>(OrderingType.delivery);
  const navigateParam = useNavigateParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modal = Number(useQueryString("modal"));
  const removeParams = useRemoveParams();
  useBranches({ enabled: orderType === OrderingType.pickup });

  const items = useAppSelector(tgItemsSelector);

  console.log(items, "items");

  const branchJson = useQueryString("branch");
  const branch = branchJson && JSON.parse(branchJson);

  const handleType = (val: OrderingType) => () => $orderType(val);

  const handleNavigate = () => {
    if (branch?.id && orderType === OrderingType.pickup) {
      dispatch(
        tgAddItem({
          delivery_type: { value: OrderingType.pickup },
          branch: { name: branch.name, value: branch.id },
        })
      );
      navigate("/tg/order-directions");
    } else navigateParam({ modal: 1 });
  };

  const onClose = () => removeParams(["modal", "branch"]);

  const handleConfirm = () => {
    dispatch(
      tgAddItem({
        delivery_type: { value: OrderingType.delivery },
      })
    );
    navigate("/tg/order-directions");
  };

  const renderModal = useMemo(() => {
    if (!!modal) {
      if (orderType === OrderingType.pickup) return <TgBranchSelect />;
      else
        return (
          <>
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
              Доставка будет осуществляться с фабрики🚘 Доставка за пределы
              города не осуществляется. Спасибо за ваш выбор❤️
            </Texts>

            <TgBtn onClick={handleConfirm} className="mt-5">
              OK
            </TgBtn>
          </>
        );
    }
  }, [modal]);

  return (
    <TgContainer className="flex flex-col gap-2">
      <Texts alignCenter uppercase size={TextSize.XXL} className="mt-6 mb-7">
        Построй торт
      </Texts>
      <Texts size={TextSize.XL} weight={Weight.bold} uppercase alignCenter>
        выберите Тип заказа
      </Texts>

      <div className="flex mt-8 border-b border-tgBorder pb-8 items-baseline">
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
                  { ["shadow-selected"]: active }
                )}
              >
                <img src={item.img} alt={item.title} />
                <WebSelected className={cl({ ["opacity-100"]: active })} />
              </div>

              <Texts
                className="mt-4"
                size={TextSize.L}
                weight={active ? Weight.bold : Weight.regular}
                alignCenter
              >
                {item.title}
              </Texts>

              {item.hasText && (
                <Selected active={!!branch?.name}>{branch?.name}</Selected>
              )}
            </div>
          );
        })}
      </div>
      <TgBtn onClick={handleNavigate} className="mt-9 font-bold">
        Далее
      </TgBtn>

      <TgModal isOpen={!!modal} onClose={onClose}>
        {renderModal}
      </TgModal>
    </TgContainer>
  );
};

export default TgOrderType;
