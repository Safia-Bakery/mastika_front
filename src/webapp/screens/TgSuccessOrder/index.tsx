import { useNavigate } from "react-router-dom";
import { TextSize } from "src/components/Typography";
import useQueryString from "src/hooks/useQueryString";
import Texts from "src/webapp/componets/Texts";
import TgBtn from "src/webapp/componets/TgBtn";
import TgContainer from "src/webapp/componets/TgContainer";

const TgSuccessOrder = () => {
  const navigate = useNavigate();
  const id = useQueryString("id");

  return (
    <TgContainer className="absolute bottom-0 top-0 right-0 left-0">
      <div className="p-5 shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.10)] rounded-xl flex flex-col items-center ">
        <img
          src="/assets/icons/safiaLogo.svg"
          className="mt-2"
          alt="safia-logo"
        />

        <Texts className="mt-7" size={TextSize.XL} alignCenter uppercase>
          Ваша заявка принята!
        </Texts>

        <Texts className="mt-4 !block" size={TextSize.L} alignCenter>
          Номер вашего заказа
          <Texts
            className="text-[#1130A0] !inline"
            size={TextSize.L}
            alignCenter
          >
            {" "}
            №{id}
          </Texts>
        </Texts>

        <TgBtn
          onClick={() => navigate("/tg/order-type")}
          className={"mt-7 font-bold"}
        >
          На главную
        </TgBtn>
      </div>
    </TgContainer>
  );
};

export default TgSuccessOrder;
