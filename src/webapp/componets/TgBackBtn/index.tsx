import Texts from "../Texts";
import { TextSize } from "src/components/Typography";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

interface Props {
  link: string;
}

const TgBackBtn: FC<Props> = ({ link }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(`/tg/${link}`);

  return (
    <div className="flex gap-2" onClick={handleNavigate}>
      <div className="rounded-full h-5 w-5 bg-tgGray flex items-center justify-center">
        <img
          height={7}
          width={7}
          src="/assets/icons/backArrow.svg"
          alt="backArrow"
        />
      </div>
      <Texts size={TextSize.M}>Назад</Texts>
    </div>
  );
};

export default TgBackBtn;
