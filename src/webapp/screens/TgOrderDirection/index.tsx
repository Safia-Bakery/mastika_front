import cl from "classnames";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextSize, Weight } from "src/components/Typography";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgModal from "src/webapp/componets/TgConfirmModal";
import TgContainer from "src/webapp/componets/TgContainer";
import WebSelected from "src/webapp/componets/TgSelected";

const TgOrderDirections = () => {
  const navigate = useNavigate();
  const [modal, $modal] = useState(false);
  const [selected, $selected] = useState<number>();

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

  const handleNavigate = () => navigate("/tg/complexity");

  return (
    <TgContainer>
      <div className="flex justify-between items-start">
        <Texts size={TextSize.XXL} uppercase>
          Выберите направление торта
        </Texts>
        <div onClick={toggleModal}>
          <img src="/assets/icons/info.svg" alt="info" />
        </div>
      </div>
      <div className="flex mt-8 border-b border-tgBorder pb-8 items-baseline flex-wrap gap-2">
        {[...Array(6)].map((item, idx) => {
          const active = selected === idx;
          return (
            <div
              key={idx}
              className="flex flex-1 flex-col justify-center items-center"
            >
              <div
                onClick={() => $selected(idx)}
                className={cl(
                  "h-[150px] w-[150px] rounded-full relative transition-shadow duration-[0.6s]",
                  { ["shadow-selected"]: active }
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
      {renderModal}
    </TgContainer>
  );
};

export default TgOrderDirections;
