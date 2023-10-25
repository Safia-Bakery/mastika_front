import cl from "classnames";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import useCategories from "src/hooks/useCategories";
import { baseURL } from "src/main";
import { tgAddItem } from "src/redux/reducers/tgWebReducer";
import { useAppDispatch } from "src/redux/utils/types";
import Texts from "src/webapp/componets/Texts";
import TgBackBtn from "src/webapp/componets/TgBackBtn";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import WebSelected from "src/webapp/componets/TgSelected";

const TgOrderDirections = () => {
  const navigate = useNavigate();
  const [modal, $modal] = useState(false);
  const [selected, $selected] = useState<{ name: string; value: number }>();
  const { data } = useCategories({});

  const dispatch = useAppDispatch();

  const toggleModal = () => $modal((prev) => !prev);

  const renderModal = useMemo(() => {
    return (
      <TgModal isOpen={modal} onClose={toggleModal}>
        <Texts size={TextSize.M} weight={Weight.bold} alignCenter>
          Спешу сообщить важные новости!
        </Texts>
        <Texts size={TextSize.M} className="mt-3">
          Время исполнения заказа зависит от сложности выполнения работы. Мои
          волшебные кондитеры принимаю заказ за:
          <ul className="list-disc ml-4">
            <li>
              <Texts size={TextSize.M}>
                2 полных дня на торты средней сложности,
              </Texts>
            </li>
            <li>
              <Texts size={TextSize.M}>за 3 дня на сложные торты,</Texts>
            </li>
            <li>
              <Texts size={TextSize.M}>
                5-3 дней для разработки сложных гравитационных тортов, 3Д
                моделей и тортов такого типа.
              </Texts>
            </li>
          </ul>
        </Texts>

        <TgBtn onClick={toggleModal} className="mt-9">
          OK
        </TgBtn>
      </TgModal>
    );
  }, [modal]);

  const handleNavigate = () => {
    dispatch(tgAddItem({ direction: selected }));
    navigate("/tg/complexity");
  };

  return (
    <TgContainer>
      <TgBackBtn link="order-type" />
      <div className="flex justify-between items-start mt-2">
        <Texts size={TextSize.XXL} uppercase>
          Выберите направление торта
        </Texts>
        <div onClick={toggleModal}>
          <img src="/assets/icons/info.svg" alt="info" />
        </div>
      </div>
      <div className="flex mt-8 border-b border-tgBorder pb-8 items-baseline flex-wrap gap-2">
        {!!data?.length &&
          data.map((item) => {
            const active = selected?.value === item.id;
            return (
              <div
                key={item.id}
                className="flex flex-1 flex-col justify-center items-center"
              >
                <div
                  onClick={() => $selected({ name: item.name, value: item.id })}
                  className={cl(
                    "h-[150px] w-[150px] rounded-full relative transition-shadow duration-[0.6s]",
                    { ["shadow-selected"]: active }
                  )}
                >
                  <img src={`${baseURL}/${item?.image}`} alt={item.name} />
                  <WebSelected className={cl({ ["opacity-100"]: active })} />
                </div>

                <Texts
                  className="mt-4"
                  size={TextSize.L}
                  weight={active ? Weight.bold : Weight.regular}
                  alignCenter
                >
                  {item.name}
                </Texts>
              </div>
            );
          })}
      </div>

      <TgBtn onClick={handleNavigate} className="mt-9 font-bold">
        Перейти к деталям оформления
      </TgBtn>
      {renderModal}
    </TgContainer>
  );
};

export default TgOrderDirections;
